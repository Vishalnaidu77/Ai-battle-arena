import React from 'react';

export default function EmptyState({ onSelectSuggestion }) {
  const suggestions = [
    {
      title: "Write factorial number code in js",
      desc: "Compare recursive vs optimized BigInt implementations for large numbers."
    },
    {
      title: "Implement a robust debounce function in TypeScript",
      desc: "Evaluate type safety, immediate execution flag, and timer cleanup handling."
    },
    {
      title: "Explain closures in JavaScript with practical examples",
      desc: "Compare educational clarity, memory leak warnings, and real-world utility."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-4xl mx-auto my-auto flex-1">
      {/* Glowing Hero Sparkle */}
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#00F5FF]/20 via-emerald-500/20 to-[#FFD700]/20 flex items-center justify-center border border-[#2A2A2C] mb-8 shadow-[0_0_50px_rgba(0,245,255,0.15)]">
        <svg className="w-10 h-10 text-[#00F5FF] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Main Hero Typography */}
      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
        Aura Comparison <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-emerald-400 to-[#FFD700]">Arena</span>
      </h2>
      <p className="text-zinc-400 text-base md:text-lg max-w-2xl mb-14 leading-relaxed font-normal">
        Submit any complex engineering, logic, or architectural problem. Witness <span className="text-[#00F5FF] font-semibold">Model Alpha</span> and <span className="text-[#FFD700] font-semibold">Model Beta</span> generate competing solutions side-by-side, evaluated instantly by an impartial AI Arbiter.
      </p>

      {/* Prompt Suggestions Grid */}
      <div className="w-full">
        <h3 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-6">
          Get Started With A Benchmark Prompt
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSuggestion(item.title)}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#161618] border border-[#2A2A2C] hover:border-[#00F5FF]/50 hover:bg-[#1C1C1F] hover:shadow-[0_0_25px_rgba(0,245,255,0.08)] transition-all duration-300 group text-left h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#111113] border border-[#2A2A2C] flex items-center justify-center text-zinc-400 group-hover:text-[#00F5FF] transition-colors font-mono text-xs">
                    0{idx + 1}
                  </span>
                  <svg className="w-4 h-4 text-zinc-600 group-hover:text-[#00F5FF] transition-colors transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-zinc-100 text-base mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
