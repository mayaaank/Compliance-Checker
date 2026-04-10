"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 z-[300] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center gap-4 px-5 py-4 rounded-xl border min-w-[320px] shadow-2xl animate-in slide-in-from-right duration-500
              ${toast.type === "success" ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400" : ""}
              ${toast.type === "error" ? "bg-rose-950/20 border-rose-500/30 text-rose-400" : ""}
              ${toast.type === "info" ? "bg-blue-950/20 border-blue-500/30 text-blue-400" : ""}
              backdrop-blur-xl
            `}
          >
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 shrink-0" />}
            {toast.type === "error" && <AlertTriangle className="w-5 h-5 shrink-0" />}
            {toast.type === "info" && <Info className="w-5 h-5 shrink-0" />}
            
            <span className="text-[13px] font-bold tracking-tight flex-1">{toast.message}</span>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 opacity-50 hover:opacity-100" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
