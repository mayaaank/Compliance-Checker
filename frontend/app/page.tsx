"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, Zap, Play, CheckCircle2, AlertTriangle, 
  Scale, FileSearch, TrendingUp, Vote, Workflow, 
  BarChart3, Presentation, Search, Layers, Monitor,
  ShieldCheck, Layout, Terminal, FileCode, Shield, Radio
} from "lucide-react";
import { useToast } from "@/components/ToastProvider";
import { runComplianceCheck } from "@/lib/api";
import DemoPlayer from "@/components/DemoPlayer";

export default function LandingPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const handleLaunchAutonomous = async () => {
    try {
      showToast("Initializing Autonomous Demo Layer...", "info");
      await runComplianceCheck();
      router.push("/live-agents");
    } catch (err) {
      showToast("Node Handshake Failed", "error");
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white font-sans selection:bg-white/10 uppercase-none">
      {/* Global Grain/Noise Overlay for depth */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 overflow-hidden" />
      
      {/* Background Atmosphere */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[160px] pointer-events-none" />

      {/* 2. Hero Section */}
      <section className="relative pt-44 pb-32 px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center space-y-12">
          <div className="inline-flex items-center space-x-3 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-bold text-white uppercase tracking-[0.4em] animate-fade-in shadow-xl">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span>Autonomous Intelligence v2.5 Synchronized</span>
          </div>

          <div className="space-y-10 max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black tracking-tightest leading-[1.02] animate-in slide-in-from-bottom-6 duration-1000">
              Regulatory changes <br /> 
              <span className="text-white/40 italic">shouldn’t be a surprise.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/60 max-w-3xl mx-auto leading-relaxed">
              Precision multi-agent architecture to detect, interpret, and map global circulars to your internal policy manuals in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-in fade-in duration-1000 delay-300">
            <Link 
              href="/simulate"
              className="w-full sm:w-auto h-16 px-12 bg-white text-black text-[15px] font-black rounded-2xl hover:bg-neutral-200 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 group shadow-[0_0_60px_rgba(255,255,255,0.1)]"
            >
              <span>Start Interactive Check</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <button 
              onClick={handleLaunchAutonomous}
              className="w-full sm:w-auto h-16 px-12 bg-white text-black text-[15px] font-black rounded-2xl hover:bg-neutral-200 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 group shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <Zap className="w-5 h-5 fill-black text-black" />
              <span>Try Now</span>
            </button>
          </div>

          <div className="pt-4 opacity-40">
            <button 
              onClick={() => {
                const profile = localStorage.getItem("userProfile");
                window.dispatchEvent(new CustomEvent("editProfile", { detail: profile ? JSON.parse(profile) : null }));
              }}
              className="text-[13px] font-bold text-white uppercase tracking-widest hover:text-white hover:opacity-100 transition-all underline underline-offset-8"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* 3. The Problem */}
      <section className="py-40 px-8 relative border-t border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto space-y-24">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-5xl font-black tracking-tight text-white leading-tight">The compliance bottleneck.</h2>
            <p className="text-white/40 text-xl font-medium leading-relaxed">
              Traditional regulatory tracking relies on manual review of hundreds of circulars. 
              As enforcement speeds increase, manual mapping creates invisible drift.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: AlertTriangle, 
                title: "Undetected Circulars", 
                desc: "High-frequency updates from nodes like RBI or SEBI are missed, leading to critical policy-reality gaps." 
              },
              { 
                icon: Scale, 
                title: "Heavy Penalties", 
                desc: "Average enforcement fines have scaled 300% since 2023. Delay is now a direct financial risk." 
              },
              { 
                icon: FileSearch, 
                title: "Manual Mapping", 
                desc: "Re-indexing 2,000-line manuals against new 50-page circulars takes weeks of expensive legal effort." 
              }
            ].map((p, i) => (
              <div key={i} className="linear-card p-12 space-y-8 hover:border-white/30 transition-all group bg-neutral-900/40">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-white/50 transition-all">
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-4">
                   <h3 className="text-xl font-bold text-white tracking-tight">{p.title}</h3>
                   <p className="text-[15px] font-medium text-white/50 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Solution (The Radar) */}
      <section className="py-40 px-8 bg-black border-y border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-16">
            <div className="space-y-8">
              <div className="inline-flex px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase">The Protocol</div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tightest leading-tight text-white">
                Radar, interpret, <br/>evolve.
              </h2>
              <p className="text-white/50 text-xl font-medium leading-relaxed max-w-xl">
                Our autonomous swarm transforms static regulations into actionable evolution cycles. 
                From detection to implementation tasks, zero-touch.
              </p>
            </div>
            
            <div className="space-y-10">
              {[
                { title: "Autonomous Detection", desc: "Agents monitor global API nodes index for semantic text changes." },
                { title: "Neural Impact Mapping", desc: "Cross-references new clauses against internal manuals using RAG nodes." },
                { title: "Corrective Drafting", desc: "Generates high-fidelity policy amendments for stakeholder review." },
                { title: "Approval Governance", desc: "Mandatory rejection logic and business impact scoring included." }
              ].map((s, i) => (
                <div key={i} className="flex items-start space-x-8 group">
                  <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[11px] font-bold text-white group-hover:bg-white group-hover:text-black transition-all shrink-0">
                    {i + 1}
                  </div>
                  <div className="space-y-2 pt-1">
                    <h4 className="font-bold text-lg text-white/90 tracking-tight">{s.title}</h4>
                    <p className="text-[15px] text-white/40 font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="linear-card aspect-square border-white/[0.1] bg-white/[0.01] overflow-hidden group shadow-2xl">
               <div className="absolute inset-0 linear-grid opacity-10" />
               <div className="p-16 space-y-10 relative z-10 font-mono">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-2">
                     <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                     </div>
                     <span className="text-[10px] font-bold text-white/30 tracking-[0.4em]">NODE_CLUSTER_77a</span>
                  </div>
                  <div className="space-y-6 text-[13px] leading-relaxed">
                    <p className="text-white/80"># Scanning RBI Circulars... [OK]</p>
                    <p className="text-white/40">{'>'} [14:41] New semantic drift detected: G-22-EX</p>
                    <p className="text-white/40">{'>'} [14:42] Indexing manual: internal_manual_v9.pdf</p>
                    <p className="text-white animate-pulse">{'>'} [14:44] CONFLICT: Sec 9.2 inconsistent with Clause 4</p>
                    <p className="text-white">{'>'} [14:45] Drafting amendment... [COMPLETE]</p>
                    <p className="text-white/40">{'>'} [14:46] 4 tasks routed to: Legal, IT, Finance</p>
                  </div>
               </div>
            </div>
            {/* Ambient Shadow/Glow */}
            <div className="absolute -inset-10 bg-white/[0.03] rounded-full blur-[80px] pointer-events-none -z-10" />
          </div>
        </div>
      </section>

      {/* 5. Key Features */}
      <section className="py-40 px-8">
        <div className="max-w-[1400px] mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-black tracking-tight text-white leading-tight">Built for velocity.</h2>
            <p className="text-white/40 text-xl font-medium max-w-2xl mx-auto">
              Compliance infrastructure that feels as fast as your software deployment pipeline.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "Exact Change Detection", desc: "No more guessing what changed. View side-by-side semantic diffs instantly." },
              { icon: TrendingUp, title: "Policy Evolution Engine", desc: "Track your compliance score over time with our visible stability delta." },
              { icon: Vote, title: "Rejection Logic", desc: "Mandatory reasons for rejections ensure high-quality internal voting loops." },
              { icon: Workflow, title: "Smart Task Breakdown", desc: "Auto-sort implementations into Legal, IT, Finance, HR, and Product workstreams." },
              { icon: BarChart3, title: "Penalty Estimator", desc: "Prioritize issues based on predicted fine levels from past precedents." },
              { icon: Presentation, title: "Informational Dashboard", desc: "Summaries for board review and deep technical drills for implementation teams." }
            ].map((f, i) => (
              <div key={i} className="linear-card p-12 space-y-8 hover:border-white/20 transition-all group border-white/[0.08]">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-white transition-all">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-4">
                   <h3 className="text-xl font-bold text-white tracking-tight">{f.title}</h3>
                   <p className="text-[15px] font-medium text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Live Demo Window (IDE Style) */}
      <section className="py-40 px-8 border-t border-white/[0.05] bg-gradient-to-b from-neutral-900/0 to-neutral-900/40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto space-y-24 flex flex-col items-center">
           <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-6xl font-black tracking-tightest leading-tight">See the cycle in action.</h2>
              <p className="text-white/40 text-xl font-medium max-w-2xl mx-auto">
                Explore a live simulation of a regulatory evolution cycle — from scan to score jump.
              </p>
           </div>
           
           <DemoPlayer />
        </div>
      </section>

      {/* 7. How It Works (Steps) */}
      <section className="py-40 px-8 mb-24">
        <div className="max-w-[1400px] mx-auto space-y-32">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-black tracking-tight text-white leading-tight">The Mapping Protocol</h2>
            <p className="text-white/40 text-xl font-medium">How regulations are systematically transformed into approved policies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-px bg-white/[0.08] -z-10" />
            
            {[
              { icon: Search, title: "Ingest", desc: "Automated scan of PDF/Docx/HTML" },
              { icon: FileSearch, title: "Detect", desc: "Semantic change identification" },
              { icon: Layers, title: "Map & Amend", desc: "Neural mapping to internal policies" },
              { icon: Vote, title: "Review & Vote", desc: "Stakeholder approval loop" },
              { icon: CheckCircle2, title: "Evolve", desc: "Permanent policy update & prioritized tasks" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-8 group">
                <div className="w-24 h-24 rounded-[2rem] bg-neutral-900 border border-white/[0.1] flex items-center justify-center group-hover:border-white transition-all shadow-2xl">
                  <step.icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="space-y-3">
                  <h4 className="font-black uppercase tracking-[0.2em] text-[12px] text-white leading-none whitespace-nowrap">{step.title}</h4>
                  <p className="text-[14px] text-white/40 font-medium leading-relaxed px-4">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-24 px-8 border-t border-white/[0.05] bg-black/40">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 opacity-40 hover:opacity-100 transition-all">
           <div className="flex flex-col md:flex-row items-center gap-6">
              <span className="text-[15px] font-black tracking-tight uppercase text-white">Compliance OS</span>
              <div className="h-4 w-px bg-white/20 hidden md:block" />
              <span className="text-[13px] font-medium text-white italic tracking-wide">
                Built for the Regulatory Evolution Hackathon 2026.
              </span>
           </div>
           
           <div className="flex items-center space-x-10 text-[13px] font-bold text-white uppercase tracking-widest">
              <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <span className="text-white/20 tracking-normal">© 2026</span>
           </div>
        </div>
      </footer>
      
      {/* SunHacks Footer */}
      <footer className="py-20 border-t border-white/5 flex flex-col items-center justify-center space-y-6">
         <div className="flex items-center gap-4 text-white/20">
            <div className="h-[1px] w-12 bg-white/10" />
            <span className="text-[12px] font-black uppercase tracking-[0.4em]">SunHacks 2K26</span>
            <div className="h-[1px] w-12 bg-white/10" />
         </div>
         <p className="text-[14px] font-bold text-white/40 tracking-tightest uppercase">
            Built for Problem Statement #4 · <span className="text-emerald-500">Winner Selection Portfolio</span>
         </p>
         <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-2">
               <Shield className="w-4 h-4 text-white/20" />
               <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Autonomous Sentinel</span>
            </div>
            <div className="flex items-center gap-2">
               <Radio className="w-4 h-4 text-white/20" />
               <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Zero-Touch Governance</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
