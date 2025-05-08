"use client";
import ChatBox from "@/components/chatBox";
import Footer from "@/components/footer";
import HeroSection from "@/components/main-home/heroSection";
import CryptoTable from "@/components/main-home/tokenTable";
import WebHome from "@/components/main-home/web2Home";
import Navbar from "@/components/navbar";
import ToggleButtons from "@/components/toggleButton";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ITokenDetail } from "@/types/contract.types";
import { serverUrl } from "@/utils/constant";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<string>("research");
  const [previousPage, setPreviousPage] = useState<string>("research");
  const [tokensData, setTokensData] = useState<ITokenDetail[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleToggle = (newSelection: string) => {
    if (newSelection === "starred") {
      setSelected("starred");
    } else {
      setPreviousPage(newSelection);
      setSelected(newSelection);
    }
  };

  const fetchTokenList = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/coin?page=${1}&limit=12&search=${""}&sort=${"createdAt"}&order=${"desc"}`
      );

      console.log(data, "datadatadatadata");
      setTokensData(data?.data);
      setPageCount(data?.totalPages);
      // if (data?.kingOfTheHell) {
      //   setKingHillData(data?.kingOfTheHell);
      // }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTokenList();
  }, [fetchTokenList]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="h-screen bg-[#0d0d0d] text-[#f2f2f2] relative flex flex-col">
      <>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div
            className={`${
              selected === "starred" ? "md:col-span-4" : "md:col-span-5"
            }`}
          >
            <Navbar />
            <div className="relative flex-grow">
              <>
                {(selected === "research" || previousPage === "research") && (
                  <>
                    <HeroSection />
                    <CryptoTable tokensData={tokensData} />
                  </>
                )}
                {(selected === "story" || previousPage === "story") && (
                  <div>
                    <HeroSection />
                    <WebHome />
                  </div>
                )}
              </>
            </div>
            <Footer />
          </div>

          {selected === "starred" && !isMobile && (
            <div>
              <ChatBox />
            </div>
          )}
        </div>
        {selected === "starred" && isMobile && (
          <Sheet open={true}>
            <SheetContent
              side="bottom"
              className="h-[80%] bg-transparent max-w-full w-full p-0 [&>button:first-of-type]:hidden pointer-events-auto flex items-end justify-center"
            >
              <div className="flex flex-col items-center relative w-full h-full m-2 rounded-2xl overflow-hidden bg-[#1F2122] shadow-lg">
                <div className="flex-1 overflow-y-auto mb-[70px]">
                  <ChatBox />
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
                  <ToggleButtons
                    selected={selected}
                    setSelected={handleToggle}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </>

      <div className="fixed bottom-7 left-1/2 transform -translate-x-1/2   pointer-events-auto ">
        <ToggleButtons selected={selected} setSelected={handleToggle} />
      </div>
    </div>
  );
}
