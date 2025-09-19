import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Arrays from "./pages/TopicNotes/Arrays";
import LinkedList from "./pages/TopicNotes/LinkedLists";
import Stack from "./pages/TopicNotes/Stack";
import Tree from "./pages/TopicNotes/Trees";
import Searching from "./pages/TopicNotes/Searching";
import Chatbot from "./pages/Chatbot";
import Compiler from "./pages/Compiler";
import RoadmapPage from "./components/Roadmap/RoadmapPage";
import EasyDSA from "./pages/EasyDSA";
import Recursion from "./pages/TopicNotes/Recursion";
import Patterns from "./pages/Patterns";
import Basics from "./pages/Basics";
import Topics from "./pages/Topics";

import InterviewPrep from "./pages/InterviewPrep";
import FloatingChatbot from "./components/FloatingChatbot";
import HuffmanEncoding from "./pages/TopicNotes/HuffmanEncoding";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/array" element={<Arrays />} />
        <Route path="/topics" element={<Topics/>} />
        <Route path="/linkedlist" element={<LinkedList />} />
        <Route path="/stack" element={<Stack />} />
        <Route path="/searching" element={<Searching />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/HuffmanEncoding" element={<HuffmanEncoding />} />
        <Route path="/Patterns" element={<Patterns />} />
        <Route path="/EasyDSA" element={<EasyDSA />} />
        <Route path="/Recursion" element={<Recursion />} />
        <Route path="/Basics" element={<Basics />} />
        <Route path="/InterviewPrep" element={<InterviewPrep />} />
        <Route path="/trees" element={<Tree />} />

      </Routes>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
