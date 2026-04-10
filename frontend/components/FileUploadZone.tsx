"use client";

import { useMemo, useState } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        relative w-full h-64 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group
        ${isDragActive 
          ? "border-white/40 bg-white/[0.08] shadow-[0_0_40px_rgba(255,255,255,0.05)]" 
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"}
      `}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
        accept=".pdf,.docx,.doc"
      />
      
      <div className="space-y-4 text-center">
        <div className={`
          w-16 h-16 rounded-2xl mx-auto flex items-center justify-center transition-transform duration-500
          ${selectedFile ? "bg-success/20 text-success" : "bg-white/[0.05] text-white/40 group-hover:scale-110 group-hover:rotate-3"}
        `}>
          {selectedFile ? (
            <CheckCircle2 className="w-8 h-8 animate-in zoom-in" />
          ) : (
            <Upload className="w-8 h-8" />
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-[15px] font-bold text-white tracking-tight">
            {selectedFile ? selectedFile.name : "Drop Internal Policy PDF"}
          </p>
          <p className="text-[12px] font-medium text-text-muted uppercase tracking-widest">
            {selectedFile 
              ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • READY FOR ANALYSIS` 
              : "OR CLICK TO BROWSE FILES"}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-6 opacity-20 group-hover:opacity-40 transition-opacity">
         <div className="flex items-center space-x-1.5 grayscale">
            <div className="w-4 h-4 rounded-sm bg-white/20" />
            <span className="text-[9px] font-bold text-white uppercase tracking-tighter">SECURE</span>
         </div>
         <div className="flex items-center space-x-1.5 grayscale">
            <div className="w-4 h-4 rounded-sm bg-white/20" />
            <span className="text-[9px] font-bold text-white uppercase tracking-tighter">ENCRYPTED</span>
         </div>
      </div>
    </div>
  );
}
