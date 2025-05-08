"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

// Sample space tokens data
const spaceTokens = [
  {
    heading: "How SNTI Helps You Stand Out",
    image: "/sunSet.png",
    text: "Sentigen introduces AI-powered Agents, intelligent digital entities designed to automate tasks, interact with users, ",
  },
  {
    heading: "The Meaning Behind SNTI's Latest Drop",
    image: "/bird.png",
    text: "Sentigen introduces AI-powered Agents, intelligent digital entities designed to automate tasks, interact with users, ",
  },
  {
    heading: "The Meaning Behind SNTI's Latest Drop",
    image: "/person.png",
    text: "Sentigen introduces AI-powered Agents, intelligent digital entities designed to automate tasks, interact with users, ",
  },
];

export default function BlogsCard() {
  return (
    <>
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        .blogs-card-bg {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="grid span-col full md:grid-cols-4 gap-5 my-10">
        <div className="relative w-full min-h-[210px] md:min-h-[200px]">
          <h3 className="absolute left-2 top-0 text-sm font-normal text-[#F2F2F2]">
            Blogs/News
          </h3>
          <div
            className="absolute w-full h-full left-0 top-0 bottom-1"
            style={{
              filter: "url(#blogs-card-round)",
              colorRendering: "optimizeQuality",
            }}
          >
            <div
              className={cn(
                "absolute w-full h-full blogs-card-bg",
                "[clip-path:polygon(29%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_12%,_29%_12%)]",
                "md:[clip-path:polygon(28%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_5%,_28%_5%)]"
              )}
              style={{
                backgroundColor: "#181b1c",
                background: "#181b1c !important",
                transition: "none",
              }}
            >
              <div className="mt-[10px] p-4 blogs-card-bg">
                <p className="mt-7 text-white text-xl md:text-xl text-2xl w-full md:w-[83%]">
                  There's a lot happening right now, and we've got the latest
                  for you. From fresh insights to key moments, take a look when
                  you're ready.
                </p>
              </div>
            </div>
          </div>
          {/* SVG filter for rounded corners */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="blogs-card-round" colorInterpolationFilters="sRGB">
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
        {spaceTokens.map((token, index) => (
          <div key={index} className="relative h-[460px]">
            <Image
              src={token.image || "/placeholder.svg"}
              alt="space"
              width={200}
              height={200}
              className="w-full h-full rounded-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg" />
            <div className="absolute bottom-0 left-4 right-4">
              <p className="font-semibold text-[32px] text-[#F2F2F2] leading-snug mb-4">
                {token.heading}
              </p>
              <p className="text-xs text-[#BBBBBB] pb-6">{token.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
