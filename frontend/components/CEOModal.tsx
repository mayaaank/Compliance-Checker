"use client";

import { ShieldAlert, Send, X, Lock, Activity } from "lucide-react";
import { useToast } from "./ToastProvider";

interface CEOModalProps {
  isOpen: boolean;
  onClose: () => void;
  riskCount: number;
}

export default function CEOModal({ isOpen, onClose, riskCount }: CEOModalProps) {
  const { showToast } = useToast();

  const handleDispatch = () => {
    showToast("CEO Briefing transmitted successfully via secure node.", "success");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="linear-card w-full max-w-xl bg-[#0b0b0d] relative overflow-hidden animate-in zoom-in-95 duration-300 shadow-[0_0_100px_rgba(225,29,72,0.1)]">
        
        {/* Animated Scanline for High Urgency */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-risk-high/40 blur-[1px] animate-[loading-slide_3s_infinite]" />
        
        <div className="p-10 border-b border-white/[0.08] flex items-center justify-between font-sans relative z-10">
          <div className="flex items-center space-x-5 text-risk-high">
            <div className="p-3 bg-risk-high/10 rounded-2xl border border-risk-high/30 shadow-[0_0_20px_rgba(225,29,72,0.2)]">
               <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
               <h3 className="font-black tracking-tightest text-2xl text-white px-0.5 leading-none">CEO Critical Briefing</h3>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted px-0.5">PRIORITY PROTOCOL 0x4-X</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-text-muted hover:text-white transition-all hover:bg-white/[0.05] rounded-xl">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-12 space-y-12 font-sans relative z-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-text-secondary">
               <Lock className="w-5 h-5 text-text-muted opacity-40" />
               <p className="text-[14px] font-medium leading-relaxed">
                 You are initiating a high-priority executive briefing intended for the <span className="text-white font-bold">Chief Executive Officer</span>. This transmission is encrypted.
               </p>
            </div>
            <div className="p-10 bg-black/60 rounded-[2rem] border border-white/[0.08] flex items-center justify-between shadow-2xl overflow-hidden relative group font-mono">
              <div className="absolute inset-0 linear-grid opacity-5 pointer-events-none" />
              <div className="relative z-10 space-y-2">
                 <div className="text-6xl font-black text-risk-high tracking-tightest leading-none">{riskCount}</div>
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-risk-high/60">CONFLICT ENTITIES</div>
              </div>
              <div className="relative z-10 flex space-x-1.5 opacity-20 group-hover:opacity-60 transition-opacity">
                {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-10 bg-risk-high rounded-full animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />)}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-[11px] font-black text-text-muted uppercase tracking-[0.4em]">Escalation Level</label>
            <div className="grid grid-cols-3 gap-4">
              <button className="h-14 px-6 rounded-2xl bg-risk-high text-white font-black text-[12px] uppercase tracking-widest shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:scale-[1.02] transition-all border border-risk-high/50">LEVE 1: CRITICAL</button>
              <button className="h-14 px-6 rounded-2xl bg-white/[0.03] text-text-secondary border border-white/10 font-black text-[12px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">LEVEL 2: HIGH</button>
              <button className="h-14 px-6 rounded-2xl bg-white/[0.03] text-text-secondary border border-white/10 font-black text-[12px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">LEVEL 3: ADVISORY</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-[0.4em]">Tactical Briefing (Terminal Injection)</label>
              <Activity className="w-4 h-4 text-text-muted animate-pulse" />
            </div>
            <textarea 
              className="w-full h-40 p-8 bg-black/40 border border-white/[0.08] rounded-[2rem] text-[14px] text-white focus:border-white transition-all placeholder:text-white/10 font-medium leading-relaxed outline-none"
              placeholder="Inject strategic context for the board sequence..."
            />
          </div>

          <button 
            onClick={handleDispatch}
            className="w-full linear-button-primary h-16 text-base group"
          >
            <Send className="w-5 h-5 mr-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            <span>DISPATCH ENCRYPTED BRIEFING</span>
          </button>
          
          <div className="text-center">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.5em] opacity-30">AUTHORIZED PERSONNEL ONLY // SESSION: 0x9A2C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
