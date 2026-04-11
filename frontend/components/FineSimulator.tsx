"use client";

import { Activity } from "lucide-react";

interface ReferenceCase {
  id: string;
  case: string;
  fine: string;
}

interface FineSimulatorProps {
  probability: number;
  referenceCases: ReferenceCase[];
}

export default function FineSimulator({ probability, referenceCases }: FineSimulatorProps) {
  return (
    <div className="linear-card p-10 space-y-10 relative overflow-hidden border-neutral-800">
      {/* Background glow */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-all duration-1000 ${
        probability > 70 ? 'bg-risk-high/10' : probability > 30 ? 'bg-risk-medium/5' : 'bg-success/5'
      }`} />

      <div className="flex items-center justify-between gap-8 relative z-10 w-full">
        <div className="space-y-3 shrink-0">
           <div className="flex items-center space-x-2 text-white">
              <Activity className="w-5 h-5 opacity-70" />
              <span className="text-[13px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Enforcement Odds</span>
           </div>
           <div className="text-6xl font-black text-white tracking-tightest leading-none shrink-0">{probability}%</div>
        </div>
        <div className="flex-1 flex justify-end">
           <span className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded border whitespace-nowrap inline-flex items-center justify-center ${
              probability > 70 ? 'bg-risk-high/5 border-risk-high/30 text-risk-high' : 'bg-white/5 border-white/10 text-white'
           }`}>
              {probability > 70 ? 'HIGH EXPOSURE' : 'NOMINAL RISK'}
           </span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <span className="text-[13px] font-bold text-white uppercase tracking-[0.3em]">Precedent Database</span>
        <div className="grid gap-3">
           {referenceCases.map((rc) => (
             <div key={rc.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg hover:border-white/20 transition-all">
                <span className="text-[15px] font-bold text-white uppercase tracking-tight">{rc.case}</span>
                <span className="text-sm font-mono font-bold text-white">{rc.fine}</span>
             </div>
           ))}
           {referenceCases.length === 0 && (
             <div className="text-[15px] text-white font-medium py-4 italic">
                No indexed precedents for this clause set.
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
