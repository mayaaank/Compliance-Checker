import json
import os
import sys
import logging
import fcntl
import time
import shutil
from pathlib import Path
from datetime import datetime
from contextlib import contextmanager
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from backend.utils.config import SHARED_DATA_PATH

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    stream=sys.stdout
)
logger = logging.getLogger("compliance-api")

app = FastAPI(
    title="Compliance Checker API",
    description="Single-agent compliance pipeline for RBI/SEBI/MCA circulars",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@contextmanager
def file_lock(lock_path: Path, timeout: float = 5.0):
    """Acquire file lock for concurrency control."""
    lock_file = None
    start_time = time.time()
    try:
        lock_file = open(lock_path, 'w')
        while True:
            try:
                fcntl.flock(lock_file.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
                break
            except BlockingIOError:
                if time.time() - start_time >= timeout:
                    raise TimeoutError("Could not acquire file lock within timeout")
                time.sleep(0.1)
        yield
    finally:
        if lock_file:
            fcntl.flock(lock_file.fileno(), fcntl.LOCK_UN)
            lock_file.close()


def shared_path(filename: str) -> Path:
    return Path(SHARED_DATA_PATH) / filename


def read_json(filename: str):
    """Read a JSON file from shared_data/. Returns None if missing or empty."""
    path = shared_path(filename)
    try:
        if not path.exists() or path.stat().st_size == 0:
            logger.debug(f"File {filename} does not exist or is empty")
            return None
        with open(path, "r") as f:
            data = json.load(f)
            logger.debug(f"Successfully read {filename}")
            return data
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error in {filename}: {e}")
        return None
    except OSError as e:
        logger.error(f"OS error reading {filename}: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error reading {filename}: {e}")
        return None


def write_json(filename: str, data: dict):
    """Write a dict as JSON to shared_data/."""
    path = shared_path(filename)
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w") as f:
            json.dump(data, f, indent=2)
        logger.debug(f"Successfully wrote {filename}")
    except OSError as e:
        logger.error(f"OS error writing {filename}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to write {filename}: {e}")
    except Exception as e:
        logger.error(f"Unexpected error writing {filename}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to write {filename}: {e}")


def run_agent_sync():
    """Sync wrapper to run the agent. FastAPI will run this in a threadpool."""
    logger.info("Starting background compliance agent")
    try:
        from backend.crew import ComplianceOrchestratorAgent
        agent = ComplianceOrchestratorAgent()
        agent.run()
        logger.info("Background compliance agent completed successfully")
    except Exception as e:
        logger.error(f"Background agent failed: {e}", exc_info=True)
        try:
            write_json("simulation_results.json", {
                "status": "error",
                "error": str(e),
                "timestamp": ""
            })
        except Exception as write_err:
            logger.error(f"Failed to write error status: {write_err}")


# ── Endpoints ──────────────────────────────────────────────────────────────

@app.post("/run_compliance_crew")
async def run_compliance_crew(background_tasks: BackgroundTasks):
    """
    Triggers the ComplianceOrchestratorAgent pipeline.
    Uses BackgroundTasks to prevent freezing and file locking to prevent duplicate runs.
    """
    lock_path = shared_path(".lock")

    try:
        with file_lock(lock_path, timeout=1.0):
            status_data = read_json("simulation_results.json")

            if status_data and status_data.get("status") == "running":
                logger.warning(f"Pipeline already running: {status_data.get('run_id')}")
                return {
                    "status": "already_running",
                    "message": "A compliance check is already in progress.",
                    "run_id": status_data.get("run_id")
                }

            logger.info("Starting new compliance pipeline")
            write_json("simulation_results.json", {
                "status": "starting",
                "timestamp": ""
            })

    except TimeoutError:
        logger.warning("Could not acquire lock - pipeline may be starting")
        return {
            "status": "busy",
            "message": "Pipeline is busy, please try again.",
        }
    except Exception as e:
        logger.error(f"Error starting pipeline: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

    background_tasks.add_task(run_agent_sync)

    return {
        "status": "started",
        "message": "Compliance pipeline started in background.",
    }


@app.get("/status")
async def get_status():
    """Returns the current run status from simulation_results.json."""
    data = read_json("simulation_results.json")
    if data is None:
        logger.info("Status requested - not started")
        return {"status": "not_started"}
    logger.debug(f"Status: {data.get('status')}")
    return data


@app.get("/report")
async def get_report():
    """Returns the latest compliance report from latest_report.json."""
    data = read_json("latest_report.json")
    if data is None:
        logger.info("Report requested - not available")
        return {
            "message": "No report available yet. Run a compliance check first.",
            "empty": True,
        }
    logger.debug(f"Report returned for run_id: {data.get('run_id')}")
    return data


@app.get("/evolution")
async def get_evolution():
    """Returns the evolution history from evolution_history.json."""
    data = read_json("evolution_history.json")
    if data is None:
        logger.info("Evolution history - empty")
        return {"runs": []}
    logger.debug(f"Evolution history: {len(data.get('runs', []))} runs")
    return data


@app.post("/reset")
async def reset():
    """Resets demo state. Clears shared_data/ JSON files and restores backup PDF."""
    lock_path = shared_path(".lock")

    try:
        with file_lock(lock_path):
            logger.info("Resetting demo state")
            write_json("latest_report.json", {})
            write_json("evolution_history.json", {"runs": []})
            write_json("simulation_results.json", {"status": "not_started"})
            logger.info("Demo state reset complete")
    except Exception as e:
        logger.error(f"Error resetting demo: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

    # Restore internal_policy.pdf from backup if it exists
    policy_path = Path("backend/data/company_docs/internal_policy.pdf")
    backup_path = Path("backend/data/company_docs/internal_policy_backup.pdf")
    pdf_restored = False

    if backup_path.exists():
        shutil.copy2(backup_path, policy_path)
        pdf_restored = True
        logger.info("Restored internal_policy.pdf from backup")

    return {
        "status": "reset",
        "message": "shared_data/ cleared. Ready for a fresh demo run.",
        "pdf_restored": pdf_restored,
    }


@app.get("/health")
async def health():
    """Health check — confirms API is running."""
    return {"status": "ok", "service": "compliance-checker-api", "version": "2.0.0"}
