"use client";

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SentiLogoEdit from "@/components/culturelanding/component/edit-dailog/senti-log-edit";

interface CryptoAssetCardProps {
  assetName: string;
  userName: string;
  marketCap: string;
  marketCapChange: number;
  holders: string;
  followers: string;
  open: any;
  setOpen: any;
  sentiImg: any;
  setSentiImg: any;
  isEdit: boolean;
  tokenMint: any;
}

export default function CryptoAssetCard({
  assetName = "snti247",
  userName = "Ryan",
  marketCap = "$120m",
  marketCapChange = 8.65,
  holders = "77k",
  followers = "138k",
  setOpen,
  open,
  sentiImg,
  setSentiImg,
  isEdit,
  tokenMint,
}: CryptoAssetCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div
        className="w-full my-3  rounded-lg"
        style={{
          background: "rgba(13, 13, 13, 0.50)",
          backdropFilter: "blur(4px)",
        }}
      >
        {" "}
        {/* Mobile View */}
        <div className="px-4 md:hidden  rounded-lg py-4 text-white mt-3">
          {/* Header section with logo and welcome message */}
          <div
            className="flex mb-6"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className="relative flex items-center">
              <div className="mr-3">
                <Image
                  src="/snti.png"
                  alt="Sentigen Logo"
                  width={120}
                  height={150}
                  className="object-contain"
                />
              </div>
              {/* <span className="font-bold text-lg">snti247</span> */}
            </div>
            {hover && isEdit && (
              <span
                onClick={() => setOpen(true)}
                className=" p-1 rounded-full cursor-pointer z-10   transition-all duration-200"
              >
                <div className="flex items-center gap-3 border rounded-lg border-[#293032] bg-[#141819] p-2">
                  <Image
                    src="/pancil.png"
                    alt="edit-icon"
                    width={10}
                    height={10}
                    className="w-5 h-5"
                    onClick={() => setOpen(true)}
                  />
                  <Image
                    src="/ai-icon.png"
                    alt="ai-icon"
                    width={10}
                    height={10}
                    className="w-5 h-5"
                  />
                </div>
              </span>
            )}

            {/* Vertical divider */}
            <div className="mx-3 w-px h-10 bg-[#2A2B2D]"></div>

            <div className="flex-1">
              <p className="text-sm text-gray-300">
                Welcome to SNTI, {userName}. Your signal is connected...
              </p>
            </div>
          </div>

          {/* Stats section with dividers */}
          <div className="grid grid-cols-3 gap-0 mb-6">
            {/* Market Cap */}
            <div className="relative flex flex-col items-center">
              <p className="text-xs text-[#7A7A7A]">Market Cap</p>
              <div className="flex items-center">
                <p className="font-bold text-sm">{marketCap}</p>
                <span
                  className={`text-xs ml-1 ${
                    marketCapChange >= 0 ? "text-[#10B981]" : "text-[#EF4444]"
                  }`}
                >
                  {marketCapChange >= 0 ? "+" : ""}
                  {marketCapChange}%
                </span>
              </div>

              {/* Vertical divider */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-[#2A2B2D]"></div>
            </div>

            {/* Holders */}
            <div className="relative flex flex-col items-center">
              <p className="text-xs text-[#7A7A7A]">Holders</p>
              <p className="font-bold text-sm">{holders}</p>

              {/* Vertical divider */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-[#2A2B2D]"></div>
            </div>

            {/* Followers */}
            <div className="flex flex-col items-center">
              <p className="text-xs  text-[#7A7A7A]">Followers on X</p>
              <div className="flex items-center">
                <p className="font-bold text-sm">{followers}</p>
                <ExternalLink size={12} className="text-gray-400 ml-1" />
              </div>
            </div>
          </div>

          {/* Invest button */}
          <Button className="w-full bg-white hover:bg-gray-200 text-black font-medium">
            Invest
          </Button>
        </div>
        {/* Desktop View */}
        <div className="px-4 hidden md:flex items-center justify-between  rounded-lg px-0 py-4 text-white relative w-full">
          {/* Asset Info Section */}
          <div
            className="flex items-center space-x-3 pr-6 relative group w-auto"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className="relative flex items-center">
              <Image
                src={sentiImg || "/snti.png"}
                alt="Sentigen Logo"
                width={202}
                height={200}
                className="w-[200px] h-[60px] cursor-pointer"
              />
            </div>
            {hover && isEdit && (
              <span
                onClick={() => setOpen(true)}
                className=" p-1 rounded-full cursor-pointer z-10   transition-all duration-200"
              >
                <div className="flex items-center gap-3 border rounded-lg border-[#293032] bg-[#141819] p-2">
                  <Image
                    src="/pancil.png"
                    alt="edit-icon"
                    width={10}
                    height={10}
                    className="w-5 h-5"
                    onClick={() => setOpen(true)}
                  />
                  <Image
                    src="/ai-icon.png"
                    alt="ai-icon"
                    width={10}
                    height={10}
                    className="w-5 h-5"
                  />
                </div>
              </span>
            )}

            {/* Vertical divider */}
            <div className="w-[1px] h-10 bg-[#2A2B2D]"></div>

            <p className="text-sm text-white">
              Welcome to SNTI, {userName}. Your signal is connected...
            </p>
          </div>

          <div className="flex items-center">
            {/* Market Cap Section */}
            <div className="px-6 relative">
              <p className="text-sm text-[#7A7A7A]">Market Cap</p>
              <div className="flex items-center">
                <p className="font-bold mr-2">{marketCap}</p>
                <span
                  className={`text-xs ${
                    marketCapChange >= 0 ? "text-[#10B981]" : "text-[#EF4444]"
                  }`}
                >
                  {marketCapChange >= 0 ? "+" : ""}
                  {marketCapChange}%
                </span>
              </div>

              {/* Vertical divider after market cap */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-[#2A2B2D]"></div>
            </div>

            {/* Holders Section */}
            <div className="px-6 relative">
              <p className="text-sm text-[#7A7A7A]">Holders</p>
              <p className="font-bold">{holders}</p>

              {/* Vertical divider after holders */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-[#2A2B2D]"></div>
            </div>

            {/* Followers Section */}
            <div className="px-6 relative">
              <p className="text-sm text-[#7A7A7A]">Followers on X</p>
              <div className="flex items-center">
                <p className="font-bold mr-2">{followers}</p>
                <ExternalLink size={14} className="text-gray-400" />
              </div>

              {/* Vertical divider after followers */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-[#2A2B2D]"></div>
            </div>

            {/* Invest Button */}
            <div className="pl-6">
              <Button className="bg-white  text-black px-6">Invest</Button>
            </div>
          </div>
        </div>
      </div>
      <SentiLogoEdit
        open={open}
        setOpen={setOpen}
        setImg={setSentiImg}
        img={sentiImg}
        tokenMint={tokenMint}
      />
    </>
  );
}
