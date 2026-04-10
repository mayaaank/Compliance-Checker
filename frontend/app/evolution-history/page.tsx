"use client";

import { useEffect, useState } from "react";
import { 
  History, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight,
  Target,
  Clock,
  Activity,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { getEvolution, Evolution } from "@/lib/api";

export default function EvolutionHistoryPage() {
  const [evolution, setEvolution] = useState<Evolution>({ runs: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvolution() {
      try {
        const data = await getEvolution();
        setEvolution(data);
      } catch (err) {
        setEvolution({
          runs: [
            { date: "2024-01-15", score: 65, change: 0 },
            { date: "2024-02-10", score: 72, change: 7 },
            { date: "2024-03-05", score: 68, change: -4 },
            { date: "2024-04-12", score: 84, change: 16 },
            { date: "2024-05-20", score: 89, change: 5 },
            { date: "2024-06-15", score: 92, change: 3 },
          ]
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvolution();
  }, []);

  return (
    <div className="pt-24 pb-20 px-8 min-h-screen bg-background animate-fade-in relative">
      <div className="absolute inset-0 linear-grid mask-fade-top opacity-5 pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto space-y-20 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/[0.08] pb-16">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-3 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">
               <History className="w-3.5 h-3.5" />
               <span>Policy Performance Ledger</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tightest text-white leading-tight">
              Compliance Evolution
            </h1>
            <p className="text-text-secondary text-lg font-medium max-w-xl leading-relaxed">
              Historical ledger of policy health and structural alignment against evolving regulatory circular trends.
            </p>
          </div>
          <div className="flex items-center gap-12 text-[11px] uppercase tracking-[0.3em] font-bold text-text-muted pb-2">
             <div className="flex items-center space-x-3">
                <Target className="w-4 h-4 text-primary-500" />
                <span>Goal: 95.0%</span>
             </div>
             <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-primary-500" />
                <span>Retention: 3.2Y</span>
             </div>
          </div>
        </div>

        {/* Aggregate Graph */}
        <div className="linear-card p-16 space-y-16 shadow-[0_0_80px_rgba(255,255,255,0.01)]">
          {!isLoading && (
            <>
              <div className="flex items-center justify-between">
                 <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-white">Compliance Flux Analysis</h3>
                    <p className="text-[11px] text-text-muted uppercase tracking-[0.4em] font-bold">Trailing 6-month aggregate trust score</p>
                 </div>
                 <div className="text-right">
                    <div className="text-5xl font-black tracking-tightest text-primary-500">
                      {evolution.runs[evolution.runs.length - 1]?.score || 0}%
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">LATEST INDEX</div>
                 </div>
              </div>

              <div className="h-[350px] flex items-end justify-between gap-6 relative">
                {evolution.runs.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group/bar cursor-pointer">
                    <div className="relative w-full flex flex-col items-center justify-end h-full">
                      <div className="absolute -top-12 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 -translate-y-2 group-hover/bar:translate-y-0 z-20">
                         <div className="bg-white text-black px-4 py-2 rounded-xl text-[12px] font-black tracking-tightest shadow-2xl">
                            {item.score}%
                         </div>
                      </div>
                      <div 
                        className={`w-full max-w-[60px] rounded-t-xl transition-all duration-700 bg-white/[0.04] border-x border-t border-white/[0.08] group-hover/bar:bg-white/[0.1] group-hover/bar:border-white/[0.2] ${
                          item.change < 0 ? 'bg-risk-high/10 border-risk-high/20' : 
                          item.change > 0 ? 'bg-primary-500/10 border-primary-500/20' : ''
                        }`}
                        style={{ height: `${item.score}%` }}
                      />
                    </div>
                    <div className="mt-10 space-y-2 text-center">
                      <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">{new Date(item.date).toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }).toUpperCase()}</div>
                    </div>
                  </div>
                ))}
                <div className="absolute left-0 right-0 top-0 h-full pointer-events-none">
                   {[0, 25, 50, 75, 100].map(val => (
                     <div key={val} className="absolute w-full h-px bg-white/[0.03]" style={{ bottom: `${val}%` }} />
                   ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Ledger */}
        <div className="space-y-8">
           <div className="flex items-center space-x-4 px-2">
              <Activity className="w-4 h-4 text-text-muted" />
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.4em]">Audit Ledger // Verified Events</span>
           </div>
           
           <div className="linear-card overflow-hidden">
              <table className="w-full text-left font-sans">
                 <thead>
                    <tr className="border-b border-white/[0.08] text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted bg-white/[0.01]">
                       <th className="px-10 py-6">Issue Date</th>
                       <th className="px-10 py-6">Modification Cycle</th>
                       <th className="px-10 py-6">Trust Mapping</th>
                       <th className="px-10 py-6 text-right">Encrypted Proof</th>
                    </tr>
                 </thead>
                 <tbody className="text-[14px] font-medium text-white">
                    {evolution.runs.map((item, i) => (
                      <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group cursor-pointer">
                         <td className="px-10 py-6 text-text-secondary">{item.date}</td>
                         <td className="px-10 py-6 uppercase tracking-tight text-text-muted">Sync Sequence #{Math.floor(i + 400)}</td>
                         <td className="px-10 py-6">
                            <div className="flex items-center space-x-4">
                               <span className="font-bold">{item.score}%</span>
                               {item.change > 0 && <ArrowUpRight className="w-4 h-4 text-primary-500" />}
                               {item.change < 0 && <ArrowDownRight className="w-4 h-4 text-risk-high" />}
                            </div>
                         </td>
                         <td className="px-10 py-6 text-right">
                            <ChevronRight className="w-4 h-4 ml-auto text-text-muted opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
        
        <div className="flex justify-center pt-20">
           <Link href="/simulate" className="linear-button-primary h-14 px-12 group">
              Initiate New Compliance Cycle
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
           </Link>
        </div>
      </div>
    </div>
  );
}
