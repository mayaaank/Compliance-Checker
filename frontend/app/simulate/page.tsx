"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, ArrowRight, Cpu, Layout, ShieldCheck } from "lucide-react";
import FileUploadZone from "@/components/FileUploadZone";
import { runComplianceCheck } from "@/lib/api";

export default function SimulatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleStartSimulation = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      await runComplianceCheck();
      router.push("/live-agents");
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen flex flex-col items-center justify-center relative">
       <div className="absolute inset-0 linear-grid mask-fade-top opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl w-full space-y-16 animate-fade-in text-center relative z-10">
        
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-3 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-primary-500 uppercase tracking-[0.3em] animate-fade-in mx-auto">
             <ShieldCheck className="w-3.5 h-3.5" />
             <span>Document Intelligence Layer</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tightest text-white leading-tight">
            Map your policy <br /> to regulatory reality.
          </h1>
          <p className="text-text-secondary text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Upload your internal manual. Our agent swarm will identify drift across global circulars and propose corrective logic.
          </p>
        </div>

        <div className="linear-card p-12 space-y-12 text-left shadow-[0_0_80px_rgba(255,255,255,0.01)]">
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">Policy Ingestion</span>
                <span className="text-[10px] font-bold text-success/60 uppercase tracking-widest flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-success/60 rounded-full animate-pulse" />
                   SECURE CHANNEL ACTIVE
                </span>
             </div>
             <FileUploadZone onFileSelect={setFile} />
          </div>

          <div className="grid md:grid-cols-2 gap-10 border-t border-white/[0.08] pt-12">
             <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white">
                   <FileText className="w-5 h-5 text-text-muted" />
                   <span className="text-[13px] font-bold uppercase tracking-tight">Structured Parsing</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                   Full PDF/DOCX deconstruction using neural embeddings. ISO-grade metadata extraction.
                </p>
             </div>
             <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white">
                   <Cpu className="w-5 h-5 text-text-muted" />
                   <span className="text-[13px] font-bold uppercase tracking-tight">Agent Selection</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                   Automatic task-routing to specialized regulatory harvesters for RBI, MCA, and SEBI nodes.
                </p>
             </div>
          </div>

          <button 
            disabled={!file || isUploading}
            onClick={handleStartSimulation}
            className="w-full linear-button-primary h-14 text-base group"
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-3 border-black/20 border-t-black rounded-full animate-spin mr-3" />
                <span>Activating Agents...</span>
              </>
            ) : (
              <>
                <span>Launch Assessment Cycle</span>
                <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
        
        <div className="pt-12 flex items-center justify-center space-x-16 opacity-30 grayscale hover:opacity-100 group hover:grayscale-0 transition-all">
           <div className="text-center space-y-2">
              <div className="text-xl font-bold text-white tracking-widest">0.4k</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted">Agent Nodes</div>
           </div>
           <div className="h-8 w-px bg-white/10" />
           <div className="text-center space-y-2">
              <div className="text-xl font-bold text-white tracking-widest">99.9%</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted">Node Uptime</div>
           </div>
           <div className="h-8 w-px bg-white/10" />
           <div className="text-center space-y-2">
              <div className="text-xl font-bold text-white tracking-widest">AES-256</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted">Encryption</div>
           </div>
        </div>
      </div>
    </div>
  );
}
