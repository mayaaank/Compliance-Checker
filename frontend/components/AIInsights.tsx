"use client";

import React from "react";
import { Sparkles, ArrowRight, Target, Zap, Waves } from "lucide-react";

interface AIInsightsProps {
  summary: string;
}

export default function AIInsights({ summary }: AIInsightsProps) {
  const insights = [
    {
       title: "Strategic Implications",
       content: "The realignment of KYC parameters requires a unified data layer across retail and corporate divisions to maintain the evolution score.",
       icon: Target,
       color: "text-blue-400"
    },
    {
       title: "Competitive Landscape",
       content: "Early adoption of the localized storage mandate could provide a 6-month product velocity advantage over regional peers.",
       icon: Zap,
       color: "text-amber-400"
    },
    {
       title: "Cross-Department Synchronization",
       content: "Legal and IT must finalize the encryption bridge within 45 days to avoid operational deadlock during the next audit cycle.",
       icon: Waves,
       color: "text-emerald-400"
    },
    {
       title: "Long-term Residual Risk",
       content: "Manual processing of Section 4.2 items remains a high-entropy vulnerability; recommended phased transition to automated corrective logic.",
       icon: Sparkles,
       color: "text-purple-400"
    }
  ];

  return (
    <div className="linear-card p-12 space-y-10 border-neutral-800">
      <div className="flex items-center space-x-4 border-b border-white/[0.05] pb-8">
        <Sparkles className="w-6 h-6 text-white animate-pulse" />
        <div className="space-y-1">
           <h3 className="text-[13px] font-bold text-white uppercase tracking-[0.4em]">AI Insights on Policy Dynamics</h3>
           <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest leading-none">Contextual Analysis for {summary.split(' ')[0]} nodes</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {insights.map((insight, i) => (
          <div key={i} className="space-y-6 group">
             <div className={`p-3 rounded-xl bg-white/[0.03] w-min border border-white/5 ${insight.color} transition-all group-hover:scale-110`}>
                <insight.icon className="w-5 h-5" />
             </div>
             <div className="space-y-3">
                <h4 className="text-[14px] font-black text-white uppercase tracking-tight">{insight.title}</h4>
                <p className="text-[13px] text-white/40 leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                   {insight.content}
                </p>
             </div>
          </div>
        ))}
      </div>

      <div className="pt-6">
         <button className="flex items-center space-x-3 text-[11px] font-black text-white/30 uppercase tracking-[0.4em] hover:text-white transition-all group">
            <span>Generate Deep-Dive Impact Report</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
         </button>
      </div>
    </div>
  );
}
