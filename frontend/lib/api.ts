const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Report {
  summary_metrics: {
    total_risks: number;
    high_risks: number;
    medium_risks: number;
    low_risks: number;
  };
  risk_cards: Array<{
    id: string;
    title: string;
    description: string;
    level: "high" | "medium" | "low";
  }>;
  predictive_risk: {
    probability: number;
    reference_cases: Array<{
      id: string;
      case: string;
      fine: string;
    }>;
  };
  comparison: {
    old_text: string;
    new_text: string;
    highlights: Array<{
      text: string;
      level: "high" | "medium" | "low";
    }>;
  };
  amendments: Array<{
    id: string;
    title: string;
    diff: string;
  }>;
}

export interface Evolution {
  runs: Array<{
    date: string;
    score: number;
    change: number;
  }>;
}

export interface SimulationStatus {
  status: "not_started" | "running" | "complete" | "error";
  steps_completed: string[];
  message?: string;
}

export async function runComplianceCheck(): Promise<{ status: string; message: string; run_id: string }> {
  const res = await fetch(`${API_BASE_URL}/run_compliance_crew`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to start compliance check");
  return res.json();
}

export async function getStatus(): Promise<SimulationStatus> {
  const res = await fetch(`${API_BASE_URL}/status`);
  if (!res.ok) throw new Error("Failed to fetch status");
  return res.json();
}

export async function getLatestReport(): Promise<Report> {
  const res = await fetch(`${API_BASE_URL}/report`);
  if (!res.ok) throw new Error("Failed to fetch report");
  const data = await res.json();
  if (data.message) throw new Error(data.message);
  return data;
}

export async function getEvolution(): Promise<Evolution> {
  const res = await fetch(`${API_BASE_URL}/evolution`);
  if (!res.ok) throw new Error("Failed to fetch evolution history");
  return res.json();
}

export async function resetDemo(): Promise<{ status: string; message: string }> {
  const res = await fetch(`${API_BASE_URL}/reset`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to reset demo");
  return res.json();
}
