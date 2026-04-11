"use client";

import React, { useState } from "react";
import { X, Check, ArrowRight, Building2, User, Mail, Shield, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";

interface OnboardingFormProps {
  onComplete: () => void;
  initialData?: any;
  onClose?: () => void;
}

export default function OnboardingForm({ onComplete, initialData, onClose }: OnboardingFormProps) {
  const { showToast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    orgName: "",
    cin: "",
    rbiReg: "",
    licenceType: "NBFC",
    primaryCategory: "NBFC-ML",
    orgType: "Private Limited",
    sector: "Finance",
    subSector: "Lending",
    branches: 1,
    contactName: "",
    contactEmail: "",
    ...initialData
  });

  const SECTORS = ["Finance", "Tech/SaaS", "Healthcare", "Food & Beverage", "Aviation", "Retail", "Manufacturing", "Others"];
  const SUB_SECTORS: Record<string, string[]> = {
    "Tech/SaaS": ["B2B", "B2C", "B2B2C", "Other"],
    "Food & Beverage": ["Kids", "Adults", "Medical/Nutritional", "General", "Other"],
    "Finance": ["Lending", "Deposits", "Payments", "Forex", "Investments", "Other"]
  };

  const LICENCE_TYPES = ["Commercial Bank", "NBFC", "Small Finance Bank", "Payment Bank", "Co-operative Bank", "Regional Rural Bank", "Other"];
  const REG_CATEGORIES = ["Schedule Commercial Bank", "NBFC-UL", "NBFC-ML", "NBFC-BL", "Non-Banking Financial Company", "Other"];
  const ORG_TYPES = ["Startup", "Private Limited", "Public Limited", "NBFC", "Bank", "Co-operative", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(formData));
    showToast("Profile synchronized successfully", "success");
    onComplete();
    router.push("/simulate");
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12 overflow-y-auto custom-scrollbar animate-in fade-in duration-500">
      <div className="max-w-4xl w-full bg-neutral-900 border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[800px]">
        
        {/* Sidebar Info */}
        <div className="w-full lg:w-80 bg-white/[0.02] border-r border-white/10 p-12 space-y-12 shrink-0">
           <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <Shield className="w-6 h-6" />
           </div>
           <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tightest leading-tight">Identity & <br/><span className="text-white/40 italic">Calibration.</span></h2>
              <p className="text-[14px] font-medium text-white/40 leading-relaxed">
                Configure your organization's compliance profile to calibrate our autonomous agents for your specific industry regulations.
              </p>
           </div>
           
           <div className="space-y-6 pt-12 border-t border-white/10 opacity-40">
              <div className="flex items-center space-x-3">
                 <div className="w-2 h-2 rounded-full bg-white" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Secure Storage</span>
              </div>
              <p className="text-[11px] font-medium leading-relaxed">Profiles are stored locally and never transmitted to our training datasets.</p>
           </div>
        </div>

        {/* Content Form */}
        <div className="flex-1 p-8 lg:p-16 overflow-y-auto custom-scrollbar">
           {onClose && (
             <button onClick={onClose} className="absolute top-10 right-10 p-3 text-white/20 hover:text-white transition-colors">
                <X className="w-6 h-6" />
             </button>
           )}

           <form onSubmit={handleSubmit} className="space-y-10">
              {/* Personal Section */}
              <div className="space-y-8">
                 <div className="flex items-center space-x-3 opacity-40">
                    <User className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Primary Contact</span>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Full Name</label>
                       <input 
                         required
                         value={formData.fullName}
                         onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                         className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium"
                         placeholder="Legal Identity"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Org Name</label>
                       <input 
                         required
                         value={formData.orgName}
                         onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                         className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium"
                         placeholder="Company Name"
                       />
                    </div>
                 </div>
              </div>

              {/* Corporate Section */}
              <div className="space-y-8">
                 <div className="flex items-center space-x-3 opacity-40">
                    <Building2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Corporate Identity</span>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">CIN (21 Digits)</label>
                       <input 
                         required
                         value={formData.cin}
                         onChange={(e) => setFormData({...formData, cin: e.target.value})}
                         className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium"
                         placeholder="U12345MH202..."
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">RBI Registration / License</label>
                       <input 
                         value={formData.rbiReg}
                         onChange={(e) => setFormData({...formData, rbiReg: e.target.value})}
                         className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium"
                         placeholder="Optional ID"
                       />
                    </div>
                 </div>
                 
                 <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Licence Type</label>
                       <select 
                         value={formData.licenceType}
                         onChange={(e) => setFormData({...formData, licenceType: e.target.value})}
                         className="w-full h-14 bg-neutral-800 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium appearance-none"
                       >
                          {LICENCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                       </select>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Org Type</label>
                       <select 
                         value={formData.orgType}
                         onChange={(e) => setFormData({...formData, orgType: e.target.value})}
                         className="w-full h-14 bg-neutral-800 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium appearance-none"
                       >
                          {ORG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                       </select>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Branches</label>
                       <input 
                         type="number"
                         required
                         value={formData.branches}
                         onChange={(e) => setFormData({...formData, branches: parseInt(e.target.value)})}
                         className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium"
                       />
                    </div>
                 </div>
              </div>

              {/* Regulatory Mapping Section */}
              <div className="space-y-8">
                 <div className="flex items-center space-x-3 opacity-40">
                    <Globe className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Industry Calibration</span>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Sector</label>
                       <select 
                         value={formData.sector}
                         onChange={(e) => setFormData({...formData, sector: e.target.value})}
                         className="w-full h-14 bg-neutral-800 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium appearance-none"
                       >
                          {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </div>
                    {SUB_SECTORS[formData.sector] && (
                       <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                          <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Sub-Sector Focus</label>
                          <select 
                            value={formData.subSector}
                            onChange={(e) => setFormData({...formData, subSector: e.target.value})}
                            className="w-full h-14 bg-neutral-800 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium appearance-none"
                          >
                             {SUB_SECTORS[formData.sector].map(ss => <option key={ss} value={ss}>{ss}</option>)}
                          </select>
                       </div>
                    )}
                 </div>
                 
                 <div className="space-y-3">
                    <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest ml-1">Primary Regulatory Category</label>
                    <select 
                      value={formData.primaryCategory}
                      onChange={(e) => setFormData({...formData, primaryCategory: e.target.value})}
                      className="w-full h-14 bg-neutral-800 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium appearance-none"
                    >
                       {REG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                 </div>
              </div>

              {/* Compliance Officer Section */}
              <div className="space-y-8">
                 <div className="flex items-center space-x-3 opacity-40">
                    <Mail className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Compliance Point of Contact</span>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <input 
                         required
                         value={formData.contactName}
                         onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                         className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium"
                         placeholder="Contact Name"
                       />
                    </div>
                    <div className="space-y-3">
                       <input 
                         required
                         type="email"
                         value={formData.contactEmail}
                         onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                         className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-5 text-[15px] focus:outline-none focus:border-white/40 transition-all font-medium"
                         placeholder="Contact Email"
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-6 items-center justify-between">
                 <p className="text-[13px] text-white/30 font-medium">By synchronizing, you confirm this identity data is accurate for regulatory audits.</p>
                 <button 
                   type="submit"
                   className="w-full md:w-auto px-12 h-14 bg-white text-black text-[15px] font-black rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                 >
                    <span>Synchronize Profile</span>
                    <Check className="w-5 h-5" />
                 </button>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
}
