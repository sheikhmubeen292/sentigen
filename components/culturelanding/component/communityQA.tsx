"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommunityQA() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "0x3dee...47f1b2",
      avatarColor: "bg-pink-500",
      message:
        "Hey everyone! With the rise of AI-powered Agents in Web3, do you think they will replace human-managed brands, or will they simply enhance existing businesses?",
      likes: 438,
      time: "3h ago",
    },
    {
      id: 2,
      user: "SNTI",
      avatarColor: "bg-gray-500",
      message:
        "@0x3dee...47f1b2 Gud Tech, I think AI Agents will be a game-changer, but they won't completely replace human decision-making.",
      likes: 62,
      time: "14h ago",
    },
    {
      id: 3,
      user: "0x3dee...47f1b2",
      avatarColor: "bg-purple-500",
      message:
        "@0x3dee...47f1b2 Gud Tech, I think AI Agents will be a game-changer, but they won't completely replace human decision-making.",
      likes: 5,
      time: "1d ago",
    },
    {
      id: 4,
      user: "0x3dee...47f1b2",
      avatarColor: "bg-purple-500",
      message: "Bullish.",
      likes: 32,
      time: "2d ago",
    },
    {
      id: 5,
      user: "0x3DEE...47F1b2",
      avatarColor: "bg-yellow-500",
      message: "Cardigan fixie veil, mlkshk blog mustache?",
      likes: 0,
      time: "2d ago",
    },
  ]);

  return (
    <>
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        .community-bg {
          background-color: #181b1c !important;
        }
        .bg-\\[\\#181B1C\\] {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="relative w-full min-h-[750px] py-6">
        <h3 className="absolute left-4 top-0 text-sm font-normal text-[#F2F2F2]"></h3>
        <div
          className="absolute w-full h-full left-0 top-0"
          style={{
            filter: "url(#community-round)",
            colorRendering: "optimizeQuality",
          }}
        >
          <div
            className={cn(
              "absolute w-full h-full community-bg",
              "[clip-path:polygon(21%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_6%,_21%_6%)]",
              "md:[clip-path:polygon(10%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_5%,_10%_5%)]"
            )}
            style={{
              backgroundColor: "#181b1c",
              background: "#181b1c !important",
              transition: "none",
              color: "#F2F2F2",
            }}
          >
            <div className="h-[750px] overflow-y-auto rounded-md w-full scrollbar-hide p-4 mt-10 community-bg">
              <div className="flex items-center justify-between mb-4 community-bg">
                <p className="text-[#F2F2F2] text-semibold text-[18px]">
                  Forum
                </p>
                <div className="flex items-center gap-4">
                  <p className="text-[#F2F2F2] text-semibold text-sm">
                    Most Recent
                  </p>
                  <ChevronDown size={32} />
                </div>
              </div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className="mt-1 w-full text-white px-2 pt-2 pb-4 rounded-lg rounded-none border-b border-[#303030] community-bg"
                  style={{
                    backgroundColor: "#181b1c",
                    background: "#181b1c !important",
                  }}
                >
                  <div className="flex items-center justify-between community-bg">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-7 h-7 ${message.avatarColor} rounded-full`}
                      ></div>
                      <span className="text-[#F2F2F2] text-sm font-medium">
                        {message.user}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#BBBBBB] text-sm">
                        {message.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#BBBBBB] text-sm mt-2">
                    {message.message}
                  </p>

                  <div className="flex items-center mt-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={"/fillHeart.png"}
                        alt="Like"
                        width={20}
                        height={20}
                      />
                      <p className="text-[#BBBBBB] text-sm">
                        {message.likes} Likes
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={"/reply.png"}
                        alt="Reply"
                        width={20}
                        height={20}
                      />
                      <p className="text-[#BBBBBB] text-sm">Reply</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* SVG filter for rounded corners */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="community-round" colorInterpolationFilters="sRGB">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 19 -9"
                result="goo"
              />
              <feComposite
                in="SourceGraphic"
                in2="goo"
                operator="atop"
                preserveAspectRatio="xMidYMid meet"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
}
