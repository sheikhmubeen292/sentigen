import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { LineChart, Line, ResponsiveContainer } from "recharts";

type MetricCardProps = {
  title: string;
  value: string;
  change: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  sparklineData: number[];

  comparisonText: string;
};

const metrics: MetricCardProps[] = [
  {
    title: "24h Volume",
    value: "2m",
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
    value: "23k",
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

const MetricCard = ({
  title,
  value,
  change,
  comparisonText,
  sparklineData,
}: MetricCardProps) => {
  const chartData = sparklineData.map((value, index) => ({ value }));

  return (
    <Card className="bg-[#181B1C] w-full  border-none rounded-[16px] items-center flex justify-between">
      <CardContent className="p-6 ">
        <div className="flex items-center justify-between w-full">
          <div className="">
            <h3 className="text-xs text-[#F2F2F2] mb-3">{title}</h3>
            <p className="text-[#F2F2F2] text-3xl font-semibold mb-2">
              {value}
            </p>
            <p className="text-xs text-[#17C671]">
              {change.value} {change.percentage}
            </p>
          </div>
          <div className="h-14 w-20">
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
        </div>
        <p className="text-white text-sm mt-3">{comparisonText}</p>
      </CardContent>
    </Card>
  );
};

export default function SocialSection() {
  return (
    <div className="px-4 w-full mt-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* First column (Wider) */}
        <Card className="col-span-1 sm:col-span-2 bg-[#181B1C] rounded-[16px] p-4">
          <CardContent className="mt-2 p-0 px-2">
            <Image
              src="/twitter.png"
              alt="twitter Image"
              width={20}
              height={20}
              className="mb-2"
            />
            <h2 className="text-white text-lg font-semibold">What's On X</h2>
            <p className="text-gray-400 mt-2 text-sm">
              Now blowing up on X, super{" "}
              <span className="text-green-400 font-medium">bullish vibes!</span>{" "}
              Might be a good time to see what's driving the hype.
            </p>
            <a
              href="#"
              className="text-[#F2F2F2] flex items-center gap-1 mt-3 text-sm underline"
            >
              Check X Account{" "}
              <ExternalLink className="w-4 h-4 ml-1 text-[#7A7A7A]" />
            </a>
          </CardContent>
        </Card>

        {/* Metric Cards */}
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
}
