"use client";

import { useEffect, useRef, useState } from "react";

export default function VaultBalance() {
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
    <>
      <h2 className="text-lg font-medium mb-4">Vault Balance</h2>

      <div className="flex items-center">
        <div className="relative">
          <canvas ref={canvasRef} className="w-50 h-50" />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-gray-400 text-sm">Balance</div>
            <div className="text-white text-2xl font-bold">723.5k</div>
          </div>
        </div>

        {/* Legend on the right side */}
        <div className="ml-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#d44bff]"></div>
            <span className="text-sm text-gray-300">40% Donation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ffb72b]"></div>
            <span className="text-sm text-gray-300">10% Taxes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6b8aff]"></div>
            <span className="text-sm text-gray-300">50% Airdrop</span>
          </div>
        </div>
      </div>
    </>
  );
}
