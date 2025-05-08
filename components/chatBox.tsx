"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import Image from "next/image";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello, I am Sentigen. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${inputValue}"`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="hidden md:block relative h-[100vh]">
        <div className="fixed flex flex-col h-full max-w-fit border border-[15px] border-[#1F2122]  bg-[#151617] rounded-lg overflow-hidden">
          {/* Chat messages area */}
          <div className="flex-1 flex items-end overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="space-y-4 ">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start">
                  {message.sender === "bot" && (
                    <Image
                      src="/sentiChatIcon.png"
                      alt="Sentigen Logo"
                      width={20}
                      height={50}
                      className="h-[40px] w-[50px] mr-2"
                    />
                  )}
                  <div
                    className={`max-w-fit break-words whitespace-pre-wrap rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "ml-auto bg-[#2A2A2A] text-white"
                        : "bg-[#1A1A1A] text-[#F2F2F2]"
                    }`}
                  >
                    <p className="text-xs text-[#f2f2f2]">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="w-full bg-[#050505] text-white rounded-xl py-3 pl-4 pr-10 focus:outline-none "
              />
              <button
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-[#00A3FF] transition-colors"
              >
                <Image
                  src="/sendIcon.png"
                  alt="sendIcon"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden h-full max-w-full">
        <div className="flex flex-col h-full max-w-fit   overflow-hidden">
          {/* Chat messages area */}
          <div className="flex-1 flex items-end overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start">
                  {message.sender === "bot" && (
                    <Image
                      src="/sentiChatIcon.png"
                      alt="Sentigen Logo"
                      width={20}
                      height={50}
                      className="h-[40px] w-[50px] mr-2"
                    />
                  )}
                  <div
                    className={`max-w-fit break-words whitespace-pre-wrap rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "ml-auto bg-[#2A2A2A] text-white"
                        : "bg-[#1A1A1A] text-[#F2F2F2]"
                    }`}
                  >
                    <p className="text-xs text-[#f2f2f2]">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="w-full bg-[#050505] text-white rounded-xl py-3 pl-4 pr-10 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-[#00A3FF] transition-colors"
              >
                <Image
                  src="/sendIcon.png"
                  alt="sendIcon"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
