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
    success: "text-white bg-white/10 border-white/20",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    error: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className="linear-card p-6 flex items-center gap-6 group hover:border-white/20 transition-all border-neutral-800">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border", colorMap[color])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-0.5">
        <p className="text-[13px] font-bold text-white uppercase tracking-[0.2em]">{title}</p>
        <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      </div>
    </div>
  );
}
