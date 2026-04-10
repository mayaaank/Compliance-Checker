"use client";

import { useEffect, useState } from "react";
import { 
  History, 
  TrendingUp, 
  Calendar, 
  ChevronRight, 
  ShieldCheck,
  Activity,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { getEvolution } from "@/lib/api";
import EmptyState from "@/components/EmptyState";

interface EvolutionRun {
  run_id: string;
  score: number;
  timestamp: string;
  risk_level: "high" | "medium" | "low";
  changes_count: number;
}

export default function EvolutionHistoryPage() {
  const [runs, setRuns] = useState<EvolutionRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvolution() {
      try {
        const data = await getEvolution();
        setRuns(data.runs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load evolution history");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvolution();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-24 px-8 max-w-[1000px] mx-auto space-y-12 animate-fade-in">
        <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse" />
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || runs.length === 0) {
    return (
      <div className="pt-24 px-8 max-w-[1000px] mx-auto">
        <EmptyState 
          title="No History Found"
          description="You haven't completed any compliance assessments yet. Start your first simulation to see your compliance evolution."
          actionLabel="Run Compliance Check"
          actionHref="/simulate"
        />
      </div>
    );
  }

  // Calculate average score
  const avgScore = Math.round(runs.reduce((acc, run) => acc + run.score, 0) / runs.length);
  const latestScore = runs[0]?.score || 0;

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen animate-fade-in">
      <div className="max-w-[1000px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08] pb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">
              <History className="w-3.5 h-3.5" />
              <span>Governance Evolution Ledger</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tightest text-white">Compliance Timeline</h1>
            <p className="text-text-secondary text-base font-medium max-w-xl">
              Track your firm's regulatory drift and remediation history across all automated assessment cycles.
            </p>
          </div>
          
          <div className="flex items-center gap-10">
             <div className="space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Avg Stability</span>
                <div className="text-2xl font-black text-white">{avgScore}%</div>
             </div>
             <div className="h-10 w-px bg-white/10" />
             <div className="space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Latest Score</span>
                <div className="text-2xl font-black text-success">{latestScore}%</div>
             </div>
          </div>
        </div>

        {/* Visual Trend - Minimalistic SVG Chart */}
        <div className="linear-card p-10 space-y-8 overflow-hidden relative">
           <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                 <TrendingUp className="w-4 h-4 text-success" />
                 <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Stability Trend</span>
              </div>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Last {runs.length} Runs</span>
           </div>
           
           <div className="h-40 w-full relative group">
              <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                 <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                       <stop offset="100%" stopColor="rgba(16, 185, 129, 0.5)" />
                    </linearGradient>
                 </defs>
                 <path 
                    d={`M ${runs.slice().reverse().map((run, i) => `${(i / (runs.length - 1 || 1)) * 1000},${100 - run.score}`).join(" L ")}`}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    className="drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                 />
                 {runs.slice().reverse().map((run, i) => (
                    <circle 
                       key={i}
                       cx={(i / (runs.length - 1 || 1)) * 1000} 
                       cy={100 - run.score} 
                       r="4" 
                       className="fill-white stroke-background stroke-2 cursor-pointer hover:r-6 transition-all"
                    />
                 ))}
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] font-bold text-text-muted uppercase tracking-tighter pt-4">
                 <span>T-minus {runs.length} assessments</span>
                 <span>Present</span>
              </div>
           </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-8">
           <div className="flex items-center space-x-4 px-2">
              <Activity className="w-4 h-4 text-text-muted" />
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">Execution History</span>
           </div>

           <div className="space-y-4">
              {runs.map((run, i) => (
                <div key={run.run_id} className="group relative">
                   {/* Vertical line connecting runs */}
                   {i !== runs.length - 1 && (
                     <div className="absolute left-[27px] top-14 bottom-[-16px] w-px bg-white/5 group-hover:bg-white/10 transition-colors" />
                   )}
                   
                   <div className="linear-card flex items-center p-6 gap-8 hover:border-white/20 transition-all cursor-pointer group/card">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex flex-col items-center justify-center shrink-0 group-hover/card:bg-white/[0.06] transition-all">
                         <span className="text-[10px] font-black text-text-muted uppercase tracking-tighter">Score</span>
                         <span className="text-lg font-black text-white">{run.score}</span>
                      </div>

                      <div className="flex-1 space-y-1">
                         <div className="flex items-center gap-3">
                            <h3 className="font-bold text-white text-base tracking-tight uppercase">Run {run.run_id.replace('run_', '')}</h3>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-widest ${
                              run.risk_level === 'high' ? 'text-risk-high border-risk-high/20 bg-risk-high/5' : 
                              'text-success border-success/20 bg-success/5'
                            }`}>
                               {run.risk_level} Risk detected
                            </span>
                         </div>
                         <div className="flex items-center space-x-4 text-[11px] font-medium text-text-secondary">
                            <div className="flex items-center gap-1.5">
                               <Calendar className="w-3 h-3 opacity-50" />
                               {new Date(run.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                            <div className="w-1 h-1 rounded-full bg-white/10" />
                            <div>{run.changes_count} compliance conflicts identified</div>
                         </div>
                      </div>

                      <div className="flex items-center gap-6">
                         <Link 
                            href="/dashboard"
                            className="p-3 rounded-xl hover:bg-white/5 text-text-muted hover:text-white transition-all order-2"
                         >
                            <ChevronRight className="w-5 h-5" />
                         </Link>
                         <Link 
                            href="/impact-report"
                            className="hidden md:flex items-center gap-2 px-4 h-9 rounded-lg border border-white/5 text-[11px] font-bold text-text-muted hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest"
                         >
                            <span>Archive JSON</span>
                            <ArrowUpRight className="w-3 h-3" />
                         </Link>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="flex justify-center pt-8">
           <Link 
              href="/simulate" 
              className="linear-button-secondary h-12 px-10 text-xs font-bold uppercase tracking-[0.2em]"
           >
              Initiate New Cycle
           </Link>
        </div>
      </div>
    </div>
  );
}
