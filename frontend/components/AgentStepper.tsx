"use client";

import { Check, Loader2, LucideIcon } from "lucide-react";

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
    <div className="w-full space-y-4">
      {agents.map((agent, i) => {
        const isComplete = i + 1 < activeAgent;
        const isActive = i + 1 === activeAgent;
        const Icon = agent.icon;

        return (
          <div
            key={i}
            className={`
              flex items-center space-x-6 p-6 rounded-2xl border transition-all duration-700
              ${isActive ? "bg-white/[0.04] border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.02)] scale-100" : "border-transparent opacity-30 scale-95"}
              ${isComplete ? "opacity-20" : "opacity-100"}
            `}
          >
            <div
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500
                ${isComplete ? "bg-risk-low/10 border-risk-low/20 text-risk-low" : isActive ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "bg-white/[0.02] border-white/[0.05] text-text-muted"}
              `}
            >
              {isComplete ? (
                <Check className="w-5 h-5 stroke-[4]" />
              ) : isActive ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-3">
                <span className={`text-[14px] font-black uppercase tracking-tight ${isActive ? "text-white" : "text-text-muted"}`}>
                  {agent.name}
                </span>
                {isActive && <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]" />}
              </div>
              <div className={`text-[12px] font-medium leading-relaxed ${isActive ? "text-text-secondary" : "text-text-muted opacity-60"}`}>
                {isComplete ? "Handover successful." : isActive ? agent.task : "Awaiting resource queue..."}
              </div>
            </div>

            {isActive && (
              <div className="hidden sm:flex items-center space-x-1 opacity-20">
                 <div className="w-1 h-4 bg-white rounded-full animate-pulse" />
                 <div className="w-1 h-3 bg-white rounded-full animate-pulse delay-75" />
                 <div className="w-1 h-5 bg-white rounded-full animate-pulse delay-150" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
