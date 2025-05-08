"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Metrics } from "@/types/contract.types";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { formatNumberShort } from "../swap-view";

interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  sparklineData: number[];
  comparisonText: string;
}

export default function MetricCards({
  metrics: metricsValues,
}: {
  metrics: Metrics;
}) {
  const metrics: MetricCardProps[] = [
    {
      title: "24h Volume",
      value: formatNumberShort(
        metricsValues?.buyVolume + metricsValues?.sellVolume
      ),
      change: {
        value: "+$500k",
        percentage: "(158.2%)",
        isPositive: true,
      },
      sparklineData: [5, 10, 5, 20, 8, 15, 5, 10, 25, 12, 18, 20],
      comparisonText: "+161.4% volume vs projects with a similar MC",
    },
    {
      title: "Holders",
      value: formatNumberShort(metricsValues?.totalHolders),
      change: {
        value: "+531",
        percentage: "(161.4%)",
        isPositive: true,
      },
      sparklineData: [8, 12, 5, 15, 10, 8, 15, 20, 12, 18, 15, 22],
      comparisonText: "+161.4% volume vs projects with a similar MC",
    },
    {
      title: "Engagement",
      value: "23k",
      change: {
        value: "+12k",
        percentage: "(158.2%)",
        isPositive: true,
      },
      sparklineData: [10, 15, 7, 20, 12, 18, 15, 8, 23, 15, 20, 25],
      comparisonText: "+161.4% volume vs projects with a similar MC",
    },
    {
      title: "Impressions",
      value: "120k",
      change: {
        value: "+80k",
        percentage: "(158.2%)",
        isPositive: true,
      },
      sparklineData: [12, 18, 15, 22, 10, 15, 8, 20, 15, 25, 18, 22],
      comparisonText: "+161.4% volume vs projects with a similar MC",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  sparklineData,
  comparisonText,
}: MetricCardProps) {
  const chartData = sparklineData.map((value, index) => ({ value }));

  return (
    <Card className=" bg-[#181B1C]  rounded-[16px] w-full sm:w-1/2 lg:w-[22%] min-w-[330px] flex-grow mb-2">
      <CardContent className="py-4 px-6 flex justify-between  items-center">
        <div className="h-[125px]  flex flex-col justify-between">
          <div className="text-xs text-[#F2F2F2] mt-[20px]">{title}</div>

          <div className="flex justify-between items-start mt-3">
            <div className="text-4xl font-semibold text-[#F2F2F2]">{value}</div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center text-sm">
              <span className="text-emerald-500 font-medium">
                {change.value} {change.percentage}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[188px]   ">
          <div className="h-24 min-w-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="md:flex hidden text-sm text-white">
            {comparisonText}
          </div>
        </div>
      </CardContent>
      <div className="px-5 pb-4 mt-[-12px]">
        <div className="flex md:hidden text-sm text-white">
          {comparisonText}
        </div>
      </div>
    </Card>
  );
}
