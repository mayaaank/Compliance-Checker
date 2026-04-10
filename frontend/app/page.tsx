"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Shield, Cpu, Activity, Search, FileCheck, Layers, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ExperienceHero } from "@/components/ui/experience-hero";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.2
      });
      
      gsap.from(".reveal-section", {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".reveal-section",
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background min-h-screen overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <ExperienceHero />
        
        <div className="relative z-10 max-w-[900px] w-full text-center space-y-10 pt-20">
          <div className="reveal-text inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em]">
             <span>Sync Protocol v2.4</span>
             <ChevronRight className="w-3 h-3" />
          </div>

          <h1 className="reveal-text text-[clamp(2.5rem,8vw,6rem)] font-bold tracking-tightest leading-[1.05] text-gradient-white">
            Regulatory changes <br className="hidden md:block" /> shouldn’t surprise you.
          </h1>
          
          <p className="reveal-text max-w-2xl mx-auto text-text-secondary text-lg md:text-xl font-medium leading-relaxed">
            Real-time RBI/SEBI/MCA circular detection. Instant impact mapping to your policies. Auto-drafted amendments. Measurable compliance evolution.
          </p>

          <div className="reveal-text flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/simulate" className="linear-button-primary h-12 px-10">
              Run Compliance Check
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/dashboard" className="linear-button-secondary h-12 px-10">
              View Sample Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT */}
      <section className="py-32 px-10 border-t border-white/[0.05] relative bg-[#020202]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
              The high cost of <br className="hidden md:block" /> missing a single circular.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-md">
              Regulatory bodies issue 100+ circulars annually. Companies miss crucial updates, leading to heavy penalties, customer misleading, and outdated internal governance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="linear-card p-6 space-y-4">
              <span className="text-2xl font-bold text-white">₹1.9Cr+</span>
              <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Avg. Weekly Fines</p>
            </div>
            <div className="linear-card p-6 space-y-4">
              <span className="text-2xl font-bold text-white">&lt;0.1%</span>
              <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Policy Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION PIPELINE */}
      <section className="py-40 px-10 relative linear-grid">
        <div className="max-w-[1200px] mx-auto space-y-24">
          <div className="text-center space-y-6">
            <span className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.4em]">Integrated Intelligence</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tightest text-white">Built for CCOs and Founders.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Scrape", desc: "Autonomous harvesting of digital circulars from RBI/SEBI/MCA nodes.", icon: Cpu },
              { title: "Diff", desc: "Identifying logical drift between new regulations and existing rules.", icon: Activity },
              { title: "RAG Map", desc: "Contextual mapping of regulatory mandates to internal policy blocks.", icon: Search },
              { title: "Amend", desc: "AI-assisted drafting of legally sound policy amendments.", icon: FileCheck },
              { title: "Report", desc: "High-fidelity executive impact assessments ready for the board.", icon: Layers },
              { title: "Evolve", desc: "Continuous policy engine that improves scores with every run.", icon: Activity },
            ].map((step, i) => (
              <div key={i} className="linear-card p-10 space-y-6 linear-card-hover group">
                <div className="w-12 h-12 bg-white/[0.04] border border-white/[0.08] rounded-xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">{step.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT'S BETTER */}
      <section className="py-32 px-10 bg-[#050505] border-y border-white/[0.05]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center space-y-16">
          <h3 className="text-3xl font-bold text-white">Measurable performance leap.</h3>
          <div className="grid md:grid-cols-3 gap-12 w-full">
            <div className="space-y-2">
              <div className="text-5xl font-black text-white">&lt;45s</div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Assessment completion</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-white">99%</div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Scraping Accuracy</p>
            </div>
            <div className="space-y-2">
               <div className="flex items-center justify-center space-x-4">
                  <span className="text-3xl font-bold text-text-muted line-through">61/100</span>
                  <ArrowRight className="w-6 h-6 text-primary-500" />
                  <span className="text-5xl font-black text-white">84/100</span>
               </div>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Policy Evolution Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIVE DEMO TERMINAL */}
      <section className="py-40 px-10 relative">
        <div className="max-w-[1000px] mx-auto space-y-20">
          <div className="linear-card bg-black p-1 space-y-0 overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.02)]">
            <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
               <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-text-muted" />
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Live Trace // ComplianceSwarm-4</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-risk-low rounded-full animate-pulse" />
                  <span className="text-[9px] font-bold text-risk-low uppercase tracking-widest">Ready</span>
               </div>
            </div>
            <div className="p-12 h-[400px] font-mono text-sm space-y-4 overflow-hidden relative">
              <div className="text-white/20 uppercase tracking-[0.2em] mb-8 text-[11px] font-bold border-b border-white/5 pb-4 flex items-center justify-between">
                 <span>Scanning SEBI Nodes...</span>
                 <span className="animate-pulse">_</span>
              </div>
              <div className="space-y-3">
                 <p className="text-primary-500">[SYSTEM] Sync established with RBI circular-matrix-0x2</p>
                 <p className="text-white/70">[ReguHarvester] Scraping SEBI/HO/CFD/PoD-1/P/CIR/2024/012...</p>
                 <p className="text-white/70">[SemanticMapper] Mapping circular constraints to internal_policy.pdf...</p>
                 <p className="text-risk-high animate-pulse">[DeltaAnalyzer] Conflict detected: Section 12.4 Breach.</p>
                 <p className="text-white/40 italic mt-8 text-xs font-medium">Compliance Checker is preparing your executive assessment...</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </div>
          <div className="text-center">
             <Link href="/simulate" className="linear-button-primary h-14 px-12 group">
                Launch Full Simulation
                <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
             </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-10 border-t border-white/[0.05] bg-[#020202]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-white" />
            <span className="font-black text-white uppercase tracking-tighter text-xl">Compliance Checker</span>
          </div>
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">
             © 2026 Regulatory Intelligence Agent // Built for High Fidelity Teams
          </div>
        </div>
      </footer>
    </div>
  );
}
