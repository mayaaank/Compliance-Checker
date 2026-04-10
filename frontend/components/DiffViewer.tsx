"use client";

import { Check, X, Code2, Zap } from "lucide-react";

interface DiffViewerProps {
  amendments: Array<{
    id: string;
    title: string;
    diff: string;
  }>;
}

export default function DiffViewer({ amendments }: DiffViewerProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.4em] flex items-center gap-4">
          <Code2 className="w-4 h-4" />
          Neural Drafting Sequence
        </h3>
        <button className="text-[10px] font-bold text-white hover:text-white/70 uppercase tracking-[0.3em] transition-colors flex items-center gap-2 group">
          <Zap className="w-3.5 h-3.5 fill-transparent group-hover:fill-current transition-all" />
          <span>Synchronize Ledger</span>
        </button>
      </div>

      <div className="grid gap-8">
        {amendments.map((amendment) => (
          <div key={amendment.id} className="linear-card overflow-hidden group border-white/[0.1] hover:border-white/20">
            <div className="px-8 py-5 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between">
              <span className="font-bold text-white uppercase tracking-widest text-[12px]">{amendment.title}</span>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-success/10 text-success rounded-xl border border-success/30 hover:bg-success hover:text-black transition-all">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">Accept</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-error/10 text-error rounded-xl border border-error/30 hover:bg-error hover:text-white transition-all">
                  <X className="w-4 h-4 stroke-[3]" />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">Reject</span>
                </button>
              </div>
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
                        flex px-6 py-0.5 border-l-2 mb-0.5
                        ${isAdded ? "bg-success/5 text-success border-success/50" : isRemoved ? "bg-error/5 text-error border-error/50" : "text-text-secondary opacity-40 border-transparent"}
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
        ))}
      </div>
    </div>
  );
}
