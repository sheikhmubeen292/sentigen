"use client";

import type React from "react";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  ColorType,
} from "lightweight-charts";
import { serverUrl, socket } from "@/utils/constant";
import { Button } from "@/components/ui/button";

type Props = {
  tokenSymbol: string;
  coinId: string;
};

type Bar = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

const TradingViewChart = ({ coinId, tokenSymbol }: Props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [timeFrame, setTimeFrame] = useState<string>("5");

  const fetchChartData = useCallback(
    async (resolution: string) => {
      try {
        const response = await fetch(
          `${serverUrl}/chart/sol-chart?poolAddress=${coinId}&resolution=${resolution}`
        );
        const data = await response.json();

        // console.log(data.data, "data.data");
        if (data.data) {
          const bars = data.data;
          return bars.map((bar: Bar) => ({
            time: Math.floor(new Date(bar.time).getTime() / 1000),
            open: bar.open,
            high: bar.high,
            low: bar.low,
            close: bar.close,
            volume: bar.volume,
          }));
        } else {
          return [];
        }
      } catch (error) {
        console.log("Error while fetching", error);
        return [];
      }
    },
    [coinId]
  );

  const initializeChart = useCallback(async () => {
    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          textColor: "white",
          background: { type: ColorType.Solid, color: "black" },
          fontSize: 12,
        },
        grid: { horzLines: { visible: false }, vertLines: { visible: false } },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        crosshair: {
          vertLine: { visible: false, labelVisible: true },
          horzLine: { visible: false, labelVisible: true },
        },
        watermark: { color: "rgba(0, 0, 0, 0)" },
        timeScale: { rightOffset: 15 },
      });

      candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickVisible: true,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
        priceFormat: {
          type: "custom",
          formatter: (price: number) => price.toFixed(10),
        },
      });

      const data = await fetchChartData(timeFrame);
      candlestickSeriesRef.current.setData(data);
      chartRef.current.timeScale().fitContent();
    }
  }, [fetchChartData, timeFrame]);

  useEffect(() => {
    initializeChart();

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [initializeChart]);

  const updateChart = useCallback(
    async (newTimeFrame: string) => {
      if (candlestickSeriesRef.current) {
        const data = await fetchChartData(newTimeFrame);
        candlestickSeriesRef.current.setData(data);
        chartRef.current?.timeScale().fitContent();
      }
    },
    [fetchChartData]
  );

  const handleTimeFrameChange = useCallback(
    (value: string) => {
      setTimeFrame(value);
      updateChart(value);
    },
    [updateChart]
  );

  // Check for mobile view
  //   useEffect(() => {
  //     const checkIfMobile = () => {
  //       setIsMobile(window.innerWidth <= 650);
  //     };

  //     checkIfMobile();
  //     window.addEventListener("resize", checkIfMobile);

  //     return () => {
  //       window.removeEventListener("resize", checkIfMobile);
  //     };
  //   }, []);

  useEffect(() => {
    socket.on("sol_bars_updated", async (data) => {
      if (data?.tokenMint === coinId) {
        await updateChart(timeFrame);
      }
    });

    return () => {
      socket.off("sol_bars_updated");
    };
  }, []);

  return (
    <div className="mt-1 h-full bg-gradient-to-r from-[#181B1C] to-[#181B1C]  rounded-lg ">
      <div className="flex items-center p-2 border-b border-[#363c4e]">
        <div className="flex items-center space-x-2">
          <Button
            variant={timeFrame === "1" ? "default" : "ghost"}
            size="sm"
            className={
              timeFrame === "1"
                ? "bg-green-700 text-white"
                : "text-gray-400 hover:text-white"
            }
            onClick={() => handleTimeFrameChange("1")}
          >
            1m
          </Button>
          <Button
            variant={timeFrame === "5" ? "default" : "ghost"}
            size="sm"
            className={
              timeFrame === "5"
                ? "bg-green-700 text-white"
                : "text-gray-400 hover:text-white"
            }
            onClick={() => handleTimeFrameChange("5")}
          >
            5m
          </Button>
        </div>
        <div className="ml-4 ">{tokenSymbol}/USD</div>
      </div>
      <div
        ref={chartContainerRef}
        className="relative w-full h-[520px] overflow-hidden rounded-lg mb-5 cursor-crosshair"
      >
        <div id="custom-tooltip" className="custom-tooltip"></div>
      </div>
    </div>
  );
};

export default TradingViewChart;
