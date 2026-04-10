import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, Lock, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background blobs for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-success/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 linear-grid mask-fade-bottom opacity-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 py-20 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-bold text-white uppercase tracking-[0.3em] animate-fade-in">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            <span>Sync Protocol v2.5 Active</span>
          </div>

          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tightest leading-[0.9] text-white">
              Regulatory changes <br /> 
              <span className="text-white/40 italic">shouldn’t surprise you.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Autonomous multi-agent architecture for real-time circular detection, impact mapping, and policy evolution.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link 
              href="/simulate" 
              className="w-full sm:w-auto linear-button-primary h-14 px-10 text-base font-bold flex items-center justify-center space-x-3 group"
            >
              <span>Run Compliance Check</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/dashboard"
              className="w-full sm:w-auto h-14 px-10 flex items-center justify-center space-x-3 text-[14px] font-bold text-white border border-white/10 rounded-xl hover:bg-white/5 transition-all"
            >
              <span>View Sample Assessment</span>
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pt-20 border-t border-white/[0.08]">
            <div className="space-y-4 text-left p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-white">Real-time Detection</h3>
              <p className="text-sm font-medium text-text-secondary leading-relaxed">
                Direct integration with RBI, SEBI, and MCA nodes for instant awareness of new regulatory circulars.
              </p>
            </div>
            
            <div className="space-y-4 text-left p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-success" />
              </div>
              <h3 className="text-lg font-bold text-white">Impact Mapping</h3>
              <p className="text-sm font-medium text-text-secondary leading-relaxed">
                Neural RAG engine maps new regulations against your specific internal policy documents automatically.
              </p>
            </div>

            <div className="space-y-4 text-left p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all">
              <div className="w-10 h-10 rounded-lg bg-risk-high/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-risk-high" />
              </div>
              <h3 className="text-lg font-bold text-white">Risk Mitigation</h3>
              <p className="text-sm font-medium text-text-secondary leading-relaxed">
                Drafting of contextual amendments and fine risk estimations powered by local LLM swarms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
