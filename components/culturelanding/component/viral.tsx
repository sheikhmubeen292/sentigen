"use client";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import NewsEdit from "./edit-dailog/news-edit";
import { cn } from "@/lib/utils";

type Tweet = {
  id: string;
  username: string;
  profileImage: string;
  content: string;
  date: string;
};

const tweets: Tweet[] = [
  {
    id: "1",
    username: "@MyCryptoPie",
    profileImage: "/viralImg.png",
    content:
      "I'm going to @TheLBShow_'s upcoming Space. Will you join too? #SENTIGEN",
    date: "Mar 03",
  },
  {
    id: "2",
    username: "@DegenGeorgy",
    profileImage: "/viralImg.png",
    content:
      "Rosie Huntington-Whiteley in custom Balenciaga at Le Grand Dîner du Louvre.\n\nA vision in black sequins, commanding the night with effortless elegance. The future of couture, redefined.",
    date: "Feb 28",
  },
  {
    id: "3",
    username: "@Mimifiedxxx",
    profileImage: "/viralImg.png",
    content: "SENTIGEN - the next big thing, sounds really intriguing 🔥",
    date: "Feb 28",
  },
  {
    id: "4",
    username: "@CryptoAnalyst",
    profileImage: "/viralImg.png",
    content:
      "Just checked out the SENTIGEN whitepaper. This could be revolutionary for decentralized AI infrastructure.",
    date: "Feb 27",
  },
  {
    id: "5",
    username: "@TechFuturist",
    profileImage: "/viralImg.png",
    content:
      "The intersection of blockchain and AI is where the next unicorns will emerge. Keep an eye on projects like SENTIGEN.",
    date: "Feb 26",
  },
];

export default function Viral() {
  const [open, setOpen] = useState(false);

  const [vision, setVision] = useState({
    text: "Sentigen introduces AI-powered Agents, intelligent digital entities designed to automate tasks, interact with users, and enhance brand engagement. These Agents can assist with customer interactions, automate workflows, and even function as personalized brand ambassadors in the Web3 ecosystem.",
    img: "/newsBg.png",
    text1: "Next Generation: AI-Powered Agents",
  });

  return (
    <>
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        .viral-bg {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Viral Tweets Component */}
        <div className="relative w-full min-h-[500px] py-6 mt-10 md:col-span-1">
          <h3 className="absolute left-2 top-0 text-sm font-normal text-[#F2F2F2]">
            Viral Tweets
          </h3>
          <div
            className="absolute w-full h-full left-0 top-0"
            style={{ filter: "url(#viral-tweets-round)" }}
          >
            <div
              className={cn(
                "absolute w-full h-full viral-bg",
                "[clip-path:polygon(28%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_5%,_28%_5%)]",
                "md:[clip-path:polygon(22%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_5%,_22%_5%)]"
              )}
              style={{
                backgroundColor: "#181b1c",
                background: "#181b1c !important",
              }}
            >
              <div className="p-5 mt-12 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-hide viral-bg">
                {tweets.map((tweet) => (
                  <div
                    key={tweet.id}
                    className="p-4 border border-[#303030] rounded-lg mb-3 hover:bg-[#1f2224] transition-colors viral-bg"
                  >
                    <div className="flex items-start gap-3">
                      {/* Main image - rectangular */}
                      <div className="flex-shrink-0 w-20 h-[55px] border h-12 overflow-hidden rounded-lg">
                        <Image
                          src={tweet.profileImage || "/placeholder.svg"}
                          alt={tweet.username}
                          width={60}
                          height={48}
                          className="object-cover rounded-lg h-[100%] w-full"
                        />
                      </div>

                      {/* Tweet content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            {/* Profile image - rounded */}
                            <Image
                              src={tweet.profileImage || "/placeholder.svg"}
                              alt={tweet.username}
                              width={20}
                              height={20}
                              className="rounded-full mr-2"
                            />
                            <span className="text-white font-medium">
                              {tweet.username}
                            </span>
                            <button className="ml-2 text-gray-500 hover:text-gray-400">
                              <Image
                                src={"/twitter.png"}
                                alt={tweet.username}
                                width={20}
                                height={20}
                                className="rounded-full mr-2"
                              />
                            </button>
                          </div>
                          <span className="text-xs text-gray-500">
                            {tweet.date}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm whitespace-pre-line mt-2">
                          {tweet.content}
                        </p>
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
              <filter id="viral-tweets-round" colorInterpolationFilters="sRGB">
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
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>

        {/* News Component */}
        <div className="relative group w-full min-h-[500px] py-6 mt-10 md:col-span-2">
          <h3 className="absolute left-4 top-0 text-sm font-normal text-[#F2F2F2]">
            News
          </h3>
          <div
            className="absolute w-full h-full left-0 top-0"
            style={{ filter: "url(#news-round)" }}
          >
            <div
              className={cn(
                "absolute w-full h-full viral-bg",
                "[clip-path:polygon(21%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_6%,_21%_6%)]",
                "md:[clip-path:polygon(8%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_5%,_8%_5%)]"
              )}
              style={{
                backgroundColor: "#181b1c",
                background: "#181b1c !important",
              }}
            >
              <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                <div className="flex items-center gap-3 border rounded-lg border-[#293032] bg-[#141819] p-2 ">
                  <Image
                    src="/pancil.png"
                    alt="ai-icon"
                    width={10}
                    height={10}
                    className="w-5 h-5"
                    onClick={() => setOpen(true)}
                  />
                  <Image
                    src="/ai-icon.png"
                    alt="ai-icon"
                    width={10}
                    height={10}
                    className="w-5 h-5"
                  />
                </div>
              </span>
              <div
                className="h-full flex items-start flex-col justify-end text-white text-base md:text-2xl px-4"
                style={{
                  backgroundImage: `url(${vision.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="w-full text-[#F2F2F2] font-semibold">
                  Next Generation: AI-Powered Agents
                </p>
                <div className="flex items-start justify-between w-full mt-2 gap-4">
                  {/* Description text */}
                  <p className="text-[#bbbbbb] text-xs md:text-sm mb-4 w-full md:w-[70%]">
                    {vision.text}
                  </p>

                  {/* Navigation arrows */}
                  <div className="hidden md:flex gap-2 self-end mb-4">
                    <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white w-4 h-4"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white w-4 h-4"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SVG filter for rounded corners */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="news-round" colorInterpolationFilters="sRGB">
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
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <NewsEdit
        open={open}
        setOpen={setOpen}
        vision={vision}
        setVision={setVision}
      />
    </>
  );
}
