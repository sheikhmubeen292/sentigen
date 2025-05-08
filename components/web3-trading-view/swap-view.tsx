"use client";

import OrderBook from "./component/order-book";
import SocialSection from "./component/social-section";
import Swap from "./component/swap";
import CryptoAssetCard from "./component/sntiBar";
import MetricCards from "./component/matricCard";
import FinancialDashboard from "./component/financialCard";
import SocialTelegram from "./component/social-Telegram";
import { ITokenDetail } from "@/types/contract.types";
import { useCallback, useEffect, useState } from "react";
import { basicTokenData } from "@/utils/token";
import { ProfileParams } from "@/types/general.types";
import axios from "axios";
import { serverUrl, socket } from "@/utils/constant";
import { useWallet } from "@solana/wallet-adapter-react";
import TradingViewChart from "./component/Chart";
import { TrxHistory } from "@/types/tx.types";

export const formatNumberShort = (num: number): string => {
  if (isNaN(num) || num === null || num === undefined) return "0";

  const absNum = Math.abs(num);

  if (absNum >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
  } else if (absNum >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  } else if (absNum >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.00$/, "") + "K";
  } else {
    return num.toFixed(2).replace(/\.00$/, "");
  }
};

export default function Web3Trading({ id }: ProfileParams) {
  const { publicKey } = useWallet();

  const [tokenData, setTokenData] = useState<ITokenDetail>(basicTokenData);
  const [trxHistory, setTrxHistory] = useState<TrxHistory[]>([]);
  const [metrics, setMetrics] = useState({
    buyAmount: 0,
    sellAmount: 0,
    buyVolume: 0,
    sellVolume: 0,
    buyHolders: 0,
    sellHolders: 0,
    totalHolders: 0,
  });

  const fetchTokenDetails = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/coin/${id}/${publicKey ? publicKey.toString() : "null"}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );

      setTrxHistory(data?.data?.transactions);
      setTokenData(data?.data?.coin);
      setMetrics(data?.data?.metrics);
    } catch (e) {
      console.log(e);
    }
  }, [id, publicKey]);

  useEffect(() => {
    if (!id) return;
    fetchTokenDetails();
  }, [id, fetchTokenDetails]);

  useEffect(() => {
    socket.on("token-trade", (data) => {
      if (data?.coin?.tokenMint === id) {
        setTrxHistory((prev) => [data?.transaction, ...prev]);
      }
    });

    return () => {
      socket.off("token-trade");
    };
  }, []);

  return (
    <div className="bg-[#0d0d0d] relative overflow-visible max-w-[1920px] mx-auto">
      <section className="px-4 pt-[40px] pb-5  mb-4">
        <h1 className="text-4xl md:text-7xl font-medium text-white max-w-full md:max-w-[60%] leading-[120%]">
          Premium streetwear for the digitally evolved
        </h1>
      </section>

      <div className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-2 bg-[#181B1C] rounded-3xl">
          {/* Trading Chart - 2 columns */}
          <div className="lg:col-span-2 bg-[#181B1C] rounded-lg ">
            <TradingViewChart tokenSymbol={tokenData?.ticker} coinId={id} />
          </div>

          {/* Swap */}
          <Swap tokenData={tokenData} metrics={metrics} />
        </div>
      </div>

      {/* SNTI Info Bar */}
      <div className="sticky top-0 z-30 ">
        <CryptoAssetCard
          assetName="snti247"
          userName="Ryan"
          marketCap="$120m"
          marketCapChange={8.65}
          holders="77k"
          followers="138k"
          isEdit={false}
        />
      </div>

      {/* Stats Grid */}
      <div className="px-4">
        <MetricCards metrics={metrics} />
      </div>

      {/* Bottom Sections */}
      <FinancialDashboard />

      {/* Order Book */}

      <OrderBook trxHistory={trxHistory} tokenData={tokenData} />
      {/* Social Sections */}
      <SocialSection />
      <SocialTelegram />
    </div>
  );
}
