"use client";

import { useRef, useState } from "react";
import { Upload, X, FileText, Lock, ShieldCheck } from "lucide-react";

interface FileUploadZoneProps {
  onFileSelect: (file: File | null) => void;
}

export default function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
    if (files.length > 0) {
      setSelectedFile(files[0]);
      onFileSelect(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
         setSelectedFile(file);
         onFileSelect(file);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-2xl p-20 flex flex-col items-center justify-center transition-all cursor-pointer group overflow-hidden
            ${isDragging ? "border-white bg-white/[0.04]" : "border-white/[0.1] hover:border-white/[0.2] bg-white/[0.01]"}
          `}
        >
          <input
            type="file"
            ref={inputRef}
            onChange={handleChange}
            accept=".pdf"
            className="hidden"
          />
          
          <div className="absolute inset-0 linear-grid opacity-10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center shadow-2xl mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:scale-110">
              <Upload className={`w-8 h-8 ${isDragging ? "text-white" : "text-text-muted group-hover:text-black"}`} />
            </div>
            
            <h3 className="text-xl font-black text-white tracking-tight">Supply Policy Context</h3>
            <p className="text-text-secondary text-[14px] mt-2 font-medium max-w-[240px] leading-relaxed">
              Drag and drop your internal PDF manual for semantic grounding.
            </p>
            
            <div className="mt-10 flex items-center space-x-3 opacity-30 group-hover:opacity-100 transition-opacity">
               <ShieldCheck className="w-4 h-4 text-white" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Encrypted Tunnel Active</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="linear-card p-8 flex items-center justify-between border-white/[0.15] hover:border-white/30 transition-all group animate-in zoom-in-95 duration-300">
          <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-white text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <div className="text-[15px] font-black text-white uppercase tracking-tight truncate max-w-[400px]">{selectedFile.name}</div>
              <div className="flex items-center space-x-4">
                 <div className="text-[11px] font-bold text-text-muted">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</div>
                 <div className="w-1 h-1 bg-white/20 rounded-full" />
                 <div className="text-[11px] font-black text-success uppercase tracking-widest">Integrity Verified</div>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); removeFile(); }}
            className="w-12 h-12 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.08] rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
