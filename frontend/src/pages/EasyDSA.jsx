import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  { id: "basics", label: "Basics & Complexity", desc: "Big O Notation, basic loops, recursion fundamentals, and memory footprints.", count: 5 },
  { id: "arrays", label: "Arrays & Strings", desc: "Contiguous storage, matrix manipulation, vectors, and string parsing algorithms.", count: 5 },
  { id: "linkedlists", label: "Linked Lists", desc: "Singly, doubly, and circular chain lists; pointer manipulation and cycle checks.", count: 5 },
  { id: "stacks", label: "Stacks & Queues", desc: "LIFO/FIFO data ordering, expression parsing, and monotonic tracking structures.", count: 5 },
  { id: "searching", label: "Searching", desc: "Linear vs Binary search boundaries, rotated spaces, and target matching.", count: 5 },
  { id: "sorting", label: "Sorting", desc: "Bubble, Insertion, Merge, Quick, and Heap sort with analysis comparison matrices.", count: 5 },
  { id: "trees", label: "Trees & BSTs", desc: "Binary Trees, traversals (DFS/BFS), height calculations, and BST validation.", count: 5 },
  { id: "graphs", label: "Graphs", desc: "Adjacency matrices/lists, BFS, DFS, shortest path networks, and cycle detections.", count: 5 },
  { id: "greedy", label: "Greedy Algorithms", desc: "Localized interval optimization, activity selection, and change calculations.", count: 5 },
  { id: "dp", label: "Dynamic Programming", desc: "Memoization vs Tabulation, knapsacks, coin change, and structural sequences.", count: 5 },
  { id: "advanced", label: "Advanced Structures", desc: "Tries, Disjoint Set Union (DSU), Segment Trees, and spatial division lists.", count: 5 }
];

// Curated Algorithmic Patterns & Sequences Cheat Sheet
const patterns = [
  {
    name: "Sliding Window",
    description: "Converts O(N^2) nested loops into O(N) linear scans by maintaining a dynamic range boundary over arrays or strings.",
    useCase: "Subarray sums, longest substring metrics, pattern matches.",
    tip: "Maintain a left pointer and expand the right pointer. Shift left to recover validity when thresholds break."
  },
  {
    name: "Two Pointers",
    description: "Traverses a sorted collection from both ends toward the middle (or two varying rates) to find matches.",
    useCase: "Pair sum validation, array reversals, sorting partitions.",
    tip: "If sum is too low, increment left. If sum is too high, decrement right."
  },
  {
    name: "Fast & Slow Pointers (Tortoise & Hare)",
    description: "Uses two variable-speed references moving across linear nodes to expose internal structures.",
    useCase: "Cycle detection, finding midpoints, finding cyclic loops.",
    tip: "Let fast move 2 steps and slow move 1 step. If they intersect, a cycle is proven."
  },
  {
    name: "Prefix Sum Precomputations",
    description: "Pre-calculates cumulative sums in O(N) to answer coordinate/interval query scopes in O(1) time.",
    useCase: "Subarray range query challenges, matrix region summation.",
    tip: "Formula: Sum[L..R] = Prefix[R] - Prefix[L-1]."
  },
  {
    name: "Monotonic Stack / Queue",
    description: "Maintains stack elements in strictly ascending or descending order to identify boundary transitions.",
    useCase: "Next greater elements, stock span, sliding window maximums.",
    tip: "Before pushing item X, pop all values that break the strict ascending/descending invariant."
  }
];

