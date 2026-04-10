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
    <div className="linear-card p-10 space-y-10 relative overflow-hidden">
      {/* Background glow */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-all duration-1000 ${
        probability > 70 ? 'bg-risk-high/20' : probability > 30 ? 'bg-risk-medium/10' : 'bg-success/5'
      }`} />

      <div className="flex items-center justify-between relative z-10">
        <div className="space-y-2">
           <div className="flex items-center space-x-2 text-text-muted">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Enforcement Odds</span>
           </div>
           <div className="text-5xl font-black text-white tracking-tightest">{probability}%</div>
        </div>
        <div className="text-right">
           <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
              probability > 70 ? 'bg-risk-high/10 border-risk-high/20 text-risk-high' : 'bg-white/5 border-white/10 text-white/40'
           }`}>
              {probability > 70 ? 'HIGH EXPOSURE' : 'NOMINAL RISK'}
           </span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Precedent Database</span>
        <div className="grid gap-3">
           {referenceCases.map((rc) => (
             <div key={rc.id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.05] rounded-xl hover:bg-white/[0.05] transition-all">
                <span className="text-[13px] font-bold text-white uppercase tracking-tight">{rc.case}</span>
                <span className="text-xs font-mono font-bold text-risk-high">{rc.fine}</span>
             </div>
           ))}
           {referenceCases.length === 0 && (
             <div className="text-[12px] text-text-muted font-medium py-4 italic">
                No indexed precedents for this clause set.
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
