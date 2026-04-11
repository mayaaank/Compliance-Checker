"use client";

import { useState, useEffect } from "react";
import { 
  Play, X, Monitor, ShieldCheck, Zap, Search, Layers, Layout, 
  FileCode, Terminal, ChevronRight, Settings, Bell
} from "lucide-react";

export default function DemoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const DEMO_STEPS = [
    {
      title: "Step 01: Ingestion",
      label: "Regulatory Ingest",
      desc: "Neural parser deconstructs complex regulatory PDFs (RBI, SEBI, MCA) into semantic structural nodes.",
      icon: Monitor,
      status: "Analyzing Document Structure..."
    },
    {
      title: "Step 02: Detection",
      label: "Semantic Drift Analysis",
      desc: "Our agent swarm compares new text against your internal manuals to find every hidden policy conflict.",
      icon: Search,
      status: "Identifying Compliance Gaps..."
    },
    {
      title: "Step 03: Mapping",
      label: "Neural Cross-Reference",
      desc: "Automatically maps specific policy sections to the relevant global regulatory clauses using RAG.",
      icon: Layers,
      status: "Mapping Relationship Graphs..."
    },
    {
      title: "Step 04: Mitigation",
      label: "Corrective Drafting",
      desc: "Generates high-fidelity policy amendments and creates implementation tasks for separate workstreams.",
      icon: Layout,
      status: "Proposing Corrective Logic..."
    },
    {
      title: "Step 05: Execution",
      label: "Evolution Sync",
      desc: "Syncs approved changes to the Evolution Ledger, updating your company's live compliance score.",
      icon: ShieldCheck,
      status: "Synchronizing Historical Cycle..."
    }
  ];

  useEffect(() => {
    if (!isPlaying) {
      setActiveStep(0);
      return;
    }
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < DEMO_STEPS.length - 1 ? prev + 1 : prev));
    }, 4500); 
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* VS Code Inspired Inline Element */}
      <div className="relative linear-card h-[600px] border-white/[0.1] bg-[#0b0b0d] flex flex-col shadow-2xl overflow-hidden group">
        
        {/* IDE Header/Tabs */}
        <div className="h-10 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between px-4">
          <div className="flex items-center space-x-6 h-full">
            <div className="flex space-x-1.5 opacity-40">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <div className="flex items-center space-x-2 h-full border-b-2 border-white px-2 mt-[2px]">
              <FileCode className="w-3.5 h-3.5 text-white/60" />
              <span className="text-[11px] font-bold text-white uppercase tracking-widest">Compliance_Cycle.sh</span>
            </div>
            <div className="flex items-center space-x-2 h-full px-2 mt-[2px] opacity-30">
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Logs</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 opacity-40">
             <Bell className="w-3.5 h-3.5" />
             <Settings className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* IDE Layout (Sidebar + Editor) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-12 border-r border-white/[0.08] flex flex-col items-center py-6 space-y-8 bg-black/20">
             <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                <Monitor className="w-4 h-4 text-white" />
             </div>
             <Search className="w-5 h-5 opacity-20" />
             <Layers className="w-5 h-5 opacity-20" />
             <Layout className="w-5 h-5 opacity-20" />
             <ShieldCheck className="w-5 h-5 opacity-20" />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 relative flex flex-col p-16 overflow-hidden bg-black/20">
            {!isPlaying ? (
              /* Play Button Overlay (Inactive state) */
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-1000">
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                >
                   <Play className="w-12 h-12 text-black fill-current ml-2" />
                </div>
                <div className="text-center space-y-4">
                  <h4 className="text-3xl font-bold tracking-tight text-white uppercase italic">Neural Cycle Walkthrough</h4>
                  <p className="text-white/40 font-bold tracking-[0.5em] text-[12px] uppercase">Approximate run time: 25.0s</p>
                </div>
              </div>
            ) : (
              /* Active Animation state */
              <div className="h-full flex flex-col space-y-16 animate-in fade-in duration-1000">
                {/* Progress Bar (at top of Editor) */}
                <div className="w-full flex space-x-4">
                   {DEMO_STEPS.map((_, i) => (
                     <div key={i} className="flex-1 space-y-4">
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                           <div 
                             className={`h-full bg-white transition-all duration-[4500ms] ease-linear
                               ${i < activeStep ? "w-full opacity-100" : i === activeStep ? "w-full" : "w-0"}
                             `}
                           />
                        </div>
                     </div>
                   ))}
                </div>

                <div className="flex-1 grid lg:grid-cols-2 gap-20 items-center">
                   <div className="space-y-12 animate-in slide-in-from-left-8 duration-1000">
                      <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold text-white uppercase tracking-[0.3em]">
                         <Zap className="w-4 h-4 fill-current" />
                         <span>{DEMO_STEPS[activeStep].label}</span>
                      </div>
                      <div className="space-y-6">
                         <h3 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                            {DEMO_STEPS[activeStep].title}
                         </h3>
                         <p className="text-xl text-white/50 leading-relaxed font-medium">
                            {DEMO_STEPS[activeStep].desc}
                         </p>
                      </div>
                      <div className="flex items-center space-x-4">
                         <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                         <span className="font-mono text-sm tracking-widest text-white/40 uppercase">
                            {DEMO_STEPS[activeStep].status}
                         </span>
                      </div>
                   </div>

                   {/* Step Visualizer */}
                   <div className="linear-card aspect-video border-white/[0.1] bg-black/40 overflow-hidden relative group p-2 shadow-inner">
                      <div className="absolute inset-0 linear-grid opacity-10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="relative">
                            <div className="absolute -inset-24 bg-white/5 rounded-full blur-[60px] animate-pulse" />
                            {(() => {
                              const Icon = DEMO_STEPS[activeStep].icon;
                              return <Icon className="w-32 h-32 text-white relative z-10 animate-in zoom-in-50 duration-700" />;
                            })()}
                         </div>
                      </div>
                      
                      {/* Step Metadata (Terminal style) */}
                      <div className="absolute bottom-8 left-8 right-8 h-32 bg-black/80 border border-white/10 rounded-xl p-6 font-mono text-[11px] space-y-2">
                         <div className="flex justify-between items-center pb-2 border-b border-white/10">
                            <span className="text-white/40 uppercase">Cluster node_0x{activeStep}</span>
                            <span className="text-white/80">{(98 + Math.random()).toFixed(2)}% Stability</span>
                         </div>
                         <p className="text-white/60 pt-2 opacity-50">{'>>'} Mapping semantic vectors...</p>
                         <p className="text-white/80">{'>>'} Status: <span className="text-emerald-400">ACTIVE</span></p>
                      </div>
                   </div>
                </div>

                {/* Final step buttons */}
                {activeStep === DEMO_STEPS.length - 1 && (
                  <div className="flex justify-center space-x-6 animate-in slide-in-from-bottom-6 duration-1000 delay-500 pb-8">
                     <button 
                       onClick={() => setIsPlaying(false)}
                       className="px-8 h-12 border border-white/20 text-white font-bold text-[13px] rounded-xl hover:bg-white/5 transition-all uppercase tracking-widest"
                     >
                       Replay Interaction
                     </button>
                     <button 
                       onClick={() => window.location.href = '/simulate'}
                       className="px-8 h-12 bg-white text-black font-bold text-[13px] rounded-xl hover:scale-105 transition-all uppercase tracking-widest shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                     >
                       Interactive Mode
                     </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
