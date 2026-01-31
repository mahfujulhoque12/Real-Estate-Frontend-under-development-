"use client";
import React, {
  useEffect,
  useRef,
  useState,
  FormEvent,
  KeyboardEvent,
} from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { MdMessage, MdOutlineSupportAgent, MdSend } from "react-icons/md";

type Message = {
  role: "user" | "ai";
  text: string;
};

const Chat: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showTyping, setShowTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    if (!open) return;

    setMessages([]);
    setShowTyping(true);

    const timer = setTimeout(() => {
      setShowTyping(false);
      setMessages([
        {
          role: "ai",
          text: `${getGreeting()} and welcome to Dream Home AI. It is a pleasure to have you here. To assist you better, please describe your use case in as much detail as you can so I can help you effectively.`,
        },
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [open]);

  const handleClick = (): void => {
    setOpen(!open);
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);

  const handleSubmit = async (e?: FormEvent): Promise<void> => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMessage: Message = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.text || data.response || "No response from AI",
        },
      ]);
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "⚠️ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const TypingDots: React.FC = () => (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="flex gap-1">
        <div
          className="w-2 h-2 bg-gradient-to-r from-[#10e6cd] to-[#0bc2ad] rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-gradient-to-r from-[#10e6cd] to-[#0bc2ad] rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-gradient-to-r from-[#10e6cd] to-[#0bc2ad] rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
      <span className="text-sm text-gray-500">AI is thinking...</span>
    </div>
  );

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleClick}
        className={`fixed z-50 bottom-25 cursor-pointer right-7 w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white transition-all duration-300 hover:shadow-2xl ${
          open
            ? "bg-gradient-to-br from-red-500 to-red-600 rotate-90 scale-110"
            : "bg-gradient-to-br from-[#10e6cd] to-[#0bc2ad] hover:from-[#0fd4bd] hover:to-[#09a895]"
        }`}
        style={{
          animation: !open ? "float 3s ease-in-out infinite" : "none",
        }}
      >
        {open ? (
          <IoClose
            size={28}
            className="text-white transition-transform duration-300"
          />
        ) : (
          <LuMessageCircleMore size={28} className="text-white" />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
            1
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm animate-fadeIn"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat Modal */}
      <div
        className={`fixed z-[10000] bottom-24 right-8 w-[90vw] max-w-[400px] h-[65vh] min-h-[500px] max-h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 transform ${
          open
            ? "opacity-100 translate-y-0 scale-100 animate-slideUp"
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        }`}
        ref={chatContainerRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-[#e6faf7] to-[#d0f5f0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#10e6cd] to-[#0bc2ad] rounded-lg shadow-sm">
              <MdOutlineSupportAgent size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                DreamAI Assistant
              </h3>
              <p className="text-xs text-gray-500">
                {loading ? "Processing..." : "Ready to help"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 cursor-pointer rounded-full transition-colors duration-200 hover:rotate-90"
          >
            <IoClose
              size={22}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
          {showTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-[85%]">
                <TypingDots />
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-messageIn`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3 max-w-[85%]">
                {msg.role === "ai" && (
                  <div className="mt-1 shrink-0">
                    <div className="p-2 bg-gradient-to-r from-[#e6faf7] to-[#d0f5f0] rounded-full shadow-sm">
                      <MdMessage size={18} className="text-[#10e6cd]" />
                    </div>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm max-w-full transition-all duration-200 hover:shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#10e6cd] to-[#0bc2ad] text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>

                {msg.role === "user" && (
                  <div className="mt-1 shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#10e6cd] to-[#0bc2ad] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      Y
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && messages.length > 0 && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-[85%]">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-px" />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="flex-1 px-5 py-3.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10e6cd] focus:border-[#10e6cd] bg-gray-50/50 transition-all duration-200 hover:bg-white"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className={`p-3.5 rounded-full text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  loading
                    ? "bg-gradient-to-r from-gray-400 to-gray-500"
                    : "bg-gradient-to-r from-[#10e6cd] to-[#0bc2ad] hover:from-[#0fd4bd] hover:to-[#09a895]"
                } hover:scale-105 active:scale-95`}
              >
                <MdSend size={20} className="text-white" />
              </button>
            </div>

            <p className="text-xs text-center text-gray-400 px-2">
              Powered by Dream Home • AI responses may vary
            </p>
          </form>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            box-shadow: 0 10px 25px rgba(16, 230, 205, 0.3);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 35px rgba(16, 230, 205, 0.5);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }

        .animate-messageIn {
          animation: messageIn 0.3s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce {
          animation: bounce 1.4s infinite ease-in-out;
        }

        @keyframes bounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-6px);
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
          margin: 4px 0;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10e6cd, #0bc2ad);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0fd4bd, #09a895);
        }

        /* Smooth transitions */
        * {
          transition-property:
            background-color, border-color, color, fill, stroke, opacity,
            box-shadow, transform, filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 200ms;
        }

        /* Loading animation for send button */
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .loading-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Chat;
