"use client";

import React, { useState, useEffect } from "react";
import { 
  X, AlertTriangle, ShieldCheck, ArrowRight, Vote, 
  Trash2, Clock, User, MessageCircle, MoreHorizontal 
} from "lucide-react";
import { useToast } from "@/components/ToastProvider";

interface RejectionRecord {
  change_id: string;
  title: string;
  reason: string;
  declined_impact: string;
  accepted_impact: string;
  rejectedBy: string;
  timestamp: string;
}

export default function RejectedReasonsPage() {
  const [rejections, setRejections] = useState<RejectionRecord[]>([]);
  const [votingState, setVotingState] = useState<Record<string, "idle" | "voting" | "complete">>({});
  const { showToast } = useToast();

  useEffect(() => {
    const data = localStorage.getItem("rejectedReasons");
    if (data) {
      setRejections(JSON.parse(data));
    }
  }, []);

  const handleStartVote = (id: string) => {
    setVotingState(prev => ({ ...prev, [id]: "voting" }));
    setTimeout(() => {
      setVotingState(prev => ({ ...prev, [id]: "complete" }));
      showToast("Unanimous vote cycle established.", "success");
    }, 3000);
  };

  const clearRecords = () => {
    localStorage.removeItem("rejectedReasons");
    setRejections([]);
    showToast("Audit logs cleared.", "info");
  };

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen animate-fade-in uppercase-none">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-12 gap-8">
           <div className="space-y-6">
              <div className="flex items-center space-x-4 text-[13px] font-bold text-white uppercase tracking-[0.5em]">
                <AlertTriangle className="w-4 h-4 text-error" />
                <span>Rejection Repository · Audit Trail</span>
              </div>
              <h1 className="text-5xl font-black tracking-tightest text-white">Rejected Reasons</h1>
              <p className="text-white/40 text-lg font-medium max-w-2xl leading-relaxed">
                A historical log of all automated corrective actions declined by the compliance team. 
                Includes mandatory impact analysis for regulatory auditing.
              </p>
           </div>
           {rejections.length > 0 && (
             <button 
               onClick={clearRecords}
               className="flex items-center space-x-3 px-6 h-12 border border-white/10 text-white/40 hover:text-white hover:border-white/40 rounded-xl transition-all text-[13px] font-bold uppercase tracking-widest"
             >
                <Trash2 className="w-4 h-4" />
                <span>Clear Archives</span>
             </button>
           )}
        </div>

        {rejections.length === 0 ? (
          <div className="py-40 flex flex-col items-center justify-center space-y-6 opacity-20">
             < ShieldCheck className="w-16 h-16" />
             <p className="text-xl font-bold uppercase tracking-widest">No Rejection Nodes Logged</p>
          </div>
        ) : (
          <div className="grid gap-8">
             {rejections.map((rec, i) => (
               <div key={rec.change_id + i} className="linear-card group hover:border-white/20 transition-all overflow-hidden border-white/[0.08]">
                  
                  {/* Card Header */}
                  <div className="px-10 py-6 bg-white/[0.02] border-b border-white/[0.05] flex items-center justify-between">
                     <div className="flex items-center space-x-6">
                        <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center border border-error/20">
                           <X className="w-5 h-5 text-error" />
                        </div>
                        <div className="space-y-0.5">
                           <h3 className="font-black text-lg text-white tracking-tight">{rec.title}</h3>
                           <div className="flex items-center space-x-4 text-[11px] font-bold text-white/30 uppercase tracking-widest">
                              <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {rec.rejectedBy}</span>
                              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {new Date(rec.timestamp).toLocaleString()}</span>
                           </div>
                        </div>
                     </div>
                     <button className="p-2 text-white/20 hover:text-white transition-opacity opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-10 space-y-12">
                     <div className="space-y-4">
                        <label className="text-[11px] font-bold text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                           <MessageCircle className="w-3.5 h-3.5" /> Rejection Rationale
                        </label>
                        <p className="text-[16px] font-medium text-white/80 leading-relaxed bg-white/[0.02] p-8 rounded-2xl border border-white/[0.05]">
                           {rec.reason}
                        </p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <label className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em]">Business Impact if Declined</label>
                           <div className="p-6 rounded-2xl border border-error/10 bg-error/[0.02] text-[14px] text-white/60 font-medium leading-relaxed italic">
                              "{rec.declined_impact}"
                           </div>
                        </div>
                        <div className="space-y-4">
                           <label className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em]">Business Impact if Accepted</label>
                           <div className="p-6 rounded-2xl border border-success/10 bg-success/[0.02] text-[14px] text-white/60 font-medium leading-relaxed italic">
                              "{rec.accepted_impact}"
                           </div>
                        </div>
                     </div>

                     {/* Voting Simulation */}
                     <div className="pt-10 border-t border-white/[0.05] flex flex-col items-center space-y-8">
                        <div className="flex items-center -space-x-4">
                           {[1, 2, 3].map(j => (
                             <div key={j} className={`w-12 h-12 rounded-full border-4 border-black bg-neutral-800 flex items-center justify-center text-[14px] font-bold ${votingState[rec.change_id] === "complete" ? "border-success/40" : "border-white/10"}`}>
                                {j === 1 ? rec.rejectedBy.charAt(0) : (j === 2 ? 'L' : 'H')}
                             </div>
                           ))}
                        </div>
                        
                        {votingState[rec.change_id] === "complete" ? (
                          <div className="flex items-center space-x-3 text-success font-black text-[13px] uppercase tracking-[0.4em] animate-in zoom-in-95 duration-500">
                             <ShieldCheck className="w-5 h-5" />
                             <span>Unanimous Consensus Reached</span>
                          </div>
                        ) : (
                          <button 
                            disabled={votingState[rec.change_id] === "voting"}
                            onClick={() => handleStartVote(rec.change_id)}
                            className={`
                              px-12 h-14 rounded-2xl text-[14px] font-black uppercase tracking-widest flex items-center gap-4 transition-all
                              ${votingState[rec.change_id] === "voting" ? "bg-white/5 text-white/20 border border-white/5 animate-pulse" : "bg-white text-black hover:scale-[1.05] shadow-[0_0_50px_rgba(255,255,255,0.1)]"}
                            `}
                          >
                             {votingState[rec.change_id] === "voting" ? (
                               <>
                                 <div className="w-4 h-4 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                                 <span>Collecting Consensus...</span>
                               </>
                             ) : (
                               <>
                                 <span>Start Unanimous Vote</span>
                                 <Vote className="w-5 h-5" />
                               </>
                             )}
                          </button>
                        )}
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
