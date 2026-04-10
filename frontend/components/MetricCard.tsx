"use client";

import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: "primary" | "success" | "warning" | "error" | "default";
}

export default function MetricCard({ title, value, icon: Icon, trend, color = "default" }: MetricCardProps) {
  return (
    <div className="linear-card p-6 flex flex-col justify-between h-32 group transition-all hover:bg-white/[0.06] hover:border-white/20">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">{title}</span>
        <div className={`p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] group-hover:bg-white group-hover:text-black transition-all ${
          color === 'error' ? 'text-risk-high' : 
          color === 'warning' ? 'text-risk-medium' : 
          color === 'success' ? 'text-risk-low' : 'text-primary-500'
        }`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="flex items-baseline space-x-3 mt-auto">
        <span className="text-3xl font-black tracking-tightest text-white leading-none">{value}</span>
        {trend && (
          <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${
            trend.startsWith('+') ? 'bg-risk-high/10 text-risk-high' : 'bg-risk-low/10 text-risk-low'
          }`}>
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}
