# Compliance Checker - Technical Documentation

**Version:** 1.0.0  
**Last Updated:** April 2026  
**Authors:** Backend Dev, AI Dev, Frontend Dev

---

## 1. Overview

### 1.1 System Description

Compliance Checker is an automated regulatory compliance tool designed to monitor and enforce compliance with RBI (Reserve Bank of India), SEBI (Securities and Exchange Board of India), and MCA (Ministry of Corporate Affairs) circulars. The system detects regulatory changes in external circulars, maps them to internal company documents, drafts necessary amendments, and tracks compliance evolution across multiple runs.

The system architecture follows a single-agent orchestration pattern using CrewAI with a Retrieval-Augmented Generation (RAG) pipeline backed by ChromaDB vector database and Ollama LLM (llama3.2/mistral-small) for AI-powered text processing.

### 1.2 Purpose of Recent Changes

The recent changes (Commit 683cd47) implemented a complete frontend overhaul to match the Linear.app design system. This transformation includes:

- **8 new pages** with full functionality: Dashboard, Evolution History, Impact Report, Live Agents, Simulate, and Home
- **11 reusable React components** following modern UI patterns
- **Full API integration layer** connecting to the FastAPI backend
- **Tailwind CSS** with custom design tokens matching Linear's aesthetic
- **9,173 lines** of new frontend code

These changes transformed the project from a basic scaffold to a production-ready compliance dashboard application.

---

## 2. Problem Statement

### 2.1 Limitations in Previous Implementation

| Issue | Description | Impact |
|------|-------------|--------|
| No Frontend | Initial scaffold (10b44aa) had no user interface | Users could not interact visually with the system |
| Manual Testing | Required curl/API calls to test endpoints | Poor developer experience |
| No Visual Feedback | No way to monitor pipeline execution | Difficult to debug and demonstrate |
| Missing Components | No reusable UI components | Inconsistent design across potential features |
| No API Integration | No frontend-backend connection | Disconnected architecture |

### 2.2 Error Scenarios

1. **Ollama Connection Failure**: When Ollama service is not running or the model is not pulled
2. **PDF Parsing Errors**: Corrupted or unreadable PDF files in raw_circulars/
3. **ChromaDB Index Issues**: Empty or corrupted vector database
4. **Concurrency Conflicts**: Multiple simultaneous pipeline runs
5. **Network Timeouts**: LLM API calls exceeding timeout limits

### 2.3 Performance Considerations

- **Large PDF Processing**: PDFs with 100+ pages require efficient text extraction
- **RAG Query Performance**: ChromaDB queries must complete within reasonable time
- **LLM Response Time**: Using mistral-small for faster inference (vs llama3.2)
- **Background Processing**: Long-running pipeline executed via FastAPI BackgroundTasks

---

## 3. Solution Overview

### 3.1 Implemented Fixes and Improvements

The comprehensive frontend overhaul addressed all limitations:

1. **Visual Dashboard**: Real-time compliance metrics and risk assessment
2. **Live Agents Monitoring**: Step-by-step pipeline execution tracking
3. **Evolution History**: Track compliance score improvements over time
4. **Impact Report**: Detailed regulatory change analysis
5. **Simulate Page**: Demo controls for testing pipeline execution

### 3.2 Key Design Decisions

| Decision | Rationale |
|----------|----------|
| Next.js 15 + React 19 | Latest React features, server components |
| Tailwind CSS | Rapid styling with Linear design tokens |
| Lucide React Icons | Consistent iconography |
| API Polling | Simple status tracking without WebSocket |
| BackgroundTasks | Prevent API blocking during pipeline |
| Concurrency Lock | Prevent duplicate pipeline runs |

---

## 4. System Architecture

### 4.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js 15)                        │
├──────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │Dashboard │  │Live      │  │Impact    │  │Simulate  │    │
│  │          │  │Agents    │  │Report    │  │          │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │            │            │            │                      │
│       └────────────┴────────────┴────────────┘                      │
│                          │                                       │
│                    ┌─────┴─────┐                                │
│                    │  lib/api.ts │ (API Integration)              │
│                    └─────┬─────┘                                │
└──────────────────────────┼───────────────────────────────────────────┘
                           │ HTTP :8000
