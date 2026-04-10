"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/impact-report", label: "Impact Report" },
  { href: "/evolution-history", label: "Evolution History" },
  { href: "/rejected-reasons", label: "Rejected Reasons" },
  { href: "/informational-dashboard", label: "Informational Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/[0.08] bg-neutral-950/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12 flex-nowrap shrink-0">
          <Link href="/" className="flex items-center space-x-3 animate-fade-in group shrink-0">
            <div className="relative">
               <Shield className="w-6 h-6 text-white fill-white/10 group-hover:fill-white/30 transition-all" />
               <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            <div className="flex flex-col">
               <span className="text-[14px] font-black tracking-tightest text-white uppercase whitespace-nowrap leading-none">
                 Compliance OS
               </span>
               <div className="flex items-center gap-1.5 mt-1">
                  <Radio className="w-2.5 h-2.5 text-white/40" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Compliance Radar Active</span>
               </div>
            </div>
          </Link>
          
          <div className="hidden xl:flex items-center space-x-10 flex-nowrap shrink-0">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link 
                  key={href}
                  href={href} 
                  className={cn(
                    "text-[14px] font-black tracking-tight transition-all whitespace-nowrap relative py-2",
                    isActive ? "text-white" : "text-white/40 hover:text-white"
                  )}
                >
                  {label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full animate-in slide-in-from-bottom-1 duration-300" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-6 flex-nowrap shrink-0">
          <button 
            onClick={() => {
              const profile = localStorage.getItem("userProfile");
              window.dispatchEvent(new CustomEvent("editProfile", { detail: profile ? JSON.parse(profile) : null }));
            }}
            className="text-[12px] font-black text-white/40 hover:text-white transition-all uppercase tracking-widest whitespace-nowrap"
          >
            Sign Up
          </button>
          <Link 
            href="/simulate" 
            className="h-10 px-8 bg-white text-black text-[12px] font-black rounded-xl hover:bg-neutral-200 hover:scale-[1.02] transition-all flex items-center justify-center uppercase tracking-widest whitespace-nowrap shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Try Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
