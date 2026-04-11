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
  impacted_sectors?: string[];
}

export interface RunStatus {
  status: "not_started" | "starting" | "running" | "complete" | "error";
  run_id?: string;
  steps_completed?: string[];
  timestamp: string;
  error?: string;
}

export async function runComplianceCheck(file?: File | null) {
  console.log("[API] Initiating compliance check with file payload:", file ? file.name : "None");
  try {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    console.log("[API] Dispatching POST /run_compliance_crew...");
    const response = await fetch(`${API_URL}/run_compliance_crew`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      const errText = await response.text();
      console.error(`[API] /run_compliance_crew failed with status ${response.status}:`, errText);
      throw new Error(`Failed to run compliance check: ${errText}`);
    }
    
    const data = await response.json();
    console.log("[API] /run_compliance_crew succeeded:", data);
    return data;
  } catch (error) {
    console.error("[API] Fatal error in runComplianceCheck:", error);
    throw error;
  }
}

export async function getStatus(): Promise<RunStatus> {
  try {
    const response = await fetch(`${API_URL}/status`);
    if (!response.ok) {
      const errText = await response.text();
      console.error(`[API] /status failed with status ${response.status}:`, errText);
      throw new Error("Failed to fetch status");
    }
    return response.json();
  } catch (error) {
    console.error("[API] Fatal error in getStatus:", error);
    throw error;
  }
}

export async function getLatestReport(): Promise<Report> {
  try {
    const response = await fetch(`${API_URL}/report`);
    if (!response.ok) {
      const errText = await response.text();
      console.error(`[API] /report failed with status ${response.status}:`, errText);
      throw new Error("Failed to fetch report");
    }
    const data = await response.json();
    if (data.empty) {
      console.warn("[API] Report fetched but it is empty.");
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("[API] Fatal error in getLatestReport:", error);
    throw error;
  }
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
