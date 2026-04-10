"use client";

import React, { useState, useEffect } from "react";
import { X, AlertTriangle, ShieldCheck, ArrowRight, Vote } from "lucide-react";
import { useToast } from "./ToastProvider";

interface DeclineAmendmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rejectionData: RejectionRecord) => void;
  amendment: {
    id: string;
    title: string;
  };
}

export interface RejectionRecord {
  change_id: string;
  title: string;
  reason: string;
  declined_impact: string;
  accepted_impact: string;
  rejectedBy: string;
  timestamp: string;
}

export default function DeclineAmendmentModal({ isOpen, onClose, onSubmit, amendment }: DeclineAmendmentModalProps) {
  const { showToast } = useToast();
  const [reason, setReason] = useState("");
  const [declinedImpact, setDeclinedImpact] = useState("");
  const [acceptedImpact, setAcceptedImpact] = useState("");
  const [userName, setUserName] = useState("Compliance Officer");

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserName(JSON.parse(profile).fullName);
    }
  }, []);

  const isValid = 
    reason.length >= 30 && 
    declinedImpact.length >= 20 && 
    acceptedImpact.length >= 20;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const record: RejectionRecord = {
      change_id: amendment.id,
      title: amendment.title,
      reason,
      declined_impact: declinedImpact,
      accepted_impact: acceptedImpact,
      rejectedBy: userName,
      timestamp: new Date().toISOString()
    };

    onSubmit(record);
    setReason("");
    setDeclinedImpact("");
    setAcceptedImpact("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-neutral-950/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="max-w-2xl w-full bg-neutral-900 border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="space-y-1">
             <h2 className="text-2xl font-black tracking-tightest text-white uppercase">Decline Amendment</h2>
             <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">{amendment.title}</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/20 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar space-y-10">
          <div className="flex items-start gap-4 p-6 bg-error/5 border border-error/20 rounded-2xl">
             <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-1" />
             <div className="space-y-1">
                <p className="text-[14px] font-bold text-white">Critical Decision Protocol</p>
                <p className="text-[13px] text-white/50 leading-relaxed font-medium">Rejections require impact analysis across both scenarios to justify circular drift to auditors.</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
             <div className="space-y-3">
                <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">
                   Why are you rejecting this regulatory change?
                   <span className="ml-4 lowercase tracking-normal text-white/20 font-medium">(min 30 characters)</span>
                </label>
                <textarea 
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium resize-none custom-scrollbar"
                  placeholder="Provide clinical reasoning for declining the automated corrective logic..."
                />
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Business Impact if Declined</label>
                   <textarea 
                     required
                     value={declinedImpact}
                     onChange={(e) => setDeclinedImpact(e.target.value)}
                     className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium resize-none custom-scrollbar"
                     placeholder="Risk disclosure, audit implication, or operational friction..."
                   />
                </div>
                <div className="space-y-3">
                   <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Business Impact if Accepted</label>
                   <textarea 
                     required
                     value={acceptedImpact}
                     onChange={(e) => setAcceptedImpact(e.target.value)}
                     className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium resize-none custom-scrollbar"
                     placeholder="Cost of compliance, technical complexity, or resource drag..."
                   />
                </div>
             </div>

             <div className="pt-4 flex items-center justify-between gap-6 border-t border-white/5 mt-4">
                <p className="text-[12px] text-white/30 font-medium">
                   Authorized by: <span className="text-white/60">{userName}</span>
                </p>
                <button 
                  type="submit"
                  disabled={!isValid}
                  className={`
                    px-10 h-14 rounded-2xl text-[14px] font-black uppercase tracking-widest flex items-center gap-3 transition-all
                    ${isValid ? "bg-white text-black hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)]" : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"}
                  `}
                >
                   <span>Confirm Rejection</span>
                   <ShieldCheck className="w-5 h-5" />
                </button>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
}
