"use client";

import { ITokenItem } from "@/types/contract.types";
import { getExactDecimals } from "@/utils/decimals";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const marketCap = "$120m";
const marketCapChange = 8.62;
const holders = "77k";
const followersOnX = "138k";
const isPositive = marketCapChange > 0;
export default function CreatedCard({ agent }: { agent: ITokenItem }) {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="relative w-full min-h-[300px] ">
        <h3 className="absolute left-4 top-0 text-sm font-normal text-[#F2F2F2]">
          {agent.ticker}
        </h3>
        <div
          className="absolute w-full h-full left-0 top-0 cursor-pointer"
          style={{ filter: "url(#round)" }}
          onClick={() => router.push(`/trading/${agent.tokenMint}`)}
        >
          <div
            className="absolute w-full bg-[url('/cultrureImage.png')] bg-cover bg-center bg-no-repeat h-full 
                    [clip-path:polygon(29%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_8%,_29%_8%)] 
                    md:[clip-path:polygon(15%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_9%,_15%_9%)] p-4
                   "
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="mt-2 md:mt-[40px] relative z-10 h-full">
              <div className="flex  items-center md:items-start justify-center md:justify-between flex-col h-full">
                {/* top componet   logo and start */}
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center">
                      {/* <div className="w-4 h-4 bg-black"></div> */}
                      <Image
                        src={agent.imgUrl || "/dummy.png"}
                        alt={agent.name}
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                      />
                    </div>
                    <span className="font-medium">{agent.name}</span>
                  </div>
                  <div className="relative z-10 hidden md:flex items-center gap-6 text-white rounded-lg mt-2 ">
                    <div className="flex flex-col mt-2">
                      <span className="text-sm text-[#7A7A7A]">Price</span>
                      <div className="flex items-center gap-2 ">
                        <span className="text-lg font-semibold">
                          {agent?.price ?? 0}
                        </span>
                        <span
                          className={`text-xs ${
                            isPositive ? "text-[#04FEAE]" : "text-red-500"
                          } flex items-center`}
                        >
                          {isPositive && <ChevronUp className="h-3 w-3" />}
                          {marketCapChange}%
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col mt-2">
                      <span className="text-sm text-[#7A7A7A]">Holdings</span>
                      <span className="text-lg font-semibold">{holders}</span>
                    </div>

                    <div className="flex flex-col mt-2">
                      <span className="text-sm text-[#7A7A7A]">Value in $</span>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-semibold">
                          {followersOnX}
                        </span>
                        <Image
                          src="/exteralLink.png"
                          alt="exteralLink"
                          width={10}
                          height={10}
                          className="h-4 w-4 text-[#7A7A7A]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* component 2 */}
                <div className="relative z-10 hidden md:flex items-center gap-6 text-white rounded-lg mb-[35px]">
                  <div className="flex flex-col mt-2">
                    <span className="text-sm text-[#7A7A7A]">Price</span>
                    <div className="flex items-center gap-2 ">
                      <span className="text-lg font-semibold">
                        {agent.price ? getExactDecimals(agent.price, 3) : 0}
                      </span>
                      <span
                        className={`text-xs ${
                          isPositive ? "text-[#04FEAE]" : "text-red-500"
                        } flex items-center`}
                      >
                        {isPositive && <ChevronUp className="h-3 w-3" />}
                        {marketCapChange}%
                      </span>
                    </div>
                  </div>
                  <div className="w-[2px] h-[90%] bg-white" />
                  <div className="flex flex-col mt-2">
                    <span className="text-sm text-[#7A7A7A]">Holdings</span>
                    <span className="text-lg font-semibold">{holders}</span>
                  </div>
                  <div className="w-[2px] h-[90%]  bg-white" />
                  <div className="flex flex-col mt-2">
                    <span className="text-sm text-[#7A7A7A]">Value in $</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-semibold">
                        {followersOnX}
                      </span>
                      <Image
                        src="/exteralLink.png"
                        alt="exteralLink"
                        width={10}
                        height={10}
                        className="h-4 w-4 text-[#7A7A7A]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SVG filter for rounded corners */}
        <svg className="absolute w-0 h-0">
          <filter id="round">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </svg>
      </div>
      <div className="block md:hidden p-4 text-[#BBBBBB] space-y-2">
        <div className="flex justify-between items-center">
          <span>Token Price</span>
          <span className="text-white">{".03"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Holdings</span>
          <span className="text-white">{"23.4k"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Value in $</span>
          <span className="text-white">{"23.4k"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Market Cap</span>
          <div className="flex items-center">
            <span className="text-white mr-2">{marketCap}</span>
            <span className="text-emerald-400 flex items-center">
              {marketCapChange}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>24h Volume</span>
          <div className="flex items-center">
            <span className="text-white mr-2">{"$120m"}</span>
            <span className="text-emerald-400 flex items-center">
              {"8.62%"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Total Holders</span>
          <span className="text-white">{"77k"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Followers on X</span>
          <span className="text-white">{followersOnX}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Date Created</span>
          <span className="text-white">{"138k"}</span>
        </div>
      </div>
    </div>
  );
}
