"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample space tokens data
const spaceTokens = [
  {
    heading: "Colorspacers",
    image: "/colorspace.png",
    text: "Astral",
    logo: "/token1.png",
  },
  {
    heading: "Dirtcold",
    image: "/dircold.png",
    text: "DTC",
    logo: "/token2.png",
  },
  {
    heading: "Ignite Jam",
    image: "/jaanbg.png",
    text: "AST",
    logo: "/token3.png",
  },
  {
    heading: "Unspaced",
    image: "/unspace.png",
    text: "unsp",
    logo: "/token1.png",
  },
  {
    heading: "Astral",
    image: "/dark.png",
    text: "AST",
    logo: "/token2.png",
  },
];

export default function Mindshare() {
  return (
    <>
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        .mindshare-bg {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="grid span-col full md:grid-cols-6 gap-5 my-10">
        <div className="relative w-full min-h-[170px] md:min-h-[200px]">
          <h3 className="absolute left-2 top-0 text-sm font-normal text-[#F2F2F2]">
            Top Mindshare
          </h3>
          <div
            className="absolute w-full h-full left-0 top-0 bottom-1"
            style={{
              filter: "url(#mindshare-round)",
              colorRendering: "optimizeQuality",
            }}
          >
            <div
              className={cn(
                "absolute w-full h-full mindshare-bg",
                "[clip-path:polygon(33%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_16%,_33%_16%)]",
                "md:[clip-path:polygon(48%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_10%,_48%_10%)]"
              )}
              style={{
                backgroundColor: "#181b1c",
                background: "#181b1c !important",
                transition: "none",
              }}
            >
              <div className="mt-[10px] p-4 mindshare-bg">
                <p className="mt-7 text-white text-xl md:text-xl text-2xl w-full md:w-[83%]">
                  When the community locks in on something, you know it's worth
                  paying attention to.
                </p>
              </div>
            </div>
          </div>
          {/* SVG filter for rounded corners */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="mindshare-round" colorInterpolationFilters="sRGB">
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
          <div key={index} className="relative h-[260px] rounded-lg">
            <Image
              src={token.image || "/placeholder.svg"}
              alt="space"
              width={200}
              height={200}
              className="w-full h-full rounded-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg" />
            <div className="absolute bottom-0 left-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={token.logo || "/placeholder.svg"}
                    alt={token.heading}
                    width={34}
                    height={34}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#F2F2F2]">
                    {token.heading}
                  </div>
                  <div className="text-xs text-[#7A7A7A]">${token.text}</div>
                </div>
              </div>
              <div className="w-full">
                <div className="">
                  <p className="text-xs text-[#7A7A7A] mt-3">Market Cap</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#F2F2F2]">{"$2.7m"}</span>
                    <span
                      className={`flex items-center text-am ${"text-[#04FEAE]"}`}
                    >
                      {"8.62%"}
                      {<ArrowUp className="ml-1 h-4 w-4" />}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-1 pb-3">
                    <Link
                      href={"#"}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Image
                        src={"/twitter.png"}
                        alt="twitter"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    </Link>

                    <Link
                      href={"#"}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Image
                        src={"/telegram.png"}
                        alt="telegram"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    </Link>

                    <Link
                      href={"#"}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Image
                        src={"/circle.png"}
                        alt="website"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
