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
    <div className="linear-card p-5 space-y-4 group hover:bg-white/[0.04] transition-all">
      <div className="flex items-center justify-between">
         <div className={cn("px-2 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-widest", color)}>
           {label}
         </div>
         <Icon className={cn("w-4 h-4", level === 'high' ? 'text-risk-high' : 'text-text-muted')} />
      </div>
      <div className="space-y-2">
         <h4 className="text-sm font-bold text-white uppercase tracking-tight line-clamp-1">{title}</h4>
         <p className="text-[12px] font-medium text-text-secondary leading-relaxed line-clamp-2">
           {description}
         </p>
      </div>
    </div>
  );
}
