import { useState, useRef, useEffect } from "react";
import { Header } from "../components/header";

export const ChatRoomPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("userId"); // ambil userId dari localStorage

  const handleSend = async () => {
    if (!input.trim() || !userId) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    // Simpan pesan user ke backend
    await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        role: "user",
        message: input,
      }),
    });

    // Placeholder AI response
    const aiResponse = await getAIResponse(input);

    const botMsg = { text: aiResponse, sender: "bot" };
    setMessages((prev) => [...prev, botMsg]);

    // Simpan balasan bot ke backend
    await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        role: "bot",
        message: aiResponse,
      }),
    });
  };

  const getAIResponse = async (userInput) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Ini adalah respons AI untuk: " + userInput);
      }, 500);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Ambil riwayat chat dari backend
  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:3001/api/chat/${userId}`);
        const data = await res.json();
        const formatted = data.map((msg) => ({
          text: msg.message,
          sender: msg.role,
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("Gagal ambil history:", err);
      }
    };

    fetchHistory();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-white">
      <div className="flex items-center border-gray-700">
        <Header />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col-reverse">
        <div className="mx-auto max-w-3xl w-full flex flex-col-reverse gap-3">
          <div ref={messagesEndRef} />
          {[...messages].reverse().map((msg, idx) => (
            <div key={idx} className={`w-fit max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed break-words ${msg.sender === "user" ? "bg-purple-600 self-end ml-auto" : "bg-[#2A2A2A] self-start mr-auto"}`}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 bg-[#1E1E1E] border-gray-700">
        <div className="flex items-center max-w-3xl mx-auto">
          <div className="w-4 h-4 rounded-full bg-purple-500 mr-3" />
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Tanya apa?" className="flex-1 bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm outline-none placeholder-gray-400" />
          <button onClick={handleSend} className="ml-3 text-purple-400 hover:text-purple-300 text-sm font-semibold">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};
