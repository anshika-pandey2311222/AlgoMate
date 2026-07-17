import React, { useEffect, useState } from "react";

const initialQuestions = [
  {
    id: 1,
    title: "Two Sum",
    topic: "Array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/",
    solved: false,
    revised: false,
  },
  {
    id: 2,
    title: "Best Time to Buy and Sell Stock",
    topic: "Array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    solved: false,
    revised: false,
  },
  {
    id: 3,
    title: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-parentheses/",
    solved: false,
    revised: false,
  },
  {
    id: 4,
    title: "Binary Search",
    topic: "Binary Search",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/binary-search/",
    solved: false,
    revised: false,
  },
  {
    id: 5,
    title: "Merge Two Sorted Lists",
    topic: "Linked List",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
    solved: false,
    revised: false,
  },
];

export default function DSATracker() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("dsaTracker");
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      setQuestions(initialQuestions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dsaTracker", JSON.stringify(questions));
  }, [questions]);

  const toggleField = (id, field) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, [field]: !q[field] } : q
    );
    setQuestions(updated);
  };

  const topics = ["All", ...new Set(questions.map((q) => q.topic))];

  const filteredQuestions =
    filter === "All"
      ? questions
      : questions.filter((q) => q.topic === filter);

  const solvedCount = questions.filter((q) => q.solved).length;
  const progress =
    questions.length > 0 ? Math.round((solvedCount / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            DSA Progress Tracker
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Track your DSA journey topic-wise, mark problems as solved, revise regularly,
            and stay consistent.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Start Tracking
            </button>

            <a
              href="/files/dsa-tracker.pdf"
              download
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Download PDF Tracker
            </a>
          </div>
        </div>

        {/* Offline marketing section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl shadow-lg p-10 mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Now You Can Track Your DSA Offline Too
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Download the printable DSA Tracker PDF from AlgoMate and keep your preparation
            organized anytime, anywhere.
          </p>
          <a
            href="C:\Users\Hp\AlgoMate-main\frontend\src\pages\DSATracker.jsx"
            download
            className="inline-block bg-white text-purple-700 font-bold px-6 py-3 rounded-lg hover:scale-105 transition"
          >
            Download Offline Tracker
          </a>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Your Progress</h3>
              <p className="text-gray-600">
                {solvedCount} out of {questions.length} solved
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 font-semibold text-gray-700">{progress}% Completed</p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="font-semibold mr-3">Filter by Topic:</label>
          <select
            className="border px-4 py-2 rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {topics.map((topic, i) => (
              <option key={i} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Question</th>
                <th className="p-4">Topic</th>
                <th className="p-4">Difficulty</th>
                <th className="p-4">Practice</th>
                <th className="p-4">Solved</th>
                <th className="p-4">Revised</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="border-t">
                  <td className="p-4">{q.title}</td>
                  <td className="p-4">{q.topic}</td>
                  <td className="p-4">{q.difficulty}</td>
                  <td className="p-4">
                    <a
                      href={q.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-medium"
                    >
                      Solve
                    </a>
                  </td>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={q.solved}
                      onChange={() => toggleField(q.id, "solved")}
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={q.revised}
                      onChange={() => toggleField(q.id, "revised")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}