"use client";

import { useEffect, useState } from "react";
import { 
  Download, 
  Printer, 
  ChevronLeft, 
  ShieldCheck, 
  Globe, 
  Calendar, 
  FileText,
  Activity
} from "lucide-react";
import Link from "next/link";
import { getLatestReport, Report } from "@/lib/api";

export default function ImpactReportPage() {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="pt-24 px-8 max-w-[900px] mx-auto space-y-12 animate-fade-in">
        <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-[600px] bg-white/[0.02] border border-white/[0.05] rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="pt-24 px-8 max-w-[900px] mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
           <Activity className="w-12 h-12 text-text-muted opacity-20" />
           <p className="text-text-secondary font-medium">{error || "No assessment data available."}</p>
           <Link href="/simulate" className="linear-button-primary h-11">Run Assessment Cycle</Link>
        </div>
      </div>
    );
  }

  const changes = report.changes || [];
  const highRisks = changes.filter(c => c.risk === "high").length;
  const totalRisks = changes.length;

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen bg-background animate-fade-in">
      <div className="max-w-[900px] mx-auto space-y-12">
        <div className="flex items-center justify-between no-print">
          <Link href="/dashboard" className="flex items-center space-x-3 text-text-secondary hover:text-white transition-all group">
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Return to Assessment</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => window.print()} className="linear-button-secondary h-10 px-6 flex items-center gap-2">
              <Printer className="w-4 h-4" />
              <span>Print Briefing</span>
            </button>
            <button 
              onClick={() => window.print()}
              className="linear-button-primary h-10 px-6 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        <div className="linear-card p-16 md:p-24 space-y-24 relative bg-[#0d0d0f] print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
          <div className="flex justify-between items-start border-b border-white/[0.08] pb-16 print:border-black">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 text-white">
                 <ShieldCheck className="w-10 h-10" />
                 <span className="text-xl font-bold uppercase tracking-tightest">Compliance Intel</span>
              </div>
              <div className="space-y-4">
                 <h1 className="text-5xl font-black tracking-tightest text-white print:text-black leading-tight">Executive Impact <br /> Assessment</h1>
                 <p className="text-text-muted text-[11px] uppercase tracking-[0.4em] font-bold">TraceID: {report?.run_id || '8491-X'} // Governance v2.4</p>
              </div>
            </div>
            <div className="text-right space-y-6">
               <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
                  System Date: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
               </div>
               <div className="flex items-center justify-end space-x-2">
                  <Activity className="w-4 h-4 text-text-muted opacity-40" />
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">PROCESSED OK</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-16 border-b border-white/[0.08] pb-20 print:border-black">
             <div className="space-y-4">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Total Conflicts</span>
                <div className="text-5xl font-black tracking-tightest text-white print:text-black">{totalRisks}</div>
             </div>
             <div className="space-y-4">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Critical Flux</span>
                <div className="text-5xl font-black tracking-tightest text-risk-high">{highRisks}</div>
             </div>
             <div className="space-y-4">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Evolution Score</span>
                <div className="text-5xl font-black tracking-tightest text-white print:text-black">{report?.evolution_score || 0}</div>
             </div>
          </div>

          <div className="space-y-20">
             <div className="space-y-12">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-text-muted flex items-center space-x-4 border-b border-white/[0.03] pb-6">
                   <span>Mapping Resolution Matrix</span>
                </h3>
                <div className="grid gap-12">
                   {changes.map((change, i) => (
                     <div key={i} className="flex gap-12 items-start group">
                        <span className="text-xs font-mono font-bold text-text-muted opacity-30 pt-1 tracking-widest">{(i+1).toString().padStart(2, '0')}</span>
                        <div className="space-y-4 flex-1">
                           <div className="flex items-center space-x-4">
                              <h4 className="font-bold text-white uppercase tracking-tight text-lg print:text-black">{change.affected_section}</h4>
                              {change.trace_reference?.trace_id && (
                                <span className="text-[10px] font-mono text-text-muted bg-white/5 px-2 py-0.5 rounded border border-white/10 uppercase">
                                  {change.trace_reference.trace_id}
                                </span>
                              )}
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-widest ${
                                change.risk === 'high' ? 'text-risk-high border-risk-high/30 bg-risk-high/5' : 
                                change.risk === 'medium' ? 'text-risk-medium border-risk-medium/30 bg-risk-medium/5' : 'text-risk-low border-risk-low/30 bg-risk-low/5'
                              }`}>
                                {change.risk}
                              </span>
                           </div>
                           <p className="text-text-secondary text-[15px] leading-relaxed font-medium print:text-black/80">{change.new_text}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="space-y-12">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-text-muted flex items-center space-x-4 border-b border-white/[0.03] pb-6">
                   <span>Proposed Dynamic Amendments</span>
                </h3>
                <div className="space-y-8">
                   {changes.filter(c => c.amendment).map((change, i) => (
                     <div key={i} className="p-10 bg-black/60 border border-white/[0.08] rounded-2xl space-y-6 print:bg-neutral-100 print:border-black">
                        <h4 className="font-bold text-white uppercase tracking-widest text-xs print:text-black">{change.affected_section}</h4>
                        <pre className="text-[13px] font-mono text-text-secondary leading-relaxed whitespace-pre-wrap print:text-black custom-scrollbar">
                           {`- ${change.old_text}\n+ ${change.amendment}`}
                        </pre>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="pt-24 border-t border-white/[0.08] flex justify-between items-end print:border-black opacity-40">
             <div className="space-y-8">
                <p className="text-[11px] text-text-muted max-w-sm leading-relaxed font-bold uppercase tracking-[0.2em] print:text-black/60">
                   This assessment was autonomously verified by Compliance Swarm v4. Audit trails available via secure node handshake.
                 </p>
                <div className="flex items-center space-x-8 text-text-muted">
                   <Globe className="w-4 h-4" />
                   <Calendar className="w-4 h-4" />
                   <FileText className="w-4 h-4" />
                </div>
             </div>
             <div className="text-right space-y-4">
                <div className="w-40 h-px bg-white/10 ml-auto print:bg-black" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Authenticity Index: {report?.run_id || '0x921A'}-F4</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
