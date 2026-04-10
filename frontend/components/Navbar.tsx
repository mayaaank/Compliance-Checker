"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/simulate", label: "Simulate" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/evolution-history", label: "Historical Cycle" },
];

export default function Navbar() {
  const pathname = usePathname();

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
            {NAV_LINKS.map(({ href, label }) => (
              <Link 
                key={href}
                href={href} 
                className={cn(
                  "text-[13px] font-medium transition-colors",
                  pathname === href ? "text-white" : "text-text-secondary hover:text-white"
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={async () => {
              try {
                const { resetDemo } = await import("@/lib/api");
                await resetDemo();
                window.location.href = "/simulate"; // Force full reload to verify empty state
              } catch (err) {
                console.error("Reset failed", err);
              }
            }}
            className="text-[10px] uppercase tracking-widest font-bold text-risk-high hover:text-white transition-colors"
          >
            Reset Demo
          </button>
          <Link href="/simulate" className="h-8 px-4 bg-white text-black text-[13px] font-bold rounded-lg hover:bg-[#e5e5e7] transition-all flex items-center justify-center">
            Run Scan
          </Link>
        </div>
      </div>
    </nav>
  );
}
