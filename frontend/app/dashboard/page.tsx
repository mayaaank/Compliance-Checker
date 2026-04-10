"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3, ShieldAlert, Files, Activity,
  Plus, Download, Terminal, Search, ArrowRight
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
  const [error, setError] = useState<string | null>(null);
  const [isCEOModalOpen, setIsCEOModalOpen] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await getLatestReport();
        setReport(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load report");
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
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="pt-24 px-8 max-w-[1400px] mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <ShieldAlert className="w-12 h-12 text-white/20" />
        <p className="text-text-secondary text-base font-medium">
          {error || "No report available yet."}
        </p>
        <Link href="/simulate" className="linear-button-primary h-11">
          Run Compliance Check
        </Link>
      </div>
    );
  }

  // Derive summary counts from real changes array - ensure changes exists
  const changes = report.changes || [];
  const highCount   = changes.filter(c => c.risk === "high").length;
  const mediumCount = changes.filter(c => c.risk === "medium").length;
  const lowCount    = changes.filter(c => c.risk === "low").length;
  const totalCount  = changes.length;
  const amendedCount = changes.filter(c => c.amendment).length;

  // Use first change for the comparison panel
  const primaryChange = changes[0];

  // Map changes to RiskCard shape
  const riskCards = changes.map(c => ({
    id: c.change_id,
    title: c.affected_section || c.section_hint,
    description: c.new_text.slice(0, 140) + (c.new_text.length > 140 ? "…" : ""),
    level: c.risk,
  }));

  // Map reference cases to FineSimulator shape
  const referenceCases = (report.fine_risk?.reference_cases || []).map((rc, i) => ({
    id: `rc${i}`,
    case: rc.bank,
    fine: `₹${rc.amount_lakh}L`,
  }));

  // Map changes to DiffViewer amendments shape
  const amendments = changes
    .filter(c => c.amendment)
    .map(c => ({
      id: c.change_id,
      title: c.affected_section,
      diff: `- ${c.old_text.slice(0, 200)}\n+ ${c.amendment.slice(0, 200)}`,
    }));

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen animate-fade-in">
      <div className="max-w-[1400px] mx-auto space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/[0.08] pb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">
              <Activity className="w-3.5 h-3.5" />
              <span>Source: {report.circular_source} · Run {report.run_id}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tightest text-white">Compliance Overview</h1>
            <p className="text-text-secondary text-base font-medium max-w-xl">
              {report.summary}
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

        {/* Metrics — derived from real data */}
        <div className="grid md:grid-cols-4 gap-6">
          <MetricCard title="Total Changes"     value={totalCount}      icon={ShieldAlert} color="error"   />
          <MetricCard title="High Risk"         value={highCount}       icon={BarChart3}   color="warning" />
          <MetricCard title="Amendments Ready"  value={amendedCount}    icon={Files}       color="primary" />
          <MetricCard title="Evolution Score"   value={report.evolution_score} icon={Activity} color="success" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Semantic Delta — first change comparison */}
            {primaryChange && (
              <div className="linear-card p-10 space-y-8 overflow-hidden relative">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                  <div className="flex items-center space-x-4">
                    <Terminal className="w-4 h-4 text-text-muted" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Semantic Delta Analyzer</h3>
                  </div>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    {primaryChange.affected_section}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Previous Circular</label>
                    <div className="p-6 bg-black/40 rounded-2xl border border-white/[0.05] text-[14px] text-text-secondary leading-relaxed font-medium">
                      {primaryChange.old_text || "—"}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">New Regulation</label>
                    <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/[0.1] text-[14px] text-white font-medium leading-relaxed">
                      {primaryChange.new_text}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Amendments */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 px-2">
                <Search className="w-4 h-4 text-text-muted" />
                <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">Automated Corrective Logic</span>
              </div>
              <DiffViewer amendments={amendments} />
            </div>
          </div>

          <div className="space-y-10">
            {/* Fine Risk */}
            <div className="space-y-6">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em] px-2">Predictive Enforcement</span>
              <FineSimulator
                probability={report.fine_risk?.probability_percent || 0}
                referenceCases={referenceCases}
              />
            </div>

            {/* Risk Cards */}
            <div className="space-y-6">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em] px-2">Compliance Hotspots</span>
              <div className="grid gap-4">
                {riskCards.map(risk => (
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
        riskCount={highCount}
      />
    </div>
  );
}