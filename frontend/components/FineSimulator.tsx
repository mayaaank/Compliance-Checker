"use client";

import { Gavel, Zap, ArrowRight } from "lucide-react";

interface FineSimulatorProps {
  probability: number;
  referenceCases: Array<{
    id: string;
    case: string;
    fine: string;
  }>;
}

export default function FineSimulator({ probability, referenceCases }: FineSimulatorProps) {
  return (
    <div className="linear-card p-10 space-y-12 shadow-[0_0_80px_rgba(255,255,255,0.01)]">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-8">
        <div className="flex items-center space-x-5">
          <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-xl flex items-center justify-center text-text-muted group">
            <Gavel className="w-6 h-6 transition-transform group-hover:scale-110" />
          </div>
          <div className="space-y-1">
            <h3 className="font-black text-white tracking-tight text-lg">Predictive Exposure</h3>
            <p className="text-[10px] text-text-muted uppercase tracking-[0.4em] font-bold">NODE: ENFORCEMENT-V2</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-white tracking-tightest uppercase">{probability}%</div>
          <div className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] mt-1">Likeliness</div>
        </div>
      </div>
      
      <div className="space-y-12">
        <div className="space-y-6">
          <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">
            <span>Low Drift</span>
            <span>Policy Rupture</span>
          </div>
          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden flex relative shadow-inner">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(255,255,255,0.4)]"
              style={{ width: `${probability}%` }}
            />
          </div>
          <div className="flex items-center space-x-3 px-1">
            <Zap className="w-4 h-4 text-white" />
            <p className="text-[11px] text-text-muted font-bold uppercase tracking-[0.3em]">
              Projected enforcement focus: <span className="text-white">+14.2% Variance</span>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.4em] border-b border-white/[0.03] pb-4">Historical Precedent</h4>
          <div className="overflow-hidden border border-white/[0.1] rounded-2xl bg-black/40">
            <table className="w-full text-left text-[12px] font-medium tracking-tight">
              <thead>
                <tr className="bg-white/[0.03] text-text-muted border-b border-white/[0.08]">
                  <th className="px-6 py-4 font-bold uppercase tracking-widest">Precedent Case</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-widest text-right">Settlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {referenceCases.map((ref) => (
                  <tr key={ref.id} className="text-text-secondary hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-6 py-5 group-hover:text-white transition-colors">{ref.case}</td>
                    <td className="px-6 py-5 text-white font-bold text-right tracking-tight">{ref.fine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full h-11 border border-white/[0.08] rounded-xl text-[11px] font-bold text-text-muted uppercase tracking-[0.3em] hover:bg-white/[0.03] hover:text-white transition-all flex items-center justify-center group">
             View Full Enforcement Trends
             <ArrowRight className="w-3.5 h-3.5 ml-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
