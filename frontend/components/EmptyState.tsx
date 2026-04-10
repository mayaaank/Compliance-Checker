"use client";

import { Layout, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export default function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center space-y-8 animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center shadow-inner">
        <Layout className="w-8 h-8 text-text-muted opacity-20" />
      </div>
      <div className="space-y-3 max-w-sm">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-text-secondary font-medium leading-relaxed">
          {description}
        </p>
      </div>
      <Link 
        href={actionHref}
        className="linear-button-primary h-12 px-8 flex items-center space-x-3 group"
      >
        <span>{actionLabel}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
