"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: number;
  name: string;
  icon: LucideIcon;
  task: string;
}

interface AgentStepperProps {
  activeAgent: number;
  agents: Agent[];
}

export default function AgentStepper({ activeAgent, agents }: AgentStepperProps) {
  return (
    <div className="space-y-4">
      {agents.map((agent) => {
        const Icon = agent.icon;
        const isActive = activeAgent === agent.id;
        const isCompleted = activeAgent > agent.id;

        return (
          <div 
            key={agent.id}
            className={cn(
              "flex items-start gap-6 p-6 rounded-2xl border transition-all duration-500",
              isActive ? "bg-white/[0.04] border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.03)] scale-[1.02]" : "border-transparent opacity-40"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500",
              isCompleted ? "bg-emerald-500/10 text-emerald-400" :
              isActive ? "bg-primary-500/20 text-primary-400" : "bg-white/5 text-text-muted"
            )}>
              <Icon className={cn("w-6 h-6", isActive && "animate-pulse")} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Step 0{agent.id}</span>
                {isCompleted && <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Complete</span>}
              </div>
              <h3 className={cn(
                "text-base font-bold transition-colors duration-500",
                isActive || isCompleted ? "text-white" : "text-text-muted"
              )}>
                {agent.name}
              </h3>
              {isActive && (
                <p className="text-sm font-medium text-text-secondary leading-relaxed animate-fade-in">
                  {agent.task}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
