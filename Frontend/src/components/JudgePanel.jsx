import React from 'react';

export default function JudgePanel({ judge }) {
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  
  const winner = solution_1_score > solution_2_score ? 'Model Alpha' : (solution_2_score > solution_1_score ? 'Model Beta' : 'Tie');
  const winnerScore = Math.max(solution_1_score, solution_2_score);

  return (
    <div className="mt-10 bg-[#161618] border border-[#2A2A2C] rounded-2xl overflow-hidden shadow-xl">
      {/* Panel Header */}
      <div className="px-8 py-5 bg-[#111113] border-b border-[#2A2A2C] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-white text-base tracking-wide">Arbiter Analysis & Verdict</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Automated impartial evaluation based on efficiency, correctness, and best practices</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 font-medium">Arbiter Verdict:</span>
          <span className="px-4 py-1.5 rounded-xl bg-[#1D1D20] border border-[#2A2A2C] text-emerald-400 font-semibold text-sm shadow-inner flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            {winner} ({winnerScore}/10)
          </span>
        </div>
      </div>

      {/* Scores & Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 pt-8 pb-6 border-b border-[#2A2A2C]/40">
        {/* Model Alpha Score Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-300 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F5FF]"></span>
              Model Alpha Score
            </span>
            <span className="text-xs font-mono font-bold text-[#00F5FF]">{solution_1_score}/10</span>
          </div>
          <div className="h-2 w-full bg-[#0D0D0F] rounded-full overflow-hidden border border-[#2A2A2C]">
            <div 
              className="h-full bg-gradient-to-r from-[#00F5FF]/60 to-[#00F5FF] rounded-full transition-all duration-500"
              style={{ width: `${(solution_1_score / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Model Beta Score Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-300 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD700]"></span>
              Model Beta Score
            </span>
            <span className="text-xs font-mono font-bold text-[#FFD700]">{solution_2_score}/10</span>
          </div>
          <div className="h-2 w-full bg-[#0D0D0F] rounded-full overflow-hidden border border-[#2A2A2C]">
            <div 
              className="h-full bg-gradient-to-r from-[#FFD700]/60 to-[#FFD700] rounded-full transition-all duration-500"
              style={{ width: `${(solution_2_score / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Detailed Reasoning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-[#161618]">
        {/* Alpha Reasoning */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-[#00F5FF] uppercase tracking-wider font-mono flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.1046 9.89543 7 11 7H13C14.1046 7 15 6.1046 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Model Alpha Reasoning
          </h4>
          <p className="text-sm text-zinc-300 leading-relaxed bg-[#111113] p-5 rounded-xl border border-[#2A2A2C]">
            {solution_1_reasoning}
          </p>
        </div>

        {/* Beta Reasoning */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-[#FFD700] uppercase tracking-wider font-mono flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.1046 9.89543 7 11 7H13C14.1046 7 15 6.1046 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Model Beta Reasoning
          </h4>
          <p className="text-sm text-zinc-300 leading-relaxed bg-[#111113] p-5 rounded-xl border border-[#2A2A2C]">
            {solution_2_reasoning}
          </p>
        </div>
      </div>
    </div>
  );
}
