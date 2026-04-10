"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link href="/" className="flex items-center space-x-2 animate-fade-in group">
            <Shield className="w-5 h-5 text-white fill-white/10 group-hover:fill-white/30 transition-all" />
            <span className="text-[14px] font-bold tracking-tight text-white uppercase">
              Compliance Checker
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/simulate" className="text-[13px] font-medium text-text-secondary hover:text-white transition-colors">
              Simulate
            </Link>
            <Link href="/dashboard" className="text-[13px] font-medium text-text-secondary hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/evolution-history" className="text-[13px] font-medium text-text-secondary hover:text-white transition-colors">
              Historical Cycle
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/simulate" className="text-[13px] font-medium text-text-secondary hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/simulate" className="h-8 px-4 bg-white text-black text-[13px] font-bold rounded-lg hover:bg-[#e5e5e7] transition-all flex items-center justify-center">
            Run Scan
          </Link>
        </div>
      </div>
    </nav>
  );
}
