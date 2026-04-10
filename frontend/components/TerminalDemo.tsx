"use client";

import { useEffect, useState } from "react";

const LOGS = [
  "Fetching SEBI circular SEBI/HO/CFD/PoD-1/P/CIR/2024/012...",
  "Running Change Detection Agent...",
  "Detected alteration in Annexure B (Reporting Thresholds)...",
  "Mapping impact on Internal Policy: ESG_COMPLIANCE_v3.pdf...",
  "Critical Conflict: Reporting deadline changed from 30 to 15 days.",
  "Drafting Amendment: Clause 12.4 update suggested.",
  "Simulation ready. Risk assessment: High.",
];

export default function TerminalDemo() {
  const [lines, setLines] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= LOGS.length) {
          setTimeout(() => {
            setLines([]);
            setIndex(0);
          }, 2000);
          return prev;
        }
        setLines(LOGS.slice(0, prev + 1));
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-window h-[320px] w-full max-w-2xl">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <div className="terminal-dot bg-error" />
          <div className="terminal-dot bg-warning" />
          <div className="terminal-dot bg-success" />
        </div>
        <div className="text-neutral-500 text-xs">zsh — 80x24</div>
      </div>
      <div className="p-6 text-primary-400 font-mono">
        {lines.map((line, i) => (
          <div key={i} className="mb-2 flex">
            <span className="text-success mr-2">➜</span>
            <span className={i === lines.length - 1 ? "animate-pulse border-r-2 border-white" : ""}>
              {line}
            </span>
          </div>
        ))}
        {lines.length === 0 && (
          <div className="flex">
            <span className="text-success mr-2">➜</span>
            <span className="animate-pulse border-r-2 border-white w-2" />
          </div>
        )}
      </div>
    </div>
  );
}