// Massive list of curated HackerRank problems (at least 5 per topic area)
const hackerRankPlaylists = {
  basics: [
    { name: "Solve Me First", diff: "Easy", link: "https://www.hackerrank.com/challenges/solve-me-first/problem", id: "b1" },
    { name: "Simple Array Sum", diff: "Easy", link: "https://www.hackerrank.com/challenges/simple-array-sum/problem", id: "b2" },
    { name: "Compare the Triplets", diff: "Easy", link: "https://www.hackerrank.com/challenges/compare-the-triplets/problem", id: "b3" },
    { name: "Diagonal Difference", diff: "Easy", link: "https://www.hackerrank.com/challenges/diagonal-difference/problem", id: "b4" },
    { name: "Plus Minus", diff: "Easy", link: "https://www.hackerrank.com/challenges/plus-minus/problem", id: "b5" }
  ],
  arrays: [
    { name: "Arrays - DS", diff: "Easy", link: "https://www.hackerrank.com/challenges/arrays-ds/problem", id: "a1" },
    { name: "Left Rotation", diff: "Easy", link: "https://www.hackerrank.com/challenges/array-left-rotation/problem", id: "a2" },
    { name: "Sparse Arrays", diff: "Medium", link: "https://www.hackerrank.com/challenges/sparse-arrays/problem", id: "a3" },
    { name: "Dynamic Array", diff: "Easy", link: "https://www.hackerrank.com/challenges/dynamic-array/problem", id: "a4" },
    { name: "Array Manipulation", diff: "Hard", link: "https://www.hackerrank.com/challenges/crush/problem", id: "a5" }
  ],
  linkedlists: [
    { name: "Print List Elements", diff: "Easy", link: "https://www.hackerrank.com/challenges/print-the-elements-of-a-linked-list/problem", id: "l1" },
    { name: "Insert at Tail Node", diff: "Easy", link: "https://www.hackerrank.com/challenges/insert-a-node-at-the-tail-of-a-linked-list/problem", id: "l2" },
    { name: "Reverse a Linked List", diff: "Easy", link: "https://www.hackerrank.com/challenges/reverse-a-linked-list/problem", id: "l3" },
    { name: "Detect Cycles in Lists", diff: "Medium", link: "https://www.hackerrank.com/challenges/detect-whether-a-linked-list-contains-a-cycle/problem", id: "l4" },
    { name: "Merge Two Sorted Lists", diff: "Easy", link: "https://www.hackerrank.com/challenges/merge-two-sorted-linked-lists/problem", id: "l5" }
  ],
  stacks: [
    { name: "Maximum Element Stack", diff: "Easy", link: "https://www.hackerrank.com/challenges/maximum-element/problem", id: "s1" },
    { name: "Balanced Brackets", diff: "Medium", link: "https://www.hackerrank.com/challenges/balanced-brackets/problem", id: "s2" },
    { name: "Queue using Two Stacks", diff: "Medium", link: "https://www.hackerrank.com/challenges/queue-using-two-stacks/problem", id: "s3" },
    { name: "Equal Stacks Problem", diff: "Easy", link: "https://www.hackerrank.com/challenges/equal-stacks/problem", id: "s4" },
    { name: "Game of Two Stacks", diff: "Medium", link: "https://www.hackerrank.com/challenges/game-of-two-stacks/problem", id: "s5" }
  ],
  searching: [
    { name: "Ice Cream Parlor", diff: "Easy", link: "https://www.hackerrank.com/challenges/icecream-parlor/problem", id: "se1" },
    { name: "Missing Numbers", diff: "Easy", link: "https://www.hackerrank.com/challenges/missing-numbers/problem", id: "se2" },
    { name: "Sherlock and Array", diff: "Medium", link: "https://www.hackerrank.com/challenges/sherlock-and-array/problem", id: "se3" },
    { name: "Hackerland Radio Transmitters", diff: "Medium", link: "https://www.hackerrank.com/challenges/hackerland-radio-transmitters/problem", id: "se4" },
    { name: "Gridland Metro", diff: "Medium", link: "https://www.hackerrank.com/challenges/gridland-metro/problem", id: "se5" }
  ],
  sorting: [
    { name: "Big Sorting Layouts", diff: "Easy", link: "https://www.hackerrank.com/challenges/big-sorting/problem", id: "so1" },
    { name: "Insertion Sort - Part 1", diff: "Easy", link: "https://www.hackerrank.com/challenges/insertionsort1/problem", id: "so2" },
    { name: "Find the Median Point", diff: "Easy", link: "https://www.hackerrank.com/challenges/find-the-median/problem", id: "so3" },
    { name: "Lilys Homework swaps", diff: "Medium", link: "https://www.hackerrank.com/challenges/lilys-homework/problem", id: "so4" },
    { name: "Fraudulent Activity Alerts", diff: "Medium", link: "https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem", id: "so5" }
  ],
  trees: [
    { name: "Preorder Traversal", diff: "Easy", link: "https://www.hackerrank.com/challenges/tree-preorder-traversal/problem", id: "t1" },
    { name: "Height of a Binary Tree", diff: "Easy", link: "https://www.hackerrank.com/challenges/tree-height-of-a-binary-tree/problem", id: "t2" },
    { name: "Level Order Traversal", diff: "Easy", link: "https://www.hackerrank.com/challenges/tree-level-order-traversal/problem", id: "t3" },
    { name: "BST lowest Common Ancestor", diff: "Easy", link: "https://www.hackerrank.com/challenges/binary-search-tree-lowest-common-ancestor/problem", id: "t4" },
    { name: "BST Insertion Node Logic", diff: "Easy", link: "https://www.hackerrank.com/challenges/binary-search-tree-insertion/problem", id: "t5" }
  ]
};

