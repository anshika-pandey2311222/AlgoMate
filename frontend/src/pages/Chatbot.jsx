import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Chatbot() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { role: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error fetching response." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-gray-300">
      {/* Sidebar */}
      <div
        className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-gray-900 border-r border-gray-800 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-[#00FFFF]">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <ul className="p-4 space-y-3">
          <li className="hover:text-[#00FFFF] cursor-pointer">📚 Notes</li>
          <li className="hover:text-[#00FFFF] cursor-pointer">📝 Interview</li>
          <li className="hover:text-[#00FFFF] cursor-pointer">📊 Roadmap</li>
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-900 border-b border-gray-800 p-4 shadow-sm">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-[#00FFFF]" />
          </button>
          <h1 className="text-xl font-semibold text-[#00FFFF]">
            AlgoMate Chatbot
          </h1>
          <div />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-[#00FFFF]/60 to-[#007FFF]/60 text-black"
                    : "bg-gray-600 border border-gray-700 text-gray-100"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Questions */}
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {["What is an array?", "Explain linked list", "Show me sorting code"].map(
            (q, idx) => (
              <button
                key={idx}
                onClick={() => setInput(q)}
                className="bg-gray-800 border border-gray-700 hover:border-[#00FFFF] text-gray-300 px-3 py-1 rounded-lg text-sm"
              >
                {q}
              </button>
            )
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-gray-900 border-t border-gray-800 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
          />
          <button
            onClick={handleSend}
            className="bg-[#00FFFF] text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
