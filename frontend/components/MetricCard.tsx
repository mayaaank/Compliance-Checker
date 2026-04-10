"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "primary" | "success" | "warning" | "error";
}

export default function MetricCard({ title, value, icon: Icon, color = "primary" }: MetricCardProps) {
  const colorMap = {
    primary: "text-primary-400 bg-primary-500/10 border-primary-500/20",
    success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    error: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className="linear-card p-6 flex items-center gap-6 group hover:border-white/20 transition-all">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border", colorMap[color])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">{title}</p>
        <div className="text-2xl font-black text-white tracking-tight">{value}</div>
      </div>
    </div>
  );
}