┌──────────────────────────┼───────────────────────────────────────────┐
│                    BACKEND│ (FastAPI)                                │
├──────────────────────────┼───────────────────────────────────────────┤
│                    ┌─────┴─────┐                                │
│                    │  main.py  │ (API Endpoints)                │
│                    └─────┬─────┘                                │
│       ┌──────────────────┼──────────────────┐              │
│       │                  │                   │                   │
│  ┌────┴────┐      ┌─────┴─────┐       ┌─────┴─────┐            │
│  │/run_    │      │ /status   │       │ /report   │            │
│  │compliance│     │           │       │           │            │
│  │_crew    │      │           │       │           │            │
│  └────┬────┘      └───────────┘       └───────────┘            │
│       │                                                         │
│  ┌────┴────────────────────────────────────────────────────┐  │
│  │          ComplianceOrchestratorAgent (crew.py)              │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──���──────┐     │  │
│  │  │Step 1  │→ │Step 2  │→ │Step 3  │→ │Step 4  │     │  │
│  │  │Scrape  │  │Diff    │  │RAG Map │  │Amend   │     │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘     │  │
│  │     │            │            │            │               │  │
│  │     └────────────┴────────────┴───────────┘               │  │
│  │                    │                                    │  │
│  │            ┌───────┴───────┐                           │  │
│  │            │ Step 5 Report │                           │  │
│  │            └───────┬───────┘                           │  │
│  │                    │                                    │  │
│  │            ┌───────┴───────┐                           │  │
│  │            │ Step 6 Evolve  │ (Policy Evolution Engine) │  │
│  │            └───────────────┘                           │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │  ChromaDB        │  │  Ollama LLM       │                   │
│  │  (Vector Store)  │  │  (LLM Inference) │                   │
│  └──────────────────┘  └──────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Component Interactions

1. **Frontend → Backend**: HTTP requests to FastAPI endpoints
2. **API → Agent**: BackgroundTasks triggers ComplianceOrchestratorAgent
3. **Agent → Storage**: Reads/writes JSON files to shared_data/
4. **Agent → RAG**: ChromaDB for document similarity search
5. **Agent → LLM**: Ollama HTTP API for text generation

### 4.3 Technology Stack

| Layer | Technology |
|------|------------|
| Frontend Framework | Next.js 15, React 19 |
| Frontend Styling | Tailwind CSS 3.4 |
| Backend Framework | FastAPI |
| AI Agent | CrewAI (single agent) |
| Vector Database | ChromaDB |
| LLM | Ollama (mistral-small/llama3.2) |
| PDF Processing | PyMuPDF (fitz) |
| Python Version | 3.11 |

---

## 5. Workflow / Execution Flow

### 5.1 Pipeline Overview

The compliance pipeline executes in **6 sequential steps**:

```
Step 1: Scrape/Ingest     → Load raw circular PDFs
    ↓
Step 2: Change Detection → Compare with previous circulars using difflib
    ↓
Step 3: RAG Impact      → Map changes to company documents via ChromaDB
    Mapping
    ↓
Step 4: Amendment       → Draft compliance amendments via Ollama LLM
    Drafting
    ↓
Step 5: Report          → Generate compliance report with risk assessment
    Generation
    ↓
Step 6: Policy          → Auto-apply amendments to internal_policy.pdf
    Evolution          → Update evolution history
```

### 5.2 Request Lifecycle

1. **User Action**: Click "Run Compliance Check" on Simulate page
2. **API Call**: POST /run_compliance_crew triggers BackgroundTasks
3. **Concurrency Check**: Verify no other run in progress
4. **Agent Execution**: ComplianceOrchestratorAgent.run() executes pipeline
5. **Status Updates**: Writes progress to simulation_results.json
6. **Frontend Polling**: GET /status every 3 seconds for live updates
7. **Completion**: Report available at GET /report

### 5.3 Data Flow

```
Raw Circular PDFs          Company Documents           Shared Data
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ raw_circulars/   │     │ company_docs/   │     │ shared_data/     │
│                 │     │                 │     │                 │
│ new_circular.pdf │────→│ internal_policy │←──→│ simulation_     │
│                 │     │ .pdf            │     │ results.json    │
│                 │     │                 │     │                 │
│ previous/       │────→│ (RAG index)     │     │ latest_report   │
│ old_circular.pdf│     │                 │     │ .json          │
└─────────────────┘     └─────────────────┘     │                 │
                             ↑                │ evolution_     │
                             │                │ history.json   │
                             └────────────────┘                 │
```

---

## 6. Implementation Details

### 6.1 Modules and Services Affected

| File | Purpose |
|------|---------|
| `backend/main.py` | FastAPI application, API endpoints |
| `backend/crew.py` | ComplianceOrchestratorAgent, 6-step pipeline |
| `backend/utils/config.py` | Configuration management |
| `frontend/lib/api.ts` | API integration client |
| `frontend/app/*` | 8 Next.js pages |
| `frontend/components/*` | 11 React components |

