"use client";

import { useEffect, useRef, memo, FC } from "react";
import { useTheme } from "next-themes";

const TradingChart: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const loadWidget = (): void => {
      if (!container.current) return;
      container.current.innerHTML = "";

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;

      const isDark = resolvedTheme === "dark";

      const config = {
        width: "100%",
        height: "100%",
        symbol: "BINANCE:BTCUSDT",
        interval: "1",
        timezone: "Etc/UTC",
        theme: isDark ? "dark" : "light",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        calendar: false,
        hide_volume: false,
        support_host: "https://www.tradingview.com",
        backgroundColor: isDark ? "#181B1C" : "#ffffff",
        gridColor: isDark ? "#303030" : "#e9e9ea",
        hide_side_toolbar: false,
        toolbar_bg: isDark ? "#181B1C" : "#ffffff",
        studies: ["Volume@tv-basicstudies"],
        disabled_features: [
          "header_symbol_search",
          "header_interval_dialog_button",
          "show_interval_dialog_on_key_press",
        ],
      };

      script.innerHTML = JSON.stringify(config);
      container.current.appendChild(script);
    };

    loadWidget();

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [resolvedTheme]); // Re-run when theme changes

  return (
    <div className="h-full">
      <div
        className="tradingview-widget-container h-full rounded-3xl"
        ref={container}
      >
        <div id="tradingview_chart" className="h-full rounded-3xl" />
      </div>
    </div>
  );
};

export default memo(TradingChart);
