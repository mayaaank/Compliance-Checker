"use client";

import { AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskCardProps {
  id: string;
  title: string;
  description: string;
  level: "high" | "medium" | "low";
}

export default function RiskCard({ title, description, level }: RiskCardProps) {
  const config = {
    high: {
      icon: ShieldAlert,
      color: "text-risk-high bg-risk-high/10 border-risk-high/20",
      label: "Critical Conflict",
    },
    medium: {
      icon: AlertTriangle,
      color: "text-risk-medium bg-risk-medium/10 border-risk-medium/20",
      label: "Moderate Drift",
    },
    low: {
      icon: ShieldCheck,
      color: "text-risk-low bg-risk-low/10 border-risk-low/20",
      label: "Minor Optimization",
    },
  };

  const { icon: Icon, color, label } = config[level];

  return (
    <div className="linear-card p-6 space-y-4 hover:border-white/20 transition-all cursor-default border-neutral-800">
      <div className="flex items-center justify-between">
         <div className={cn("px-2.5 py-1 rounded border text-[11px] font-bold uppercase tracking-widest whitespace-nowrap", color)}>
           {label}
         </div>
         <Icon className={cn("w-4 h-4 opacity-50")} />
      </div>
      <div className="space-y-2">
         <h4 className="text-[14px] font-bold text-white uppercase tracking-tight line-clamp-1">{title}</h4>
         <p className="text-[13px] font-medium text-white/70 leading-relaxed line-clamp-2">
           {description}
         </p>
      </div>
    </div>
  );
}