### 6.2 Key Classes and Functions

#### Backend - main.py

| Function/Endpoint | Purpose |
|------------------|---------|
| `run_agent_sync()` | Sync wrapper for background agent execution |
| `POST /run_compliance_crew` | Trigger pipeline with concurrency check |
| `GET /status` | Return current run status |
| `GET /report` | Return latest compliance report |
| `GET /evolution` | Return evolution history |
| `POST /reset` | Reset demo state |

#### Backend - crew.py

| Class/Function | Purpose |
|--------------|---------|
| `ComplianceOrchestratorAgent` | Main orchestrator class |
| `_get_run_id()` | Generate unique run ID |
| `_clean_text()` | Remove Devanagari script, normalize spacing |
| `_extract_pdf_text()` | Extract text from PDF using PyMuPDF |
| `_index_company_docs()` | Index documents to ChromaDB |
| `_ollama_generate()` | Direct Ollama HTTP call (no LangChain) |
| `_check_ollama_ready()` | Verify Ollama is running |
| `run()` | Execute full 6-step pipeline |
| `_step_scrape()` | Step 1: Load circulars |
| `_step_diff()` | Step 2: Detect changes |
| `_step_rag_map()` | Step 3: Map to documents |
| `_step_amend()` | Step 4: Draft amendments |
| `_step_report()` | Step 5: Generate report |
| `_step_evolve()` | Step 6: Policy evolution |

#### Frontend - lib/api.ts

| Function | Purpose |
|----------|---------|
| `runComplianceCheck()` | POST to /run_compliance_crew |
| `getStatus()` | GET /status |
| `getLatestReport()` | GET /report |
| `getEvolution()` | GET /evolution |
| `resetDemo()` | POST /reset |

### 6.3 Code-Level Explanations

#### Concurrency Prevention (main.py:65-71)

```python
# Concurrency check: If already running, don't start a new one
if status_data and status_data.get("status") == "running":
    return {
        "status": "already_running",
        "message": "A compliance check is already in progress.",
        "run_id": status_data.get("run_id")
    }
```

#### Fallback Amendment (crew.py:349-354)

```python
def _fallback_amendment(self, change: dict) -> str:
    return (
        f"Update {change.get('affected_section', 'the relevant section')} "
        f"to comply with RBI circular 2026/41. "
        f"Specifically: {change.get('new_text', '')[:200]}"
    )
```

#### LLM Direct Call (crew.py:85-109)

```python
def _ollama_generate(prompt: str, timeout: int = 90) -> str:
    """Direct Ollama HTTP call — zero LangChain dependency."""
    url = f"{OLLAMA_BASE_URL}/api/chat"
    payload = {
        "model": OLLAMA_MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False,
        "options": {"temperature": 0.2, "num_ctx": 4096},
    }
    # ... HTTP request with error handling
```

---

## 7. Before vs After Comparison

| Aspect | Before (10b44aa) | After (683cd47) |
|--------|------------------|-----------------|
| **Frontend** | None | Next.js 15 + React 19 |
| **Pages** | 0 | 8 complete pages |
| **Components** | 0 | 11 reusable components |
| **Styling** | N/A | Tailwind CSS + Linear design |
| **API Client** | N/A | Full integration layer |
| **Code Added** | - | 9,173 lines |
| **Status Endpoint** | Basic | Polling + visual feedback |
| **Demo Mode** | Manual curl | Interactive UI |

### 7.1 Improvements Summary

1. **Visual Experience**: Full dashboard with metrics, charts, and real-time updates
2. **Developer Experience**: Hot reload, TypeScript support, component reusability
3. **User Experience**: Intuitive navigation, CEO alerts, export capabilities
4. **Monitoring**: Live step-by-step pipeline visibility
5. **Demo Capability**: Full interactive demo without API tools

---

## 8. Error Handling & Edge Cases

### 8.1 Failure Handling

| Scenario | Handling |
|----------|----------|
| Ollama not running | Fallback to static amendments (_step_amend) |
| Model not pulled | Console warning + fallback |
| PDF parse failure | Skip file, log warning |
| RAG collection empty | Default to internal_policy.pdf |
| Concurrent run attempt | Return "already_running" status |
| LLM timeout | 90-second timeout with fallback |
| ChromaDB error | Recreate collection |

### 8.2 Retry Mechanisms

- **LLM Calls**: Single retry on timeout (configurable 90s timeout)
- **Connection Errors**: Fallback responses without retry
- **File Operations**: Graceful degradation with defaults

### 8.3 Validation

