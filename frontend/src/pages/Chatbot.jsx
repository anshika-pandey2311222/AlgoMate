import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import ReactMarkdown from "react-markdown";


export default function Chatbot({ backendUrl }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { role: "bot", text: data.response || "⚠️ No response from server." }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "⚠️ Error fetching response." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-black via-gray-900 to-black text-gray-200">

      {/* Sidebar */}
      <div className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-gray-900 border-r border-gray-800 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-20`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-cyan-400">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <ul className="p-4 space-y-3 text-gray-400">
          <li className="hover:text-cyan-400 cursor-pointer">📚 Notes</li>
          <li className="hover:text-cyan-400 cursor-pointer">📝 Interview</li>
          <li className="hover:text-cyan-400 cursor-pointer">📊 Roadmap</li>
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-gray-800 p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-cyan-400" />
          </button>
          <h1 className="text-xl font-semibold text-cyan-400">
            AlgoMate Chatbot
          </h1>
          <div />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-5 py-3 rounded-2xl max-w-[70%] shadow-lg transition-all duration-300 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black"
                    : "bg-gray-800 border border-gray-700"
                }`}
              >
                <ReactMarkdown
                  components={{
                    code({ inline, children }) {
                      return !inline ? (
                        <pre className="bg-black p-3 rounded-lg overflow-x-auto text-green-400 text-sm mt-2">
                          <code>{children}</code>
                        </pre>
                      ) : (
                        <code className="bg-gray-700 px-1 rounded text-cyan-300">
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-400 text-sm animate-pulse">
              AlgoMate is typing...
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Quick Buttons */}
        <div className="flex flex-wrap gap-2 px-6 pb-3">
          {["What is an array?", "Explain linked list", "Show me sorting code"].map((q, idx) => (
            <button
              key={idx}
              onClick={() => setInput(q)}
              className="bg-gray-800 border border-gray-700 hover:border-cyan-400 text-gray-300 px-3 py-1 rounded-lg text-sm transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 backdrop-blur-md border-t border-gray-800 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ask AlgoMate anything..."
            className="flex-1 bg-gray-800 text-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={handleSend}
            className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-cyan-300 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
