"use client";

import React from "react";
import { AlertCircle, Clock, ShieldAlert, TrendingUp } from "lucide-react";

interface PriorityScoringProps {
  changes: any[];
  totalExpectedFine: number;
}

export default function PriorityScoring({ changes, totalExpectedFine }: PriorityScoringProps) {
  return (
    <div className="linear-card p-10 space-y-8 border-neutral-800">
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-6">
        <div className="space-y-1">
          <h3 className="text-[13px] font-bold text-white uppercase tracking-[0.4em] flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-risk-high" />
            Risk & Penalty Overview
          </h3>
          <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest pl-8">Prioritized Compliance Roadmap</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">Est. Regulatory Exposure</p>
          <p className="text-3xl font-black text-white leading-tight">₹{totalExpectedFine.toFixed(1)}L</p>
        </div>
      </div>

      <div className="grid gap-4">
        {changes.map((change, i) => {
          const priority = change.risk === "high" ? "High" : (change.risk === "medium" ? "Medium" : "Low");
          const colorClass = change.risk === "high" ? "border-risk-high" : (change.risk === "medium" ? "border-risk-medium" : "border-risk-low");
          const bgClass = change.risk === "high" ? "bg-risk-high/5" : (change.risk === "medium" ? "bg-risk-medium/5" : "bg-risk-low/5");

          return (
            <div key={i} className={`flex items-center justify-between p-6 rounded-2xl border-l-4 ${colorClass} ${bgClass} border border-white/5 hover:bg-white/[0.02] transition-all group`}>
              <div className="flex items-center space-x-6">
                 <div className="space-y-1">
                    <p className="text-[14px] font-bold text-white group-hover:text-white transition-colors">{change.affected_section || "General Provision"}</p>
                    <div className="flex items-center space-x-4 text-[11px] font-bold uppercase tracking-widest text-white/30">
                       <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 14 Days Remaining</span>
                       <span className="flex items-center gap-1.5 text-risk-high"><AlertCircle className="w-3.5 h-3.5" /> ₹{priority === "High" ? "5.0L+" : "0.5L"} Potential Fine</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Priority</p>
                    <p className={`text-[12px] font-black uppercase tracking-widest ${priority === "High" ? "text-risk-high" : (priority === "Medium" ? "text-risk-medium" : "text-risk-low")}`}>
                       {priority}
                    </p>
                 </div>
                 <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <TrendingUp className="w-4 h-4 text-white" />
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