- **Concurrency Check**: Status file validation before starting
- **Ollama Health**: _check_ollama_ready() verifies service
- **PDF Existence**: Runtime checks before operations

---

## 9. Testing & Validation

### 9.1 API Testing

```bash
# Health check
curl http://localhost:8000/health

# Start compliance check
curl -X POST http://localhost:8000/run_compliance_crew

# Check status (poll every 3s)
curl http://localhost:8000/status

# Get report
curl http://localhost:8000/report

# Get evolution
curl http://localhost:8000/evolution

# Reset demo
curl -X POST http://localhost:8000/reset
```

### 9.2 Test Cases

| Test | Expected Result |
|------|-----------------|
| Health endpoint | `{"status": "ok", "service": "compliance-checker-api"}` |
| Run without Ollama | Pipeline completes with fallback amendments |
| Concurrent run attempt | `{"status": "already_running"}` |
| No PDFs in raw_circulars/ | RuntimeError raised |
| Empty ChromaDB | Default document mapping |

### 9.3 Manual Verification

1. Start backend: `uvicorn backend.main:app --reload --port 8000`
2. Start frontend: `cd frontend && npm run dev`
3. Navigate to http://localhost:3000
4. Click "Run Compliance Check" on Simulate page
5. Monitor Live Agents page for step progress
6. View results on Dashboard and Impact Report

---

## 10. Deployment & Execution

### 10.1 Prerequisites

| Requirement | Command/Version |
|-------------|-----------------|
| Python | 3.11+ |
| Node.js | 20+ |
| Ollama | Run `ollama pull mistral-small` |

### 10.2 Environment Setup

#### Backend

```bash
# Navigate to project
cd /Users/mayankpramodsuryawanshi/Developer/Compliance-Checker

# Create virtual environment
cd backend
python -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Frontend

```bash
cd frontend
npm install
```

### 10.3 Running the System

#### Terminal 1 - Ollama (Required)

```bash
ollama serve
```

#### Terminal 2 - Backend

```bash
cd /Users/mayankpramodsuryawanshi/Developer/Compliance-Checker
source backend/venv/bin/activate
uvicorn backend.main:app --reload --port 8000
```

#### Terminal 3 - Frontend

```bash
cd /Users/mayankpramodsuryawanshi/Developer/Compliance-Checker/frontend
npm run dev
```

### 10.4 Access Points

| Service | URL |
|--------|-----|
| Frontend | http://localhost:3000 |
| Backend API Docs | http://localhost:8000/docs |
| API Base | http://localhost:8000 |

---

## 11. Future Improvements

### 11.1 Planned Enhancements Phase 2

1. **Traceability Utilities** (`backend/utils/traceability.py`)
   - Map circular clause references to document sections
   - Build trace reference function (partially implemented)

2. **Enhanced RAG**
   - Semantic search with better chunking strategies
   - Multi-document cross-reference

3. **Advanced Analytics**
   - Trend prediction
   - Compliance score forecasting

### 11.2 Known Limitations

1. **Fallback Data**: Static fallback when no PDFs available
2. **Single Document Diff**: Compares only first previous circular
3. **No WebSocket**: Polling-based status updates
4. **Limited PDF Edit**: Appends-only to internal_policy.pdf

---

## Appendix A: File Structure

```
compliance-checker/
├── backend/
│   ├── __init__.py
│   ├── main.py              # FastAPI app + endpoints
│   ├── crew.py             # ComplianceOrchestratorAgent
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── config.py       # Configuration
│   │   └── traceability.py # Traceability utilities
│   ├── data/
│   │   ├── chroma_db/     # ChromaDB storage
│   │   ├── raw_circulars/ # New circulars
│   │   ├── previous_circulars/ # Old circulars
│   │   └── company_docs/   # Internal documents
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── page.tsx       # Home
│   │   ├── layout.tsx     # Root layout
│   │   ├── dashboard/     # Dashboard page
│   │   ├── live-agents/   # Pipeline monitoring
│   │   ├── impact-report/ # Report detail
│   │   ├── simulate/      # Demo controls
│   │   └── evolution-history/ # History
│   ├── components/       # React components
│   ├── lib/api.ts        # API client
│   ├── tailwind.config.ts
│   └── package.json
├── shared_data/           # Runtime data (created at runtime)
└── README.md
```

---

## Appendix B: API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /run_compliance_crew | Trigger pipeline |
| GET | /status | Get run status |
| GET | /report | Get latest report |
| GET | /evolution | Get evolution history |
| POST | /reset | Reset demo |
| GET | /health | Health check |