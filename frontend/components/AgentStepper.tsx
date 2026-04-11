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
              "linear-card flex items-start gap-6 p-6 transition-all duration-300 border-white/[0.05]",
              isActive ? "border-white/40 bg-white/[0.05] shadow-premium scale-[1.01]" : "opacity-60"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-500",
              isCompleted ? "bg-white/10 text-white border-white/20" :
              isActive ? "bg-white text-black border-white" : "bg-white/5 text-white/20 border-white/5"
            )}>
              <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Step 0{agent.id}</span>
                {isCompleted && <span className="text-[9px] font-bold text-white uppercase tracking-widest opacity-60">Verified</span>}
              </div>
              <h3 className={cn(
                "text-[15px] font-bold transition-colors duration-500",
                isActive || isCompleted ? "text-white" : "text-white/40"
              )}>
                {agent.name}
              </h3>
              {isActive && (
                <p className="text-[14px] font-medium text-white/80 leading-relaxed animate-fade-in">
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
