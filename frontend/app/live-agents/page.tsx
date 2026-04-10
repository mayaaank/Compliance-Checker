"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  ShieldCheck, 
  Search, 
  FileCheck, 
  AlertTriangle,
  Activity,
  ArrowRight
} from "lucide-react";
import AgentStepper from "@/components/AgentStepper";

const AGENTS = [
  { id: 1, name: "ReguHarvester", icon: Cpu, task: "Fetching latest digital circulars from SEBI/RBI portals..." },
  { id: 2, name: "SemanticMapper", icon: Search, task: "Deconstructing policy manual into semantic nodes..." },
  { id: 3, name: "DeltaAnalyzer", icon: Activity, task: "Calculating logic drift between circulars and manual..." },
  { id: 4, name: "RiskScorer", icon: AlertTriangle, task: "Quantifying non-compliance exposure probability..." },
  { id: 5, name: "PolicyDraftsman", icon: FileCheck, task: "Auto-generating legally compliant policy amendments..." },
  { id: 6, name: "TrustValidator", icon: ShieldCheck, task: "Finalizing validation for Executive Impact Report..." },
];

export default function LiveAgentsPage() {
  const [currentAgent, setCurrentAgent] = useState(1);
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Booting Compliance Swarm...", "[SYSTEM] Handshake successful with RBI API v4.2..."]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAgent(prev => {
        if (prev < 6) {
          const next = prev + 1;
          setLogs(l => [...l, `[${AGENTS[prev].name}] Sequence complete. Handoff to ${AGENTS[next-1].name}...`, `[${AGENTS[next-1].name}] ${AGENTS[next-1].task}`]);
          return next;
        }
        clearInterval(interval);
        setTimeout(() => router.push("/dashboard"), 1500);
        return prev;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen flex flex-col items-center animate-fade-in relative">
      <div className="absolute inset-0 linear-grid mask-fade-top opacity-5 pointer-events-none" />
      
      <div className="max-w-[1200px] w-full space-y-20 relative z-10">
        
        <div className="text-center space-y-6">
           <div className="flex items-center justify-center space-x-3 text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              <span>Autonomous Handoff Sequence Active</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black tracking-tightest text-white">
              Deconstructing Policy Delta
           </h1>
           <p className="text-text-secondary text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              Our agent swarm is currently calculating logic drift against a 400-node regulatory matrix from RBI, MCA, and SEBI.
           </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <AgentStepper activeAgent={currentAgent} agents={AGENTS} />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="linear-card bg-black/40 p-12 min-h-[550px] flex flex-col font-mono relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-8 mb-8">
                <div className="flex items-center space-x-4">
                  <TerminalIcon className="w-4 h-4 text-text-muted" />
                  <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">Swarm Performance Feed</span>
                </div>
                <div className="flex items-center space-x-4">
                   <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest hidden sm:block">Session: 0x92f8a</span>
                   <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest animate-pulse">Running Trace...</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 text-[13px] custom-scrollbar overflow-y-auto pr-6">
                {logs.map((log, i) => (
                  <div key={i} className={`flex items-start space-x-5 transition-all duration-700 ${i === logs.length - 1 ? "animate-slide-up" : "opacity-30"}`}>
                    <span className="text-[11px] font-bold text-text-muted opacity-40 shrink-0 pt-0.5">[{new Date().toLocaleTimeString('en-GB', { hour12: false })}]</span>
                    <span className={`${log.includes("[SYSTEM]") ? "text-primary-500" : "text-white"} font-medium leading-relaxed tracking-tight`}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/[0.08] flex items-center justify-between opacity-40">
                 <div className="text-[10px] font-bold text-text-muted tracking-[0.2em] uppercase">Node: Alpha-4 // Latency: 12ms</div>
                 <div className="text-[10px] font-bold text-text-muted tracking-[0.2em] uppercase">Throughput: 1.4 TPS</div>
              </div>
            </div>

            <div className="linear-card p-6 bg-white/[0.01] flex items-center justify-between group cursor-help transition-all hover:bg-white/[0.03]">
               <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-primary-500/5 border border-white/5">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-white tracking-tight uppercase">Privacy-First Handover</div>
                    <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest opacity-60">Zero-Knowledge Mapping Active</div>
                  </div>
               </div>
               <div className="flex space-x-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                  {[1,2,3].map(i => <div key={i} className="w-1.5 h-4 bg-primary-500 animate-pulse rounded-full" style={{ animationDelay: `${i * 150}ms` }} />)}
               </div>
            </div>
            
            <div className="text-center pt-4 sm:hidden">
               <button onClick={() => router.push("/dashboard")} className="linear-button-secondary w-full">
                  Skip Trace Execution
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
