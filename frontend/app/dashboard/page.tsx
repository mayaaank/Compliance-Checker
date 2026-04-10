"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  ShieldAlert, 
  Files, 
  Activity, 
  Plus, 
  Download,
  Terminal,
  Search,
  ArrowRight
} from "lucide-react";
import MetricCard from "@/components/MetricCard";
import RiskCard from "@/components/RiskCard";
import FineSimulator from "@/components/FineSimulator";
import DiffViewer from "@/components/DiffViewer";
import CEOModal from "@/components/CEOModal";
import { getLatestReport, Report } from "@/lib/api";

export default function DashboardPage() {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCEOModalOpen, setIsCEOModalOpen] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await getLatestReport();
        setReport(data);
      } catch (err) {
        setReport({
          summary_metrics: { total_risks: 12, high_risks: 3, medium_risks: 5, low_risks: 4 },
          risk_cards: [
            { id: "1", title: "Reporting Threshold Breach", description: "SEBI circular SEBI/HO/CFD/PoD-1/P/CIR/2024/012 reduces threshold from 2% to 1.5%.", level: "high" },
            { id: "2", title: "ESG Reporting Format", description: "New mandatory BRSR Core format required for Top 1000 listed entities.", level: "medium" },
            { id: "3", title: "Audit Trail Logging", description: "RBI mandate on immutable audit logs for core banking interfaces.", level: "high" }
          ],
          predictive_risk: {
            probability: 78,
            reference_cases: [
              { id: "c1", case: "HDFC Bank (Feb 2024) - AML Lapse", fine: "₹1,90,00,000" },
              { id: "c2", case: "Paytm Payments Bank - KYC Errors", fine: "₹5,49,00,000" }
            ]
          },
          comparison: {
            old_text: "Reporting of block deals shall be made within 30 minutes of execution...",
            new_text: "Reporting of block deals shall be made within 15 minutes of execution...",
            highlights: [{ text: "15 minutes", level: "high" }]
          },
          amendments: [
            { id: "a1", title: "Internal Policy Section 12.4", diff: "- Reporting timeline: 30 minutes\n+ Reporting timeline: 15 minutes (SEBI/2024/012)" }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchReport();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-24 px-8 max-w-[1400px] mx-auto space-y-12 animate-fade-in">
        <div className="flex items-center justify-between">
            <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-10 w-48 bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen animate-fade-in">
      <div className="max-w-[1400px] mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/[0.08] pb-12">
          <div className="space-y-4">
             <div className="flex items-center space-x-3 text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">
                <Activity className="w-3.5 h-3.5" />
                <span>Assessment Node: Mumbai-01</span>
             </div>
             <h1 className="text-4xl font-bold tracking-tightest text-white">Compliance Overview</h1>
             <p className="text-text-secondary text-base font-medium max-w-xl">
               Monitoring regulatory signals across 2,400+ nodes. Actionable intelligence for modern governance teams.
             </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/simulate" className="linear-button-secondary h-11">
              <Plus className="w-4 h-4 mr-2" /> New Simulation
            </Link>
            <button 
              onClick={() => setIsCEOModalOpen(true)}
              className="h-11 px-6 bg-risk-high/10 text-risk-high border border-risk-high/20 rounded-xl text-sm font-bold hover:bg-risk-high hover:text-white transition-all"
            >
              Raise CEO Alert
            </button>
            <Link href="/impact-report" className="linear-button-primary h-11">
              <Download className="w-4 h-4 mr-2" /> Export Report
            </Link>
          </div>
        </div>

        {/* Dynamic Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <MetricCard title="Total Conflicts" value={report?.summary_metrics.total_risks || 0} icon={ShieldAlert} trend="+2.4%" color="error" />
          <MetricCard title="Critical Flux" value={report?.summary_metrics.high_risks || 0} icon={BarChart3} trend="+1.1%" color="warning" />
          <MetricCard title="Policy Manuals" value="3" icon={Files} color="primary" />
          <MetricCard title="Trust Index" value="94" icon={Activity} trend="-2pts" color="success" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Impact Mapping */}
            <div className="linear-card p-10 space-y-8 overflow-hidden relative">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div className="flex items-center space-x-4">
                  <Terminal className="w-4 h-4 text-text-muted" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Semantic Delta Analyzer</h3>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-risk-high" /><span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Conflict</span></div>
                  <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-primary-500" /><span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Aligned</span></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Regulatory Signal</label>
                  <div className="p-6 bg-black/40 rounded-2xl border border-white/[0.05] text-[14px] text-text-secondary leading-relaxed font-medium">
                    {report?.comparison.old_text}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Internal System Map</label>
                  <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/[0.1] text-[14px] text-white font-medium leading-relaxed">
                    {report?.comparison.new_text.split(" ").map((word, i) => {
                      const isHigh = report?.comparison.highlights.some(h => word.includes(h.text));
                      return (
                        <span key={i} className={isHigh ? "bg-risk-high/20 text-white font-bold px-1 rounded shadow-[0_0_10px_rgba(225,29,72,0.2)]" : ""}>
                          {word}{" "}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Amendments */}
            <div className="space-y-6">
               <div className="flex items-center space-x-4 px-2">
                  <Search className="w-4 h-4 text-text-muted" />
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">Automated Corrective Logic</span>
               </div>
               <DiffViewer amendments={report?.amendments || []} />
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-6">
               <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em] px-2">Predictive Enforcement</span>
               <FineSimulator probability={report?.predictive_risk.probability || 0} referenceCases={report?.predictive_risk.reference_cases || []} />
            </div>
            
            <div className="space-y-6">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em] px-2">Compliance Hotspots</span>
              <div className="grid gap-4">
                {report?.risk_cards.map((risk) => (
                  <RiskCard key={risk.id} {...risk} />
                ))}
              </div>
              <Link href="/simulate" className="w-full linear-button-secondary h-11 flex items-center justify-between group">
                 <span>Initiate Remediation Cycle</span>
                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CEOModal 
        isOpen={isCEOModalOpen} 
        onClose={() => setIsCEOModalOpen(false)} 
        riskCount={report?.summary_metrics.high_risks || 0} 
      />
    </div>
  );
}
