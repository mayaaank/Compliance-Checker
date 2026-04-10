"use client";

import React from "react";
import { ListChecks, User, CheckCircle2, Circle, Clock } from "lucide-react";

export default function TaskBreakdown() {
  const departments = [
    {
      name: "Legal & Compliance",
      tasks: [
        { id: 1, text: "Finalize document amendment signature loop", status: "In Progress", assignee: "Sarah K." },
        { id: 2, text: "Audit trail archival for RBI/2026/41", status: "To Do", assignee: "Compliance Bot" }
      ]
    },
    {
      name: "IT & Infrastructure",
      tasks: [
        { id: 3, text: "Configure localized DB shard for audit logs", status: "In Progress", assignee: "DevOps Prime" },
        { id: 4, text: "Implement 256-bit encryption on bridge nodes", status: "To Do", assignee: "Security Lead" }
      ]
    },
    {
      name: "Operations & HR",
      tasks: [
        { id: 5, text: "Update onboarding handbook with Section 1 logic", status: "To Do", assignee: "Marcus A." },
        { id: 6, text: "Internal team training session (Q3 Compliance)", status: "To Do", assignee: "L&D Head" }
      ]
    }
  ];

  return (
    <div className="linear-card p-10 space-y-10 border-neutral-800">
      <div className="flex items-center space-x-4 border-b border-white/[0.05] pb-8">
        <ListChecks className="w-5 h-5 text-white" />
        <div className="space-y-1">
           <h3 className="text-[13px] font-bold text-white uppercase tracking-[0.4em]">Compliance Tasks by Department</h3>
           <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest pl-0">Cross-functional remediation queue</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {departments.map((dept, i) => (
          <div key={i} className="space-y-6">
            <h4 className="text-[12px] font-black text-white/40 uppercase tracking-widest border-b border-white/5 pb-4">
               {dept.name}
            </h4>
            <div className="space-y-4">
               {dept.tasks.map(task => (
                 <div key={task.id} className="group cursor-pointer">
                    <div className="flex items-start gap-4">
                       <div className="mt-1">
                          {task.status === "In Progress" ? (
                             <Clock className="w-4 h-4 text-risk-medium" />
                          ) : (
                             <Circle className="w-4 h-4 text-white/20 group-hover:text-white/40" />
                          )}
                       </div>
                       <div className="space-y-2">
                          <p className="text-[14px] font-medium text-white/80 leading-tight group-hover:text-white transition-colors">{task.text}</p>
                          <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5">
                                <User className="w-3 h-3 text-white/30" />
                                <span className="text-[10px] font-bold text-white/40">{task.assignee}</span>
                             </div>
                             <span className={`text-[10px] font-black uppercase tracking-widest ${task.status === "In Progress" ? "text-risk-medium" : "text-white/20"}`}>
                                {task.status}
                             </span>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
