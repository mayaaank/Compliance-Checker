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
    { time: now(), text: "[SYSTEM] Multi-agent swarm initializing...", type: "system" },
  ]);
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  const router = useRouter();
  const logEndRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const backendStepsRef = useRef<number>(0);
  const isCompleteRef = useRef<boolean>(false);

  // Auto-scroll logs disabled as requested

  // Backend Polling
  useEffect(() => {
    pollingRef.current = setInterval(async () => {
      try {
        const status = await getStatus();
        if (status.status === "error") {
          setPipelineError(status.error || "Node failure");
          clearInterval(pollingRef.current!);
          return;
        }
        backendStepsRef.current = status.steps_completed?.length || 0;
        if (status.status === "complete") isCompleteRef.current = true;
      } catch (err) {
        console.warn("Poll failed");
      }
    }, 800);
    return () => clearInterval(pollingRef.current!);
  }, []);

  // Smooth UI Progression (Ensures each step is seen)
  useEffect(() => {
    const sequence = setInterval(() => {
      setCurrentAgent(prev => {
        // If we are showing a step and backend hasn't reached it yet, wait
        if (prev > backendStepsRef.current && !isCompleteRef.current) return prev;
        
        // Progress to next step if there is one
        if (prev < 6) {
           const nextAgent = AGENTS[prev].name;
           const nextTask = AGENTS[prev].task;
           setLogs(l => [
             ...l,
             { time: now(), text: `✓ Cycle phase ${prev} verified`, type: "success" },
             { time: now(), text: `[NODE] Handover to ${nextAgent}...`, type: "system" },
             { time: now(), text: `>> ${nextTask}`, type: "info" }
           ]);
           return prev + 1;
        }

        // Finalize if all steps done and backend is complete
        if (prev === 6 && isCompleteRef.current) {
          clearInterval(sequence);
          setLogs(l => [...l, { time: now(), text: "✓ FULL COMPLIANCE RADIUS ESTABLISHED", type: "success" }]);
          setTimeout(() => {
            router.push("/evolution-history?success=true");
          }, 2000); 
        }
        
        return prev;
      });
    }, 800); // 800ms per agent step for rapid visibility

    return () => clearInterval(sequence);
  }, [router]);

  // Force scroll unlock
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, []);

  return (
    <div className="pt-24 pb-32 px-8 min-h-screen flex flex-col items-center animate-fade-in relative scroll-smooth">
      <div className="absolute inset-0 linear-grid mask-fade-top opacity-5 pointer-events-none" />

      <div className="max-w-[1200px] w-full space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <span>Compliance Pipeline Active</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tightest text-white leading-tight">
            Compliance Evolution Cycle
          </h1>
          <p className="text-white/60 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Running autonomous multi-agent swarm against RBI/2026/41.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <AgentStepper activeAgent={currentAgent} agents={AGENTS} />
          </div>

          <div className="lg:col-span-3 space-y-8">
            {pipelineError ? (
              <div className="linear-card p-8 border border-white/20 bg-white/5 space-y-3">
                <p className="text-sm font-bold text-white uppercase tracking-widest">Pipeline Error</p>
                <p className="text-white/60 text-sm font-mono">{pipelineError}</p>
                <button onClick={() => router.push("/simulate")} className="linear-button-secondary h-10 mt-2">
                  Try Again
                </button>
              </div>
            ) : (
              <div className="linear-card bg-black/40 p-12 min-h-[600px] flex flex-col font-mono relative overflow-hidden shadow-2xl border-white/10">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-8 mb-8">
                  <div className="flex items-center space-x-4">
                    <TerminalIcon className="w-5 h-5 text-white/40" />
                    <span className="text-[11px] font-bold text-white uppercase tracking-[0.3em]">Execution Logs</span>
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest animate-pulse">
                    Live Stream
                  </span>
                </div>

                <div className="flex-1 space-y-4 text-[13px] overflow-y-auto pr-2 custom-scrollbar">
                  {logs.map((log, i) => (
                    <div key={i} className={`flex items-start space-x-4 ${i === logs.length - 1 ? "opacity-100" : "opacity-50"}`}>
                      <span className="text-[11px] font-bold text-white/30 shrink-0 pt-0.5">{log.time}</span>
                      <span className={
                        log.type === "success" ? "text-white font-bold" :
                        log.type === "system"  ? "text-white/70 font-medium italic" :
                        "text-white/90"
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