export default function EasyDSA() {
  // Safely initialize useNavigate with local fallback mechanisms in case component isn't inside a Router
  let navigate = null;
  try {
    navigate = useNavigate();
  } catch (e) {
    console.warn("React Router not configured. Defaulting to safe manual state navigations.");
  }

  const safeNavigate = (path) => {
    if (navigate) {
      navigate(path);
    } else {
      // Manual internal visual hash change fallback behavior
      window.location.hash = path;
    }
  };

  // State Management for active layout configurations
  const [activeSection, setActiveSection] = useState("roadmap"); // 'roadmap' | 'patterns' | 'practice'
  const [completedProblems, setCompletedProblems] = useState({});
  const [selectedPlaylist, setSelectedPlaylist] = useState("basics");

  // Load user progress tracking from Local Storage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem("easy_dsa_progress_2026");
      if (savedProgress) {
        setCompletedProblems(JSON.parse(savedProgress));
      }
    } catch (e) {
      console.warn("Unable to access localStorage progress state storage.");
    }
  }, []);

  // Update localStorage helper on state mutations
  const toggleProblemCompletion = (id) => {
    const updated = {
      ...completedProblems,
      [id]: !completedProblems[id]
    };
    setCompletedProblems(updated);
    try {
      localStorage.setItem("easy_dsa_progress_2026", JSON.stringify(updated));
    } catch (e) {
      console.warn("Unable to persist state update updates.");
    }
  };

  // Metric Calculation helper
  const totalCountOfTrackedProblems = Object.values(hackerRankPlaylists).flat().length;
  const completedCount = Object.keys(completedProblems).filter(k => completedProblems[k]).length;
  const completionPercentage = totalCountOfTrackedProblems > 0 
    ? Math.round((completedCount / totalCountOfTrackedProblems) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-[#00FFFF] selection:text-black">
      
      {/* 1. HERO BRAND ZONE */}
      <header className="max-w-6xl mx-auto text-center pt-16 pb-10 px-4">
        <div className="inline-block px-3 py-1 bg-gray-950 border border-gray-800 rounded-full mb-4">
          <span className="text-[#00FFFF] text-xs font-semibold tracking-widest uppercase">
            Interactive Learning Guide
          </span>
        </div>
        <h1
          className="
            text-5xl md:text-7xl font-extrabold tracking-tight
            bg-gradient-to-r from-[#00FFFF] via-[#00BFFF] to-[#007FFF]
            bg-clip-text text-transparent
            drop-shadow-[0_0_12px_rgba(0,255,255,0.25)]
          "
        >
          🚀 Easy DSA Roadmap
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Unlock structural code confidence. Clear patterns, focused tracks, and real-time execution tracking templates.
        </p>

        {/* Global Progress Dashboard HUD */}
        <div className="max-w-lg mx-auto bg-gray-950/80 border border-gray-800 rounded-xl p-5 mt-8 shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-400">Your Study Progress</span>
            <span className="text-sm font-bold text-[#00FFFF] font-mono">{completedCount} / {totalCountOfTrackedProblems} Solved ({completionPercentage}%)</span>
          </div>
          <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00FFFF] to-[#007FFF] transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => {
                setCompletedProblems({});
                localStorage.removeItem("easy_dsa_progress_2026");
              }}
              className="text-[11px] font-semibold text-gray-500 hover:text-red-400 transition"
            >
              Reset Saved Progress
            </button>
          </div>
        </div>

        {/* Navigation Filters */}
        <div className="flex justify-center gap-2 mt-10 border-b border-gray-900 pb-2">
          <button
            onClick={() => setActiveSection("roadmap")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
              activeSection === "roadmap" 
                ? "bg-[#00FFFF] text-black shadow-lg shadow-[#00FFFF]/20" 
                : "bg-transparent text-gray-400 hover:text-white"
            }`}
          >
            Topic Roadmap
          </button>
          <button
            onClick={() => setActiveSection("patterns")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
              activeSection === "patterns" 
                ? "bg-[#00FFFF] text-black shadow-lg shadow-[#00FFFF]/20" 
                : "bg-transparent text-gray-400 hover:text-white"
            }`}
          >
            Pattern Cheat Sheet
          </button>
          <button
            onClick={() => setActiveSection("practice")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
              activeSection === "practice" 
                ? "bg-[#00FFFF] text-black shadow-lg shadow-[#00FFFF]/20" 
                : "bg-transparent text-gray-400 hover:text-white"
            }`}
          >
            HackerRank Playlists
          </button>
        </div>
      </header>

      {/* 2. DYNAMIC LAYOUT ZONE */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        
        {/* SECTION A: ROADMAP GRID */}
        {activeSection === "roadmap" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map(({ id, label, desc, count }) => (
              <div
                key={id}
                onClick={() => {
                  // If id matches active playlists, open playlist selector automatically
                  if (hackerRankPlaylists[id]) {
                    setSelectedPlaylist(id);
                    setActiveSection("practice");
                  } else {
                    safeNavigate(`/topics/${id}`);
                  }
                }}
                className="
                  group relative cursor-pointer
                  p-6 bg-gray-950/40 border border-gray-800 hover:border-[#00FFFF]/60
                  rounded-2xl transition-all duration-300
                  hover:-translate-y-1 shadow-md
                  backdrop-blur-sm
                "
              >
                {/* Visual Glow overlay background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00FFFF] to-[#007FFF] opacity-0 group-hover:opacity-5 transition duration-300" />
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00FFFF] transition duration-200">
                    {label}
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-[#00FFFF]/80 bg-[#00FFFF]/5 border border-[#00FFFF]/20 px-2.5 py-0.5 rounded-full">
                    {hackerRankPlaylists[id] ? `${count} Core Problems` : "Deep Learn"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {desc}
                </p>
                <div className="flex items-center text-xs font-semibold text-gray-500 group-hover:text-white transition">
                  <span>Explore module challenges</span>
                  <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION B: CORE DESIGN PATTERNS */}
        {activeSection === "patterns" && (
          <div className="space-y-6">
            <div className="border-l-4 border-[#00FFFF] bg-gray-950 p-6 rounded-r-xl mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Why Practice Patterns over Arbitrary Problems?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Most DSA questions are simple variations of standard structural patterns. If you memorize individual solutions, you fail the moment the constraints or values shift. Master these 5 algorithmic sequences to unlock hundreds of problem solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patterns.map((pat) => (
                <div key={pat.name} className="bg-gray-950 border border-gray-800 p-6 rounded-xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 text-7xl font-bold text-gray-900/30 select-none pointer-events-none pr-4 pt-2">
                    {pat.name.charAt(0)}
                  </div>
                  <h4 className="text-lg font-bold text-[#00FFFF] mb-2">{pat.name}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">{pat.description}</p>
                  
                  <div className="border-t border-gray-900 pt-4 mt-4 text-xs space-y-2">
                    <div>
                      <strong className="text-gray-400 block">Prime Use Cases:</strong>
                      <span className="text-gray-300">{pat.useCase}</span>
                    </div>
                    <div>
                      <strong className="text-[#00FFFF] block">Key Tip:</strong>
                      <span className="text-gray-300">{pat.tip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION C: HACKERRANK INTERACTIVE WORKBENCH */}
        {activeSection === "practice" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Playlist Sidebar Switcher */}
            <div className="lg:col-span-1 space-y-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-3 pl-2">Select Study Playlist</span>
              {Object.keys(hackerRankPlaylists).map((key) => {
                const topicMeta = topics.find(t => t.id === key);
                const isSelected = selectedPlaylist === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPlaylist(key)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border transition flex justify-between items-center ${
                      isSelected 
                        ? "bg-[#00FFFF]/10 border-[#00FFFF]/40 text-[#00FFFF]" 
                        : "bg-transparent border-transparent text-gray-400 hover:bg-gray-950 hover:text-white"
                    }`}
                  >
                    <span>{topicMeta?.label || key.toUpperCase()}</span>
                    <span className="text-xs font-mono bg-gray-900 border border-gray-800 px-2 py-0.5 rounded text-gray-400">
                      5 Tasks
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Playlist Problems Table View */}
            <div className="lg:col-span-3 bg-gray-950 border border-gray-800 rounded-2xl p-6 sm:p-8">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    {topics.find(t => t.id === selectedPlaylist)?.label || selectedPlaylist} Challenge Set
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Practice and track standard problem layouts directly.</p>
                </div>
              </div>

              <div className="space-y-3">
                {hackerRankPlaylists[selectedPlaylist].map((prob) => {
                  const isChecked = !!completedProblems[prob.id];
                  return (
                    <div 
                      key={prob.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition ${
                        isChecked 
                          ? "bg-emerald-950/10 border-emerald-900/40 text-emerald-300" 
                          : "bg-black border-gray-900 text-gray-300 hover:border-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Interactive Checkbox */}
                        <button
                          onClick={() => toggleProblemCompletion(prob.id)}
                          className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                            isChecked 
                              ? "bg-emerald-500 border-emerald-500 text-black" 
                              : "border-gray-700 hover:border-[#00FFFF] bg-transparent"
                          }`}
                        >
                          {isChecked && (
                            <svg className="w-3.5 h-3.5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>

                        <div>
                          <span className={`font-semibold text-sm ${isChecked ? "line-through text-gray-500" : "text-white"}`}>
                            {prob.name}
                          </span>
                          <span className={`ml-3 text-[10px] font-mono px-2 py-0.5 rounded ${
                            prob.diff === 'Easy' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40' :
                            prob.diff === 'Medium' ? 'bg-yellow-950/40 text-yellow-500 border border-yellow-900/40' :
                            'bg-red-950/40 text-red-400 border border-red-900/40'
                          }`}>
                            {prob.diff}
                          </span>
                        </div>
                      </div>

                      <a
                        href={prob.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold px-4 py-2 bg-gray-900 hover:bg-[#00FFFF] hover:text-black text-gray-400 rounded-lg transition border border-gray-800 hover:border-transparent flex items-center gap-1.5"
                      >
                        <span>Solve Challenge</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
