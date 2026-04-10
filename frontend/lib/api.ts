export const API_URL = "http://localhost:8000";

export interface TraceReference {
  trace_id: string;
  circular_reference: string;
  circular_section: string;
  affected_document: string;
  affected_section: string;
  timestamp: string;
  status: string;
}

export interface Change {
  change_id: string;
  change_type: "added" | "removed" | "modified";
  old_text: string;
  new_text: string;
  section_hint: string;
  risk: "high" | "medium" | "low";
  affected_document: string;
  affected_section: string;
  amendment: string;
  trace_reference?: TraceReference;
}

export interface FineRisk {
  probability_percent: number;
  estimated_amount_lakh: number;
  window_days: number;
  reference_cases: Array<{
    bank: string;
    amount_lakh: number;
  }>;
}

export interface Report {
  run_id: string;
  timestamp: string;
  circular_source: string;
  summary: string;
  risk_level: "high" | "medium" | "low";
  changes: Change[];
  fine_risk: FineRisk;
  evolution_score: number;
}

export interface RunStatus {
  status: "not_started" | "starting" | "running" | "complete" | "error";
  run_id?: string;
  steps_completed?: string[];
  timestamp: string;
  error?: string;
}

export async function runComplianceCheck() {
  const response = await fetch(`${API_URL}/run_compliance_crew`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to run compliance check");
  }
  return response.json();
}

export async function getStatus(): Promise<RunStatus> {
  const response = await fetch(`${API_URL}/status`);
  if (!response.ok) {
    throw new Error("Failed to fetch status");
  }
  return response.json();
}

export async function getLatestReport(): Promise<Report> {
  const response = await fetch(`${API_URL}/report`);
  if (!response.ok) {
    throw new Error("Failed to fetch report");
  }
  const data = await response.json();
  if (data.empty) {
    throw new Error(data.message);
  }
  return data;
}

export async function getEvolution() {
  const response = await fetch(`${API_URL}/evolution`);
  if (!response.ok) {
    throw new Error("Failed to fetch evolution history");
  }
  return response.json();
}

export async function resetDemo() {
  const response = await fetch(`${API_URL}/reset`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to reset demo");
  }
  return response.json();
}
