"use client";

import { useState } from "react";
import { Check, X, Code2, Zap } from "lucide-react";
import { useToast } from "./ToastProvider";
import DeclineAmendmentModal, { RejectionRecord } from "./DeclineAmendmentModal";

interface DiffViewerProps {
  amendments: Array<{
    id: string;
    title: string;
    diff: string;
  }>;
}

export default function DiffViewer({ amendments }: DiffViewerProps) {
  const [decisions, setDecisions] = useState<Record<string, "accepted" | "rejected" | null>>({});
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [activeAmendment, setActiveAmendment] = useState<{id: string, title: string} | null>(null);
  const { showToast } = useToast();

  const handleDecision = (id: string, action: "accepted" | "rejected") => {
    if (action === "rejected") {
      const amendment = amendments.find(a => a.id === id);
      if (amendment) {
        setActiveAmendment({ id: amendment.id, title: amendment.title });
        setIsDeclineModalOpen(true);
      }
      return;
    }
    
    setDecisions(prev => ({ ...prev, [id]: action }));
    showToast(`Amendment approved. Policy updated.`, "success");
  };

  const handleRejectionSubmit = (rejectionData: RejectionRecord) => {
    // Save to localStorage
    const existingRejections = JSON.parse(localStorage.getItem("rejectedReasons") || "[]");
    localStorage.setItem("rejectedReasons", JSON.stringify([...existingRejections, rejectionData]));
    
    setDecisions(prev => ({ ...prev, [rejectionData.change_id]: "rejected" }));
    showToast("Rejection audit record synchronized.", "info");
    setIsDeclineModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {activeAmendment && (
        <DeclineAmendmentModal 
          isOpen={isDeclineModalOpen}
          onClose={() => setIsDeclineModalOpen(false)}
          onSubmit={handleRejectionSubmit}
          amendment={activeAmendment}
        />
      )}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-[0.4em] flex items-center gap-4">
          <Code2 className="w-5 h-5" />
          Neural Drafting Sequence
        </h3>
        <button className="text-[11px] font-bold text-white hover:text-white uppercase tracking-[0.4em] transition-colors flex items-center gap-2 group">
          <Zap className="w-4 h-4 fill-white transition-all shadow-premium" />
          <span>Synchronize Ledger</span>
        </button>
      </div>

      <div className="grid gap-8">
        {amendments.map((amendment) => {
          const decision = decisions[amendment.id];
          const isAccepted = decision === "accepted";
          const isRejected = decision === "rejected";

          return (
            <div 
              key={amendment.id} 
              className={`
                linear-card overflow-hidden group transition-all duration-500
                ${isAccepted ? "border-success/40 bg-success/5" : "border-white/[0.1]"}
                ${isRejected ? "opacity-30 grayscale blur-[1px] scale-[0.98]" : "opacity-100"}
              `}
            >
              <div className="px-8 py-5 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between">
                <span className={`font-bold uppercase tracking-widest text-[12px] transition-colors duration-500 ${isAccepted ? "text-success" : "text-white"}`}>
                  {amendment.title}
                  {isAccepted && " — APPROVED"}
                  {isRejected && " — DISMISSED"}
                </span>
                {!decision && (
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleDecision(amendment.id, "accepted")}
                      className="flex items-center space-x-2 px-4 py-2 bg-success/10 text-success rounded-xl border border-success/30 hover:bg-success hover:text-black transition-all"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">Accept</span>
                    </button>
                    <button 
                      onClick={() => handleDecision(amendment.id, "rejected")}
                      className="flex items-center space-x-2 px-4 py-2 bg-error/10 text-error rounded-xl border border-error/30 hover:bg-error hover:text-white transition-all"
                    >
                      <X className="w-4 h-4 stroke-[3]" />
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">Reject</span>
                    </button>
                  </div>
                )}
                {decision && (
                  <button 
                    onClick={() => setDecisions(prev => ({ ...prev, [amendment.id]: null }))}
                    className="text-[10px] font-bold text-text-muted hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Undo Decision
                  </button>
                )}
              </div>
              
              <div className="p-0 text-[13px] font-mono leading-relaxed">
                <div className="bg-black/40 p-10 whitespace-pre-wrap overflow-x-auto relative min-h-[140px] custom-scrollbar">
                  {amendment.diff.split("\n").map((line, i) => {
                    const isAdded = line.startsWith("+");
                    const isRemoved = line.startsWith("-");
                    return (
                      <div 
                        key={i} 
                        className={`
                          flex px-6 py-0.5 border-l-2 mb-0.5 transition-opacity duration-500
                          ${isAdded ? "bg-success/5 text-success border-success/50" : isRemoved ? "bg-error/5 text-error border-error/50" : "text-text-secondary opacity-40 border-transparent"}
                          ${isRejected ? "opacity-10" : "opacity-100"}
                        `}
                      >
                        <span className="w-12 shrink-0 opacity-20 select-none text-[11px] font-sans font-bold">{(i + 1).toString().padStart(3, '0')}</span>
                        <span className="tracking-tight">{line}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
