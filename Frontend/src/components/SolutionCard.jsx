import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

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
      <div className="p-6 flex-1 overflow-x-auto text-zinc-200 text-sm leading-relaxed bg-[#161618]">
        <div className="markdown-content font-sans">
          <ReactMarkdown
            components={{
              code({node, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                const isBlock = match || String(children).includes('\n');
                
                return isBlock ? (
                  <div className="relative mt-4 mb-4 rounded-lg bg-[#0D1515] border border-[#2A2A2C] overflow-hidden shadow-lg">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#111113] border-b border-[#2A2A2C]">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{match ? match[1] : 'code'}</span>
                    </div>
                    <pre className="p-4 overflow-x-auto font-mono text-[13px] leading-6 text-zinc-300">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="px-1.5 py-0.5 rounded-md bg-[#1D1D20] border border-[#2A2A2C] text-[#00F5FF] font-mono text-[13px]" {...props}>
                    {children}
                  </code>
                )
              },
              p: ({children}) => <p className="mb-4 text-zinc-300 font-sans leading-relaxed last:mb-0">{children}</p>,
              h1: ({children}) => <h1 className="text-xl font-semibold mb-4 mt-6 text-white font-sans tracking-wide">{children}</h1>,
              h2: ({children}) => <h2 className="text-lg font-semibold mb-3 mt-5 text-white font-sans tracking-wide">{children}</h2>,
              h3: ({children}) => <h3 className="text-base font-semibold mb-2 mt-4 text-zinc-100 font-sans tracking-wide">{children}</h3>,
              ul: ({children}) => <ul className="list-disc pl-5 mb-4 text-zinc-300 font-sans space-y-2 marker:text-[#00F5FF]">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal pl-5 mb-4 text-zinc-300 font-sans space-y-2 marker:text-[#00F5FF]">{children}</ol>,
              li: ({children}) => <li className="leading-relaxed pl-1">{children}</li>,
              a: ({children, href}) => <a href={href} className="text-[#00F5FF] hover:text-[#00DCE5] hover:underline transition-colors" target="_blank" rel="noopener noreferrer">{children}</a>,
              blockquote: ({children}) => <blockquote className="border-l-2 border-[#00F5FF]/50 pl-4 py-1 mb-4 italic text-zinc-400 bg-[#111113] rounded-r-lg">{children}</blockquote>
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
