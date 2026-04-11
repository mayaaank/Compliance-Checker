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

import PriorityScoring from "@/components/PriorityScoring";
import AIInsights from "@/components/AIInsights";
import TaskBreakdown from "@/components/TaskBreakdown";

export default function DashboardPage() {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCEOModalOpen, setIsCEOModalOpen] = useState(false);
  const [userName, setUserName] = useState("Compliance Officer");

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserName(JSON.parse(profile).fullName);
    }

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/[0.1] pb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-[13px] font-bold text-white uppercase tracking-[0.5em]">
              <Activity className="w-4 h-4" />
              <span>Identity: {userName} · Source: {report.circular_source}</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tightest text-white">Compliance Overview</h1>
            <p className="text-white text-lg font-medium max-w-2xl leading-relaxed">
              {report.summary}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/simulate" className="linear-button-secondary h-12 px-8">
              <Plus className="w-5 h-5 mr-2" /> New Simulation
            </Link>
            <button
              onClick={() => setIsCEOModalOpen(true)}
              className="h-12 px-8 bg-risk-high/10 text-risk-high border border-risk-high/20 rounded-xl text-[14px] font-bold hover:bg-risk-high hover:text-white transition-all uppercase tracking-widest"
            >
              Raise CEO Alert
            </button>
            <Link href="/impact-report" className="linear-button-primary h-12 px-8">
              <Download className="w-5 h-5 mr-2" /> Export Report
            </Link>
          </div>
        </div>

        {/* Priority & Penalty Section */}
        <PriorityScoring 
           changes={changes} 
           totalExpectedFine={report.fine_risk?.estimated_amount_lakh || 0} 
        />

        {/* Metrics — derived from real data */}
        <div className="grid md:grid-cols-4 gap-6">
          <MetricCard title="Total Changes"     value={totalCount}      icon={ShieldAlert} color="error"   />
          <MetricCard title="High Risk"         value={highCount}       icon={BarChart3}   color="warning" />
          <MetricCard title="Amendments Ready"  value={amendedCount}    icon={Files}       color="primary" />
          <MetricCard title="Evolution Score"   value={report.evolution_score} icon={Activity} color="success" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">

            {/* AI Insights - Full Width for this column */}
            <AIInsights summary={report.summary} />

            {/* Semantic Delta — first change comparison */}
            {primaryChange && (
              <div className="linear-card p-12 space-y-10 overflow-hidden relative border-neutral-800">
                <div className="flex items-center justify-between border-b border-white/[0.1] pb-8">
                  <div className="flex items-center space-x-4">
                    <Terminal className="w-5 h-5 text-white" />
                    <h3 className="text-[13px] font-bold text-white uppercase tracking-[0.4em]">Semantic Delta Analyzer</h3>
                  </div>
                  <span className="text-[12px] font-bold text-white uppercase tracking-widest">
                    {primaryChange.affected_section}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <label className="text-[13px] font-bold text-white uppercase tracking-[0.4em]">Previous Circular</label>
                    <div className="p-8 bg-black/40 rounded-2xl border border-white/[0.1] text-[15px] text-white leading-relaxed font-medium">
                      {primaryChange.old_text || "—"}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <label className="text-[13px] font-bold text-white uppercase tracking-[0.4em]">New Regulation</label>
                    <div className="p-8 bg-white/[0.04] rounded-2xl border border-white/[0.2] text-[15px] text-white font-medium leading-relaxed">
                      {primaryChange.new_text}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Amendments */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4 px-2">
                <Search className="w-5 h-5 text-white" />
                <span className="text-[13px] font-bold text-white uppercase tracking-[0.4em]">Automated Corrective Logic</span>
              </div>
              <DiffViewer amendments={amendments} />
            </div>

            {/* Task Breakdown */}
            <TaskBreakdown />
          </div>

          <div className="space-y-12">
            {/* Fine Risk */}
            <div className="space-y-8">
              <span className="text-[13px] font-bold text-white uppercase tracking-[0.4em] px-2">Predictive Enforcement</span>
              <FineSimulator
                probability={report.fine_risk?.probability_percent || 0}
                referenceCases={referenceCases}
              />
            </div>

            {/* Risk Cards */}
            <div className="space-y-8">
              <span className="text-[13px] font-bold text-white uppercase tracking-[0.4em] px-2">Compliance Hotspots</span>
              <div className="grid gap-4">
                {riskCards.map(risk => (
                  <RiskCard key={risk.id} {...risk} />
                ))}
              </div>
              <Link href="/simulate" className="w-full linear-button-secondary h-12 flex items-center justify-between group px-8">
                <span className="uppercase tracking-widest font-bold text-[12px]">Initiate Remediation Cycle</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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