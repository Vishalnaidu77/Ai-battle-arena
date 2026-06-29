import React, { useState } from 'react';

export default function SolutionCard({ modelName, content, score, isWinner, type }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAlpha = type === 'alpha';
  const borderColor = isWinner 
    ? (isAlpha ? 'border-[#00F5FF]/60 shadow-[0_0_30px_rgba(0,245,255,0.15)]' : 'border-[#FFD700]/60 shadow-[0_0_30px_rgba(255,215,0,0.15)]') 
    : 'border-[#2A2A2C]';

  const badgeBg = isAlpha ? 'bg-[#00F5FF]/10 text-[#00F5FF] border-[#00F5FF]/30' : 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30';

  return (
    <div className={`flex flex-col bg-[#161618] border ${borderColor} rounded-2xl transition-all duration-300 overflow-hidden`}>
      {/* Card Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#111113] border-b border-[#2A2A2C]">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isAlpha ? 'bg-[#00F5FF]' : 'bg-[#FFD700]'} shadow-md`}></div>
          <h3 className="font-semibold text-zinc-100 text-base tracking-wide">{modelName}</h3>
          {isWinner && (
            <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Winner
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-lg border font-mono font-semibold ${badgeBg}`}>
            Score: {score}/10
          </span>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1D1D20] hover:bg-[#252529] border border-[#2A2A2C] text-zinc-300 text-xs transition-colors"
            title="Copy content"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 4H16C17.1046 4 18 4.89543 18 6V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V6C6 4.89543 6.89543 4 8 4Z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 20H4C2.89543 20 2 19.1046 2 18V8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Body / Formatted Content */}
      <div className="p-6 flex-1 overflow-x-auto text-zinc-200 text-sm leading-relaxed font-mono bg-[#161618]">
        <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-6 text-zinc-300">
          {content}
        </pre>
      </div>
    </div>
  );
}
