import React, { useState } from 'react';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/90 to-transparent pt-10 pb-8 px-8 z-40">
      <div className="max-w-4xl mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="relative bg-[#161618] border border-[#2A2A2C] rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 focus-within:border-[#00F5FF]/40 focus-within:shadow-[0_0_30px_rgba(0,245,255,0.1)]"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? "Arbiter is evaluating models..." : "Ask any engineering problem or prompt (Press Enter to submit)..."}
            disabled={isLoading}
            rows={2}
            className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 rounded-2xl py-4 pl-6 pr-32 focus:outline-none resize-none text-sm leading-relaxed"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#00DCE5] text-zinc-900 font-semibold text-sm shadow-lg shadow-[#00F5FF]/20 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-zinc-900" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Judging...</span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
        <div className="text-center mt-3 text-zinc-500 text-xs font-mono tracking-wider">
          Aura Arena • Built for desktop comparison with ample breathing space
        </div>
      </div>
    </div>
  );
}
