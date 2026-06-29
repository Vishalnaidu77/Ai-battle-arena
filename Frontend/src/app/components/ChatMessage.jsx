import React from 'react';
import SolutionCard from './SolutionCard';
import JudgePanel from './JudgePanel';

export default function ChatMessage({ message }) {
  const { problem, solution_1, solution_2, judge } = message.result;

  const isAlphaWinner = judge.solution_1_score >= judge.solution_2_score;
  const isBetaWinner = judge.solution_2_score >= judge.solution_1_score;

  return (
    <div className="py-16 border-b border-[#2A2A2C]/60 last:border-b-0 transition-all">
      {/* User Problem / Prompt Section */}
      <div className="mb-12 flex items-start gap-5 bg-[#161618] border border-[#2A2A2C] p-7 rounded-2xl shadow-lg">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center text-white font-semibold shadow-md flex-shrink-0 border border-zinc-500/30">
          <svg className="w-5 h-5 text-zinc-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1">
          <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider block mb-1">User Prompt</span>
          <p className="text-zinc-100 text-base md:text-lg leading-relaxed font-medium">
            {problem}
          </p>
        </div>
      </div>

      {/* Solutions Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <SolutionCard 
          modelName="Model Alpha" 
          content={solution_1} 
          score={judge.solution_1_score} 
          isWinner={isAlphaWinner && judge.solution_1_score > judge.solution_2_score}
          type="alpha"
        />
        <SolutionCard 
          modelName="Model Beta" 
          content={solution_2} 
          score={judge.solution_2_score} 
          isWinner={isBetaWinner && judge.solution_2_score > judge.solution_1_score}
          type="beta"
        />
      </div>

      {/* Arbiter Evaluation Panel */}
      <JudgePanel judge={judge} />
    </div>
  );
}
