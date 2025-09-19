import React, { useMemo, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function Compiler({ backendUrl }) {
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("Click ▶ Run to execute.");
  const [isRunning, setIsRunning] = useState(false);

  const starters = useMemo(() => ({
    javascript: `function greet(){ return "Welcome to AlgoMate!"; } console.log(greet());`,
    python: `print("Welcome to AlgoMate!")`,
    c: `#include <stdio.h>\nint main(){ printf("Welcome to AlgoMate!"); return 0; }`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){ cout << "Welcome to AlgoMate!"; return 0; }`,
    java: `public class Main { public static void main(String[] args){ System.out.println("Welcome to AlgoMate!"); } }`
  }), []);

  useEffect(() => {
    setCode(starters[language] || "");
  }, [language, starters]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      const langMap = { javascript: 63, python: 71, c: 50, cpp: 54, java: 62 };

      const response = await axios.post(`${backendUrl}/compile`, {
        language_id: langMap[language],
        source_code: code,
        stdin: ""
      });

      setOutput(
        response.data.stdout ||
        response.data.compile_output ||
        response.data.stderr ||
        "(no output)"
      );
    } catch (err) {
      setOutput(`❌ Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const toggleTheme = () =>
    setTheme(prev => (prev === "vs-dark" ? "light" : "vs-dark"));

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="rounded-2xl border border-neutral-700 bg-black/30 backdrop-blur-lg shadow-xl">
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-700">
            <div className="flex items-center gap-3">
              <select value={language} onChange={e => setLanguage(e.target.value)} className="rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
              <button onClick={toggleTheme} title="Toggle Theme" className="text-xl hover:scale-110 transition">
                {theme === "vs-dark" ? "🌙" : "☀️"}
              </button>
            </div>
            <button onClick={runCode} disabled={isRunning} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md disabled:opacity-50">
              {isRunning ? "Running..." : "▶ Run"}
            </button>
          </div>
          <div className="h-[75vh] overflow-hidden rounded-b-2xl">
            <Editor
              height="100%"
              theme={theme}
              language={language === "cpp" ? "cpp" : language}
              value={code}
              onChange={(value) => setCode(value ?? "")}
              options={{ fontSize: 16, minimap: { enabled: false }, fontLigatures: true, scrollBeyondLastLine: false, tabSize: 2 }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-700 bg-black/30 backdrop-blur-lg shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-700 px-4 py-2">
            <h3 className="font-semibold text-lg">Output</h3>
            <button onClick={() => setOutput("")} className="text-sm text-neutral-300 hover:underline">Clear</button>
          </div>
          <pre className="h-[75vh] overflow-auto p-4 text-base whitespace-pre-wrap text-green-300 bg-black/40 rounded-b-2xl">{output}</pre>
        </div>
      </div>
    </div>
  );
}
