import Link from "next/link";
import { Shield, Github, Twitter, Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-black/20 mt-20">
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <Shield className="w-5 h-5 text-white fill-white/10 group-hover:fill-white/30 transition-all" />
              <span className="text-[14px] font-bold tracking-tight text-white uppercase">
                Compliance Checker
              </span>
            </Link>
            <p className="text-sm font-medium text-text-secondary max-w-sm leading-relaxed">
              Autonomous multi-agent architecture designed for real-time regulatory detection and policy evolution. 
              Built for the next generation of financial governance.
            </p>
            <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-bold text-success uppercase tracking-widest">
                  <div className="w-1 h-1 bg-success rounded-full animate-pulse" />
                  <span>Systems Nominal</span>
               </div>
               <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">v2.5.0-Release</span>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/simulate" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Simulation Engine</Link></li>
              <li><Link href="/dashboard" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Risk Dashboard</Link></li>
              <li><Link href="/evolution-history" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Evolution Ledger</Link></li>
              <li><Link href="/live-agents" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Agent Swarm</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Connect</h4>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/[0.06] transition-all">
                <Activity className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-16 mt-16 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">
             © 2026 Compliance Intel Swarm. All rights reserved.
           </p>
           <div className="flex items-center space-x-8">
              <Link href="#" className="text-[11px] font-bold text-text-muted hover:text-white transition-colors uppercase tracking-widest">Privacy Protocol</Link>
              <Link href="#" className="text-[11px] font-bold text-text-muted hover:text-white transition-colors uppercase tracking-widest">Terms of Access</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
