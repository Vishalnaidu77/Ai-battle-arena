import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import EmptyState from './components/EmptyState';

// Pre-baked high-quality benchmark responses matching the exact data schema
const BENCHMARK_DATA = {
  "Write factorial number code in js": {
    result: {
      problem: "Write factorial number code in js",
      solution_1: `// Model Alpha: Recursive approach
function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120`,
      solution_2: `// Model Beta: Iterative BigInt approach for large number precision
function factorial(n) {
  if (n < 0) return NaN;
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result.toString();
}

console.log(factorial(5)); // "120"
console.log(factorial(50)); // "30414093201713378043612608166064768844377641568960512000000000000"`,
      judge: {
        solution_1_score: 8,
        solution_2_score: 10,
        solution_1_reasoning: "The recursive implementation is elegant and clean for small numbers, but suffers from call stack overflow limits (Maximum call stack size exceeded) for numbers > 10,000, and loses floating-point precision in standard JavaScript numbers above 53 bits.",
        solution_2_reasoning: "Outstanding implementation. By leveraging BigInt iteratively, Model Beta guarantees infinite mathematical precision for massive factorials without risking stack overflow. Returning NaN for negative inputs aligns perfectly with IEEE 754 arithmetic standards."
      }
    }
  },
  "Implement a robust debounce function in TypeScript": {
    result: {
      problem: "Implement a robust debounce function in TypeScript",
      solution_1: `// Model Alpha: Basic Debounce
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}`,
      solution_2: `// Model Beta: Enterprise Debounce with Immediate Flag & Cancel Method
export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): DebouncedFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const debounced = function (...args: Parameters<T>) {
    lastArgs = args;
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate && lastArgs) func(...lastArgs);
    }, wait);

    if (callNow) func(...args);
  } as DebouncedFunction<T>;

  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
    timeout = null;
    lastArgs = null;
  };

  debounced.flush = () => {
    if (timeout && lastArgs) {
      clearTimeout(timeout);
      func(...lastArgs);
      timeout = null;
      lastArgs = null;
    }
  };

  return debounced;
}`,
      judge: {
        solution_1_score: 7.5,
        solution_2_score: 9.5,
        solution_1_reasoning: "Model Alpha provides a standard, functional debounce that works well for simple use cases like window resizing. However, it lacks advanced control methods like cancel or flush, which are critical in single-page React/Vue applications during component unmounting.",
        solution_2_reasoning: "Model Beta delivers a production-ready, enterprise-grade utility. Complete with TypeScript interface definitions, an immediate execution flag, and dedicated .cancel() and .flush() methods to prevent memory leaks and handle unmounting cleanly."
      }
    }
  },
  "Explain closures in JavaScript with practical examples": {
    result: {
      problem: "Explain closures in JavaScript with practical examples",
      solution_1: `// Model Alpha: Theoretical Explanation
// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).

function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(2)); // 7`,
      solution_2: `// Model Beta: Practical Explanation & Data Privacy Pattern
/**
 * CLOSURES IN PRACTICE: Data Encapsulation & Private State
 * Closures allow functions to access external variables from an enclosing scope even after the outer function has finished executing.
 */

function createSecureBankAcct(initialBalance) {
  let _balance = initialBalance; // Private variable enclosed in closure

  return {
    deposit: (amount) => {
      if (amount > 0) _balance += amount;
      return \`Deposited \${amount}. New balance: \${_balance}\`;
    },
    withdraw: (amount) => {
      if (amount > _balance) return 'Insufficient funds';
      _balance -= amount;
      return \`Withdrew \${amount}. Remaining: \${_balance}\`;
    },
    getBalance: () => _balance
  };
}

const myAcct = createSecureBankAcct(500);
console.log(myAcct.deposit(200)); // Deposited 200. New balance: 700
console.log(myAcct._balance); // undefined (completely private!)`,
      judge: {
        solution_1_score: 8,
        solution_2_score: 10,
        solution_1_reasoning: "Model Alpha accurately defines a closure and provides the classic makeAdder example. While technically correct, it remains abstract and doesn't showcase why closures are vital in modern development.",
        solution_2_reasoning: "Model Beta brilliantly connects theory to a real-world software design pattern: Emulating private methods and data encapsulation. This clearly demonstrates the utility of closures in protecting variables from global scope pollution."
      }
    }
  }
};

// Fallback generator for custom user prompts
const generateDynamicResponse = (problem) => ({
  result: {
    problem,
    solution_1: `// Model Alpha: Direct implementation for "${problem}"
function solveProblem() {
  console.log("Executing standard procedural logic...");
  // Standard approach utilizing built-in array and object routines
  const data = [1, 2, 3, 4, 5];
  return data.map(x => x * 2);
}

export default solveProblem;`,
    solution_2: `// Model Beta: Optimized architectural implementation for "${problem}"
import { useMemo } from 'react';

/**
 * Optimized solution using advanced memoization and robust error handling
 */
export function useOptimizedSolution(inputData) {
  return useMemo(() => {
    if (!inputData || !Array.isArray(inputData)) {
      return { data: [], error: new Error("Invalid input data structure") };
    }
    
    // Process stream with O(n) time complexity and O(1) auxiliary space
    const processed = inputData.reduce((acc, curr) => {
      acc.push(curr * 2);
      return acc;
    }, []);

    return { data: processed, error: null };
  }, [inputData]);
}`,
    judge: {
      solution_1_score: 8.2,
      solution_2_score: 9.6,
      solution_1_reasoning: `Model Alpha provides a direct, easy-to-read procedural solution to '${problem}'. It gets the job done quickly with standard built-in functions but does not account for memoization or edge-case validation.`,
      solution_2_reasoning: `Model Beta takes a sophisticated architectural approach to '${problem}'. By wrapping the logic in a custom hook/memoized structure and adding strict runtime input checks, it ensures peak frontend performance and resilient error handling.`
    }
  }
});

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (promptText) => {
    if (!promptText.trim()) return;
    setIsLoading(true);

    // Simulate arbiter evaluation delay for realistic AI feel
    setTimeout(() => {
      const matchedData = BENCHMARK_DATA[promptText.trim()] || generateDynamicResponse(promptText.trim());
      const newMessage = {
        id: Date.now(),
        ...matchedData
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsLoading(false);

      // Scroll smoothly to bottom after message renders
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 flex flex-col font-sans selection:bg-[#00F5FF]/30 selection:text-white">
      {/* Top Fixed Header */}
      <Header />

      {/* Main Content Arena */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-48 flex flex-col justify-center">
        {messages.length === 0 ? (
          <EmptyState onSelectSuggestion={handleSendMessage} />
        ) : (
          <div className="space-y-12 w-full">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Floating Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;

