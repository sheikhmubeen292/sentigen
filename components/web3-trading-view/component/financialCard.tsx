"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUpIcon } from "lucide-react";

export default function FinancialDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;
    const size = 200; // Slightly smaller to fit better with legend
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Center of the circle
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 70;
    const lineWidth = 12;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle (optional - for a subtle background)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Data for the segments
    const segments = [
      { percent: 50, color: "#6b8aff" }, // Blue - Airdrop
      { percent: 40, color: "#d44bff" }, // Purple - Donation
      { percent: 10, color: "#ffb72b" }, // Yellow - Taxes
    ];

    // Draw segments
    let startAngle = -Math.PI / 2; // Start from the top

    segments.forEach((segment) => {
      const endAngle = startAngle + (Math.PI * 2 * segment.percent) / 100;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = segment.color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      startAngle = endAngle;
    });

    // Draw inner circle for the text background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - lineWidth, 0, Math.PI * 2);
    ctx.fillStyle = "#1a1a1a";
    ctx.fill();
  }, [isClient]);
  return (
    <div className="px-4 grid grid-cols-1 md:grid-cols-3 gap-4  mt-4 mb-7  text-white">
      {/* Vault Balance Card */}
      <Card className=" bg-[#181B1C] border-none text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-normal text-gray-400">
            Vault Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <div className="relative">
              <canvas ref={canvasRef} className="w-60 h-60" />

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-gray-400 text-xs">Balance</div>
                <div className="text-white text-sm font-semibold">723.5k</div>
              </div>
            </div>

            {/* Legend on the right side */}
            <div className="ml-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#d44bff]"></div>
                <span className="text-sm text-[#7A7A7A]">40% Donation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ffb72b]"></div>
                <span className="text-sm text-[#7A7A7A]">10% Taxes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6b8aff]"></div>
                <span className="text-sm text-[#7A7A7A]">50% Airdrop</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Airdrops Card */}
      <Card className="bg-[#181B1C] border-none text-white">
        <CardHeader className="pb-2">
          {/* <CardTitle className="text-sm font-normal text-gray-400">
            Airdrops
          </CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="text-[#F2F2F2] text-xs mb-2">
                Total Distributions
              </div>
              <div className="text-[40px] font-semibold text-[#F2F2F2]">
                152k
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-[#F2F2F2]">Distributed 10k</div>
                <div className="text-sm text-[#7A7A7A]">Mar 12, 2025</div>
              </div>
              <Separator className="bg-[#303030]" />

              <div className="flex justify-between items-center">
                <div className="text-sm text-[#F2F2F2]">Distributed 5k</div>
                <div className="text-sm text-[#7A7A7A]">Jan 6, 2025</div>
              </div>
              <Separator className="bg-[#303030]" />

              <div className="flex justify-between items-center">
                <div className="text-sm text-[#F2F2F2]">Distributed 25k</div>
                <div className="text-sm text-[#7A7A7A]">Nov 24, 2024</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Card */}
      <Card className="bg-[#181B1C] border-none text-white">
        <CardHeader className="pb-2">
          {/* <CardTitle className="text-sm font-normal text-gray-400">
            Forecast
          </CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-xl md:text-2xl font-bold font-[#F2F2F2]">
              SNTI could rise 3% to 5% if bullish momentum holds, but a dip of
              2% to 4% is possible if profit-taking kicks in. Stay sharp—things
              are heating up.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[#F2F2F2] mb-2">Current Price</div>
                <div className="text-4xl font-bold text-[#F2F2F2] mb-2">
                  $265k
                </div>
                <div className="text-xs text-green-500 flex items-center">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +60.1% (158.2k)
                </div>
              </div>
              <div>
                <div className="text-xs text-[#F2F2F2] mb-2">
                  {" "}
                  Expected Price (Next 24h)
                </div>
                <div className="text-4xl font-bold text-[#F2F2F2] mb-2">
                  $313k
                </div>
                <div className="text-xs text-green-500 flex items-center">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +80.1% (158.2k)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
