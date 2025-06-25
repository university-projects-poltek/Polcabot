import { useState, useRef, useEffect } from "react";
import { Header } from "../../components/header";
import { apiChatBot } from "../../utils/api-client";

export const ChatRoomPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const aiResponse = await getAIResponse(input);
      setMessages((prev) => [...prev, { text: aiResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Terjadi kesalahan, silakan coba lagi.", sender: "bot" },
      ]);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (userInput) => {
    const answer = await apiChatBot.post("/ask", { question: userInput });

    return answer.data.answer;
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
    <div
      className="flex flex-col h-screen"
      style={{
        backgroundColor: "var(--color-bg-dark)",
        color: "var(--color-text)",
      }}
    >
      {/* Header */}
      <div className="flex items-center border-b border-gray-700">
        <Header />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col-reverse">
        <div className="mx-auto max-w-3xl w-full flex flex-col-reverse gap-3">
          <div ref={messagesEndRef} />

          {isLoading && "Lagi loading yaa..."}

          {[...messages].reverse().map((msg, idx) => (
            <div
              key={idx}
              className={`w-fit max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed break-words ${
                msg.sender === "user"
                  ? "self-end ml-auto"
                  : "self-start mr-auto"
              }`}
              style={{
                backgroundColor:
                  msg.sender === "user"
                    ? "var(--color-primary)"
                    : "var(--color-bg-chat)",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div
        className="px-4 py-3 border-t border-gray-700"
        style={{ backgroundColor: "var(--color-bg-dark)" }}
      >
        <div className="flex items-center max-w-3xl mx-auto">
          <div className="w-4 h-4 rounded-full bg-[var(--color-primary)] mr-3" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanya apa?"
            className="flex-1 px-4 py-2 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: "var(--color-bg-chat)",
              color: "var(--color-text)",
              fontFamily: "Poppins",
              placeholderColor: "var(--color-placeholder)",
            }}
          />
          <button
            onClick={handleSend}
            className="ml-3 text-sm font-semibold transition-colors"
            style={{
              color: "var(--color-primary)",
              fontFamily: "Poppins",
            }}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};
