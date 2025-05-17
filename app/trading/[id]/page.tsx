"use client";
import { useEffect, useState } from "react";
import Web3Trading from "@/components/web3-trading-view/swap-view";
import { ProfileParams } from "@/types/general.types";
import CultureLanding from "@/components/culturelanding/page";
import ChatBox from "@/components/chatBox";
import ToggleButtons from "@/components/toggleButton";
import Footer from "@/components/footer";
import pageData from "@/lib/content.json";
import { EditorSidebar } from "@/components/editor-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import Navbar from "@/components/navbar";
import HeroSectionText from "@/components/web3-trading-view/component/heroSectionText";
// Import removed since we're not using it (local function shadows it)
import { serverUrl } from "@/utils/constant";
import axios from "axios";

export default function DetailPage({ params }: { params: ProfileParams }) {
  const { id } = params;

  const [selected, setSelected] = useState<string>("research");
  const [previousPage, setPreviousPage] = useState<string>("research");
  const [content, setContent] = useState<any>(pageData);
  const [selectedElement, setSelectedElement] = useState<{
    id: string;
    type: "text" | "image";
    section: string;
  } | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleToggle = (newSelection: string) => {
    if (newSelection === "starred") {
      setSelected("starred");
    } else {
      setPreviousPage(newSelection);
      setSelected(newSelection);
    }
  };

  const handleElementClick = (
    id: string,
    type: "text" | "image",
    section: string
  ) => {
    setSelectedElement({ id, type, section });
    setSidebarOpen(true);
  };

  // This would be in your parent component that manages the content state
  const handleContentUpdate = (sectionId: any, elementId: any, value: any) => {
    const updatedContent = { ...content };
    const sectionIndex = updatedContent.sections.findIndex(
      (s: any) => s.id === sectionId
    );

    if (sectionIndex !== -1) {
      const elementIndex = updatedContent.sections[
        sectionIndex
      ].elements.findIndex((e: any) => e.id === elementId);

      if (elementIndex !== -1) {
        const element =
          updatedContent.sections[sectionIndex].elements[elementIndex];

        if (typeof value === "string") {
          updatedContent.sections[sectionIndex].elements[elementIndex].content =
            value;
        } else {
          if (elementId === "boys2-image") {
            updatedContent.sections[sectionIndex].elements[elementIndex] = {
              ...element,
              src: value.src,
              alt: value.alt,
              text: value.text,
            };
          } else {
            updatedContent.sections[sectionIndex].elements[elementIndex] = {
              ...element,
              src: value.src,
              alt: value.alt,
            };
          }
        }

        setContent(updatedContent);

        // saveContentToBackend(updatedContent);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSelectedElement(null);
  };

  // Fetch coin details function
  const getCoinDetails = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/coin_detail/data/${id}`);

      if (response.data && response.data.data) {
        setCoinData(response.data.data);
      } else {
        console.error("Invalid response structure:", response.data);
      }
    } catch (err) {
      console.error("Error fetching coin details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoinDetails();
  }, [id]);

  console.log("Coin Data:", coinData);
  return (
    <div className="h-screen bg-[#0d0d0d] text-[#f2f2f2] relative flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div
          className={`${
            selected === "starred" ? "md:col-span-4" : "md:col-span-5"
          }`}
        >
          <Navbar />
          <div className="relative flex-grow">
            {(selected === "research" || previousPage === "research") && (
              <>
                <Web3Trading id={id} />
              </>
            )}
            {(selected === "story" || previousPage === "story") && (
              <>
                <HeroSectionText data={coinData} tokenMint={id} />
                <CultureLanding
                  content={content}
                  onElementClick={handleElementClick}
                  tokenMint={id}
                  data={coinData}
                />
              </>
            )}
          </div>
        </div>

        {selected === "starred" && !isMobile && (
          <div>
            <ChatBox />
          </div>
        )}
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
      </div>

      <div className="block fixed z-40 bottom-7 left-1/2 transform -translate-x-1/2">
        <ToggleButtons selected={selected} setSelected={handleToggle} />
      </div>
      <Footer />
      <EditorSidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        selectedElement={selectedElement}
        content={content}
        onContentUpdate={handleContentUpdate}
      />
    </div>
  );
}
