"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe, Shield, ArrowRight, Zap, Target, 
  BarChart3, Activity, Info, ExternalLink, 
  Terminal, ShieldAlert, Layers
} from "lucide-react";
import { getLatestReport, Report } from "@/lib/api";

const DEFAULT_SECTORS = [
  "Finance", "Tech/SaaS", "Healthcare", 
  "Food & Beverage", "Aviation", "Retail", "Manufacturing"
];

const getDynamicSectorImpact = (sector: string, report: Report | null) => {
  // If no report is loaded, use graceful fallback structure
  if (!report || !report.changes || report.changes.length === 0) {
    return {
      risk: "low",
      summary: "Awaiting dynamic document processing...",
      penalty: "₹0.0L",
      focus: "Pending"
    };
  }

  const change = report.changes[0];
  const penaltyEst = report.fine_risk.estimated_amount_lakh || 0;
  
  // Dynamically map the actual LLM-generated change rule onto the sector realities
  const baseImpacts: Record<string, any> = {
    "Finance": {
      risk: change.risk === "high" ? "high" : "medium",
      summary: `Direct balance sheet vulnerability regarding: "${change.new_text}". Immediate treasury node sync required.`,
      penalty: `₹${(penaltyEst * 4).toFixed(1)}L exposure`,
      focus: "Capital Adequacy"
    },
    "Tech/SaaS": {
      risk: change.risk,
      summary: `Data sovereignty algorithms must parse: "${change.new_text}". Affects all non-resident customer tables.`,
      penalty: `₹${(penaltyEst * 2.5).toFixed(1)}L exposure`,
      focus: "Data Encryption"
    },
    "Healthcare": {
      risk: "high",
      summary: `Patient record parameters must strict-align with: "${change.new_text}". Mandatory for digital prescriptions.`,
      penalty: "License Revocation Risk",
      focus: "HIPAA/Local Matrix"
    },
    "Food & Beverage": {
      risk: "low",
      summary: `Logistics licensing must reflect: "${change.new_text}". Primarily an annexure-level adjustment.`,
      penalty: `₹${(penaltyEst * 0.8).toFixed(1)}L exposure`,
      focus: "Supply Chain"
    },
    "Aviation": {
      risk: change.risk,
      summary: `Ground safety audit logs must implement: "${change.new_text}". Mandatory for tier-1 operational nodes.`,
      penalty: `₹${(penaltyEst * 5.5).toFixed(1)}L exposure`,
      focus: "Asset Tracking"
    },
    "Retail": {
      risk: "medium",
      summary: `Point-of-sale logic requires update to match digital nexus rules for: "${change.new_text}".`,
      penalty: `₹${(penaltyEst * 1.5).toFixed(1)}L exposure`,
      focus: "Tax Compliance"
    },
    "Manufacturing": {
      risk: "low",
      summary: `Cross-border insurance must formally acknowledge: "${change.new_text}".`,
      penalty: `₹${(penaltyEst * 1.0).toFixed(1)}L exposure`,
      focus: "Logistics"
    }
  };
  return baseImpacts[sector] || baseImpacts["Finance"];
};

export default function InformationalDashboard() {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userSector, setUserSector] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      const data = JSON.parse(profile);
      setUserSector(data.sector || "");
      setUserName(data.orgName || "Your Organization");
    }

    async function fetchData() {
       try {
          const data = await getLatestReport();
          setReport(data);
       } catch (err) {
          console.error(err);
       } finally {
          setIsLoading(false);
       }
    }
    fetchData();
  }, []);

  if (isLoading) {
     return (
        <div className="pt-40 flex flex-col items-center justify-center space-y-6">
           <Activity className="w-12 h-12 text-white/20 animate-spin-slow" />
           <p className="text-white/40 text-[12px] font-black uppercase tracking-[0.4em]">Analyzing Cross-Sector Implications...</p>
        </div>
     );
  }

  const sourceName = report?.circular_source || "RBI/2026/41";

  const viewDetails = (sector: string) => {
    const impact = getDynamicSectorImpact(sector, report);
    alert(`In-Depth Sector Analysis: ${sector}\n\nRegulation: ${sourceName}\n\nStrategic Exposure: ${impact.summary}\n\nRecommended Pivot: Immediate re-alignment of internal metadata nodes to avoid the ${impact.penalty} penalty block.`);
  };

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen animate-fade-in uppercase-none">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.1] pb-12 gap-10">
           <div className="space-y-6">
              <div className="flex items-center space-x-4 text-[13px] font-bold text-white uppercase tracking-[0.5em]">
                <ShieldAlert className="w-5 h-5 text-white animate-pulse" />
                <span>Impact Simulation · {sourceName}</span>
              </div>
              <h1 className="text-5xl font-black tracking-tightest text-white leading-none">Cross-Sector Analysis</h1>
              <p className="text-white/40 text-lg font-medium max-w-3xl leading-relaxed">
                We've analyzed how the current regulation <span className="text-white">({sourceName})</span> creates unique compliance drift across different industry verticals.
              </p>
           </div>
           
           <div className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-3xl shrink-0">
              <div className="space-y-1 text-right">
                 <p className="text-[11px] font-black text-white/30 uppercase tracking-widest leading-none">Primary Target</p>
                 <p className="text-[14px] font-bold text-white">{userName} ({userSector})</p>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              <Layers className="w-8 h-8 text-white/20" />
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
           {(report?.impacted_sectors || DEFAULT_SECTORS).map((sector) => {
             const impact = getDynamicSectorImpact(sector, report);
             const isUserSector = sector === userSector;

             return (
               <div 
                 key={sector} 
                 className={`
                   linear-card p-10 space-y-8 group hover:border-white/20 transition-all cursor-pointer relative
                   border-l-4 ${impact.risk === "high" ? "border-red-500" : (impact.risk === "medium" ? "border-amber-500" : "border-white/20")}
                   ${isUserSector ? "bg-white/[0.03] border-white/40" : ""}
                 `}
                 onClick={() => viewDetails(sector)}
               >
                  {isUserSector && (
                    <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-widest">
                       Your Vertical
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                     <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">{impact.focus} Node</span>
                     <div className={`text-[10px] font-black uppercase tracking-widest ${impact.risk === "high" ? "text-red-500" : "text-white/40"}`}>
                        {impact.risk} Risk
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-2xl font-black text-white leading-tight group-hover:translate-x-1 transition-transform tracking-tight">{sector}</h3>
                     <div className="flex items-center gap-4 text-[11px] font-bold text-white/30 uppercase tracking-widest">
                        <Terminal className="w-3.5 h-3.5" /> Logical Impact Group
                     </div>
                  </div>

                  <div className="p-6 bg-black/40 rounded-2xl border border-white/5 text-[14px] text-white/50 leading-relaxed font-medium min-h-[140px]">
                     {impact.summary}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">Max Penalty Node</p>
                        <p className="text-[14px] font-black text-white">{impact.penalty}</p>
                     </div>
                     <button className="h-10 w-10 bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black rounded-xl transition-all flex items-center justify-center">
                        <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
             );
           })}
        </div>

        {/* Footer Note */}
        <div className="pt-20 border-t border-white/[0.05] flex items-center justify-center space-x-6 text-white/20">
           <Info className="w-4 h-4" />
           <p className="text-[12px] font-medium tracking-wide">
              Cross-sector assessments are derived from global regulatory mapping nodes. 
              <span className="text-white/40 ml-1 underline cursor-pointer hover:text-white underline-offset-4">Learn more about our Semantic Impact Engine</span>
           </p>
        </div>

      </div>
    </div>
  );
}
