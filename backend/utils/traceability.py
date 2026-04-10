# Traceability utilities for Compliance Checker
# Maps circular clause references to company document sections with unique Trace IDs

import uuid
from datetime import datetime

def generate_trace_id(source_ref: str, run_id: str) -> str:
    """Generates a structured Trace ID for audit trails."""
    # RBI/2026/41 -> RBI-26-41
    clean_ref = source_ref.replace("/", "-").replace("20", "")
    suffix = uuid.uuid4().hex[:4].upper()
    return f"TRC-{clean_ref}-{run_id.upper()}-{suffix}"

def build_trace_reference(circular_section: str, document_name: str, document_section: str, source_ref: str, run_id: str) -> dict:
    """Creates a comprehensive traceability link between regulation and policy."""
    trace_id = generate_trace_id(source_ref, run_id)
    return {
        "trace_id": trace_id,
        "circular_reference": source_ref,
        "circular_section": circular_section,
        "affected_document": document_name,
        "affected_section": document_section,
        "timestamp": datetime.now().isoformat(),
        "status": "pending_review"
    }
