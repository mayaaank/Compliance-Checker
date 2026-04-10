"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Terminal as TerminalIcon, Cpu, ShieldCheck,
  Search, FileCheck, AlertTriangle, Activity
} from "lucide-react";
import AgentStepper from "@/components/AgentStepper";
import { getStatus } from "@/lib/api";

const AGENTS = [
  { id: 1, name: "Scraper Agent",      icon: Cpu,           task: "Reading RBI/2026/41 circular from data store..." },
  { id: 2, name: "Change Detector",    icon: Search,        task: "Diffing new circular against previous version..." },
  { id: 3, name: "Impact Mapper",      icon: Activity,      task: "Querying ChromaDB — matching clauses to company docs..." },
  { id: 4, name: "Amendment Drafter",  icon: FileCheck,     task: "Sending affected sections to LLM for amendment drafting..." },
  { id: 5, name: "Executive Summarizer", icon: AlertTriangle, task: "Assembling fine risk estimate and report JSON..." },
  { id: 6, name: "Policy Evolution",   icon: ShieldCheck,   task: "Writing amendments to internal_policy.pdf and re-indexing..." },
];

// How many fake log lines to show per agent stage
const STAGE_LOGS: Record<number, string[]> = {
  1: ["→ Scraper Agent — opening raw_circulars/rbi_circular_2026_41.pdf", "→ Extracted 4,218 characters from circular", "→ Previous circular loaded for comparison"],
  2: ["→ Change Detector — running unified diff", "→ 3 clause modifications identified", "→ Changes labeled: 2× modified, 1× added"],
  3: ["→ Impact Mapper — querying ChromaDB collection company_docs", "→ Matched Section 4.2 → internal_policy.pdf", "→ Matched Section 6.1 → product_catalog.pdf"],
  4: ["→ Amendment Drafter — sending prompt to mistral-small", "→ Amendment drafted for change c1 (high risk)", "→ Amendments complete for all 3 changes"],
  5: ["→ Executive Summarizer — calculating fine risk probability: 68%", "→ Estimated exposure: ₹18.4L in 90 days", "→ Report JSON written to shared_data/latest_report.json"],
  6: ["→ Policy Evolution — appending amendments to internal_policy.pdf", "→ ChromaDB re-indexed with updated document", "→ Evolution score recorded in evolution_history.json"],
};

export default function LiveAgentsPage() {
  const [currentAgent, setCurrentAgent] = useState(1);
  const [logs, setLogs] = useState<{ time: string; text: string; type: string }[]>([
    { time: now(), text: "[SYSTEM] Compliance pipeline starting...", type: "system" },
  ]);
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  const router = useRouter();
  const logEndRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const animDone = useRef(false);

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    pollingRef.current = setInterval(async () => {
      try {
        const status = await getStatus();
        
        // Map backend steps to current agent
        const stepsCount = status.steps_completed?.length || 0;
        
        if (status.status === "failed") {
          clearInterval(pollingRef.current!);
          setPipelineError(status.error || "Pipeline failed — check backend logs");
          return;
        }

        // Keep currentAgent bounded between 1 and 6 based on steps
        const currentStep = Math.min(6, stepsCount + 1);
        setCurrentAgent(currentStep);

        // Manage logs smoothly based on the step transition
        if (currentStep > 1 && currentStep <= 6) {
           const prevAgent = AGENTS[currentStep - 2].name;
           const currAgent = AGENTS[currentStep - 1].name;
           const currTask = AGENTS[currentStep - 1].task;
           
           setLogs(prev => {
             // Only insert new logs if the step actually moved forward
             if (!prev.some(log => log.text.includes(currTask))) {
                return [
                  ...prev,
                  { time: now(), text: `✓ ${prevAgent} — complete`, type: "success" },
                  { time: now(), text: `[SYSTEM] Handoff to ${currAgent}...`, type: "system" },
                  { time: now(), text: currTask, type: "info" }
                ];
             }
             return prev;
           });
        }

        if (status.status === "complete") {
          clearInterval(pollingRef.current!);
          setLogs(prev => [...prev, { time: now(), text: `✓ ${AGENTS[5].name} — complete`, type: "success" }]);
          setTimeout(() => router.push("/dashboard"), 1500);
        }

      } catch (err) {
        console.warn("Backend unreachable during poll.");
      }
    }, 1500);

    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [router]);

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen flex flex-col items-center animate-fade-in relative">
      <div className="absolute inset-0 linear-grid mask-fade-top opacity-5 pointer-events-none" />

      <div className="max-w-[1200px] w-full space-y-20 relative z-10">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
            <span>Compliance Pipeline Running</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tightest text-white">
            Processing Circular Delta
          </h1>
          <p className="text-text-secondary text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Scraping, diffing, mapping, and drafting amendments against RBI/2026/41.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <AgentStepper activeAgent={currentAgent} agents={AGENTS} />
          </div>

          <div className="lg:col-span-3 space-y-8">
            {pipelineError ? (
              <div className="linear-card p-8 border border-risk-high/30 bg-risk-high/5 space-y-3">
                <p className="text-sm font-bold text-risk-high uppercase tracking-widest">Pipeline Error</p>
                <p className="text-text-secondary text-sm font-mono">{pipelineError}</p>
                <button onClick={() => router.push("/simulate")} className="linear-button-secondary h-10 mt-2">
                  Try Again
                </button>
              </div>
            ) : (
              <div className="linear-card bg-black/40 p-12 min-h-[550px] flex flex-col font-mono relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-8 mb-8">
                  <div className="flex items-center space-x-4">
                    <TerminalIcon className="w-4 h-4 text-text-muted" />
                    <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">Pipeline Log</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest animate-pulse">
                    Running...
                  </span>
                </div>

                <div className="flex-1 space-y-3 text-[13px] overflow-y-auto pr-2">
                  {logs.map((log, i) => (
                    <div key={i} className={`flex items-start space-x-4 ${i === logs.length - 1 ? "opacity-100" : "opacity-40"}`}>
                      <span className="text-[11px] font-bold text-text-muted shrink-0 pt-0.5">{log.time}</span>
                      <span className={
                        log.type === "success" ? "text-emerald-400 font-medium" :
                        log.type === "system"  ? "text-primary-500 font-medium" :
                        "text-white/80"
                      }>
                        {log.text}
                      </span>
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center space-x-2 opacity-40">
                  <div className="w-2 h-4 bg-white/60 animate-pulse rounded-sm" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}