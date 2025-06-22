import { useState, useRef, useEffect } from "react";
import { Header } from "../../components/header";

export const ChatRoomPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    // Clear input immediately
    setInput("");

    // Placeholder AI response
    const aiResponse = await getAIResponse(input);
    setMessages((prev) => [...prev, { text: aiResponse, sender: "bot" }]);
  };

  const getAIResponse = async (userInput) => {
    // Placeholder for AI integration
    // Replace this with actual API call to your AI backend
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-white">
      {/* Header */}
      <div className="flex items-center border-gray-700">
        <Header />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col-reverse">
        <div className="mx-auto max-w-3xl w-full flex flex-col-reverse gap-3">
          <div ref={messagesEndRef} />
          {[...messages].reverse().map((msg, idx) => (
            <div
              key={idx}
              className={`w-fit max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed break-words ${
                msg.sender === "user"
                  ? "bg-purple-600 self-end ml-auto"
                  : "bg-[#2A2A2A] self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-[#1E1E1E]   border-gray-700">
        <div className="flex items-center max-w-3xl mx-auto">
          <div className="w-4 h-4 rounded-full bg-purple-500 mr-3" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanya apa?"
            className="flex-1 bg-[#2A2A2A] text-white px-4 py-2 rounded-lg text-sm outline-none placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            className="ml-3 text-purple-400 hover:text-purple-300 text-sm font-semibold"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};
