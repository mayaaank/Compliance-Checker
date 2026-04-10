"use client";

import { AlertTriangle, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

interface RiskCardProps {
  id: string;
  title: string;
  description: string;
  level: "high" | "medium" | "low";
}

export default function RiskCard({ title, description, level }: RiskCardProps) {
  const icons = {
    high: AlertTriangle,
    medium: AlertCircle,
    low: CheckCircle2,
  };

  const riskColors = {
    high: "text-risk-high border-risk-high/30 bg-risk-high/10",
    medium: "text-risk-medium border-risk-medium/30 bg-risk-medium/10",
    low: "text-risk-low border-risk-low/30 bg-risk-low/10",
  };

  const Icon = icons[level];

  return (
    <div className="linear-card p-6 flex items-start gap-5 cursor-pointer linear-card-hover group border-white/[0.08] hover:border-white/20">
      <div className={`mt-0.5 p-2 rounded-xl border ${riskColors[level]} shadow-[0_0_15px_rgba(0,0,0,0.2)]`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-[14px] font-black text-white uppercase tracking-tight leading-none">{title}</h4>
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity`}>{level}</span>
        </div>
        <p className="text-[12px] text-text-secondary leading-relaxed font-medium pr-4">
          {description}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 text-text-muted mt-0.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
    </div>
  );
}
