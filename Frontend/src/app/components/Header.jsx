import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-[#2A2A2C] z-50 flex items-center justify-between px-8 lg:px-16 transition-all">
      <div className="flex items-center gap-4">
        {/* Aura Sparkle Logo */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F5FF]/20 to-[#FFD700]/20 flex items-center justify-center border border-[#2A2A2C]">
          <svg className="w-5 h-5 text-[#00F5FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white tracking-wide flex items-center gap-2">
            Aura Arena
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#161618] border border-[#2A2A2C] text-[#00F5FF] font-mono">
              Judge Mode
            </span>
          </h1>
          <p className="text-xs text-zinc-400">Desktop AI Model Comparison & Arbiter Analysis</p>
        </div>
      </div>

      {/* Model Indicators */}
      <div className="hidden md:flex items-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161618] border border-[#2A2A2C]">
          <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse"></span>
          <span className="text-zinc-300">Model Alpha (Cyan)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161618] border border-[#2A2A2C]">
          <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></span>
          <span className="text-zinc-300">Model Beta (Gold)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161618] border border-[#2A2A2C]">
          <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-emerald-400 font-medium">Arbiter Active</span>
        </div>
      </div>
    </header>
  );
}
