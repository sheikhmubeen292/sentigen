"use client";

import Image from "next/image";
import { LineChart, Line } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ArrowUp } from "lucide-react";

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
    image: "/spaceImg1.png",
    data: chartData,
    chartColor: "#00FFAA",
  },
  {
    name: "Nebula",
    symbol: "$NEBL",
    image: "/spaceImg2.png",
    data: chartData,
    chartColor: "#FF5A5A",
  },
  {
    name: "Cosmos",
    symbol: "$COSM",
    image: "/spaceImg3.png",
    data: chartData,
    chartColor: "#5D5FEF",
  },
];

export default function SpaceCardGrid() {
  return (
    <div className="grid span-col full md:grid-cols-3 gap-6 mt-2 mb-10">
      {spaceTokens.map((token, index) => (
        <div key={index} className="relative h-[300px]">
          <Image
            src={token.image || "/placeholder.svg"}
            alt="space"
            width={200}
            height={200}
            className="w-full h-full rounded-lg"
          />

          {/* Shadow overlay at the bottom of the image */}
          <div className="absolute bottom-0 left-0 right-0 h-24  bg-gradient-to-t from-black/80 to-transparent rounded-b-lg" />
          <div className="absolute bottom-0 left-4 right-4">
            <div className="rounded-lg p-3 flex items-center gap-3">
              <Image
                src={"/placeholder.svg"}
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
                <ChartContainer className="h-10 w-10">
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
  );
}
