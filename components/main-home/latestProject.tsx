"use client";

import Image from "next/image";
import { LineChart, Line } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for the charts
const chartData = [
  { value: 40 },
  { value: 30 },
  { value: 45 },
  { value: 25 },
  { value: 60 },
  { value: 75 },
  { value: 55 },
];

// Sample space tokens data
const spaceTokens = [
  {
    name: "Skayet",
    symbol: "$SKAY",
    image: "/latestImg1.png",
    data: chartData,
    chartColor: "#00FFAA",
  },
  {
    name: "Nebula",
    symbol: "$NEBL",
    image: "/latestImg2.png",
    data: chartData,
    chartColor: "#FF5A5A",
  },
  {
    name: "Cosmos",
    symbol: "$COSM",
    image: "/latestImg3.png",
    data: chartData,
    chartColor: "#5D5FEF",
  },
];

export default function LatestProject() {
  return (
    <>
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        .latest-project-bg {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="grid span-col full md:grid-cols-4 gap-5 my-10">
        <div className="relative w-full min-h-[170px] md:min-h-[200px]">
          <h3 className="absolute left-2 top-0 text-sm font-normal text-[#F2F2F2]">
            Latest Projects
          </h3>
          <div
            className="absolute w-full h-full left-0 top-0 bottom-1"
            style={{
              filter: "url(#latest-project-round)",
              colorRendering: "optimizeQuality",
            }}
          >
            <div
              className={cn(
                "absolute w-full h-full latest-project-bg",
                "[clip-path:polygon(35%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_14%,_35%_14%)]",
                "md:[clip-path:polygon(35%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_9%,_35%_9%)]"
              )}
              style={{
                backgroundColor: "#181b1c",
                background: "#181b1c !important",
                transition: "none",
              }}
            >
              <div className="mt-[10px] p-4 latest-project-bg">
                <p className="mt-7 text-white text-xl md:text-xl text-2xl w-full md:w-[83%]">
                  Check out these curated recommendation right now that you
                  might be interested.
                </p>
              </div>
            </div>
          </div>
          {/* SVG filter for rounded corners */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter
                id="latest-project-round"
                colorInterpolationFilters="sRGB"
              >
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
          <div key={index} className="relative h-[280px]">
            <Image
              src={token.image || "/placeholder.svg"}
              alt="space"
              width={200}
              height={200}
              className="w-full h-full rounded-lg"
            />

            {/* Shadow overlay at the bottom of the image */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg" />
            <div className="absolute bottom-0 left-4 right-4">
              <div className="rounded-lg p-3 flex items-center gap-3">
                <Image
                  src={token.image || "/placeholder.svg"}
                  alt="space"
                  width={50}
                  height={50}
                  className="w-14 h-14 rounded-full"
                />
                <span className="flex-1">
                  <p className="font-semibold text-[20px] text-[#F2F2F2]">
                    {token.name}
                  </p>
                  <p className="text-sm bg-gradient-to-r from-[#00A3FF] to-[#00FF94] text-transparent bg-clip-text">
                    {token.symbol}
                  </p>
                </span>
                <div className="w-[100px] flex items-center gap-4">
                  <span className="flex-1">
                    <p className="text-sm font-semibold text-[#F2F2F2]">2.3m</p>
                    <p className="flex items-center text-xs mt-1 bg-gradient-to-r from-[#00A3FF] to-[#00FF94] text-transparent bg-clip-text">
                      <ArrowUp color="#00A3FF" size={18} />
                      19.52%
                    </p>
                  </span>
                  <ChartContainer className="h-10 w-10" config={{}}>
                    <LineChart data={token.data}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={token.chartColor}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
