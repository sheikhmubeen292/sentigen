"use client";

import type { PageContent } from "@/types/page-content";
import Image from "next/image";

import VisionEdit from "./edit-dailog/vision-edit";
import { useState } from "react";
import { Pencil } from "lucide-react";
import NewsText from "./edit-dailog/new-edit";
import { cn } from "@/lib/utils";

interface EditableLandingPageProps {
  content: PageContent;
  onElementClick: (id: string, type: "text" | "image", section: string) => void;
}
const dummyText =
  "Our world is constantly shifting between physical and digital, creating noise that drowns out what matters. That's where SNTI comes in. We're premium streetwear designed for those seeking clarity in chaos, connecting individuals who understand that style isn't just what you wear—it's how you process and transmit your unique signal.";

export default function Vision({
  content,
  onElementClick,
}: EditableLandingPageProps) {
  const [open, setOpen] = useState(false);

  const [vision, setVision] = useState({
    text: dummyText,
    img: "/visionBg.png",
  });
  const [text, setText] = useState(
    "There's a lot happening right now, and I've got the latest for you. From fresh insights to key moments, take a look when you're ready."
  );
  const [openNew, setOpenNews] = useState(false);
  const visionSection = content.sections[1];
  const visionElement = visionSection.elements[3];
  if (!visionElement || visionElement.type !== "text") return null;

  const visionBgSection = content.sections[1];
  const visionElementBg = visionBgSection?.elements?.[4];

  if (!visionElementBg || visionElementBg.type !== "image") return null;
  return (
    <>
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        * {
          --vision-bg: #181b1c !important;
        }
        .bg-\\[\\#181B1C\\] {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="bg-[#0d0d0d] px-4">
        <div className="relative group w-full min-h-[500px] py-6 mt-10">
          <h3 className="absolute left-4 top-0 text-sm font-normal text-[#F2F2F2]">
            Vision
          </h3>
          <div
            className="absolute w-full h-full left-0 top-0"
            style={{ filter: "url(#vision-round)" }}
          >
            <div
              className={cn(
                "absolute w-full h-full",
                "[clip-path:polygon(21%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_6%,_21%_6%)]",
                "md:[clip-path:polygon(5%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_5%,_5%_5%)]"
              )}
              style={{
                backgroundColor: "#181b1c",
                background: "#181b1c !important",
              }}
            >
              <div
                className="h-full flex items-center flex-col justify-center text-white text-base md:text-2xl px-4"
                style={{
                  backgroundImage: `url(${vision.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                  <div className="flex items-center gap-3 border rounded-lg border-[#293032] bg-[#141819] p-2 ">
                    <Image
                      src="/pancil.png"
                      alt="ai-icon"
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
                <p className="w-full md:w-[50%] text-center">{vision.text}</p>
                <div className="hidden md:flex gap-2 mt-4">
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white w-4 h-4"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white w-4 h-4"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* SVG filter for rounded corners */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="vision-round" colorInterpolationFilters="sRGB">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="5"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="relative group">
          <p className="mt-10 text-white text-2xl md:text-4xl text-4xl w-full md:w-[60%] font-bold">
            {text}
          </p>

          <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
            <div className="flex items-center gap-3 border rounded-lg border-[#293032] bg-[#141819] p-2 ">
              <Image
                src="/pancil.png"
                alt="ai-icon"
                width={10}
                height={10}
                className="w-5 h-5"
                onClick={() => setOpenNews(true)}
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
        </div>

        {/* Investment Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <div className="relative w-full min-h-[370px] md:min-h-[300px]">
            <h3 className="absolute left-4 top-1 text-sm font-normal text-[#F2F2F2]">
              Investment Highlights
            </h3>
            <div
              className="absolute w-full h-full left-0 top-0 rounded-xl"
              style={{ filter: "url(#investment-round)" }}
            >
              <div
                className={cn(
                  "absolute w-full h-full",
                  "[clip-path:polygon(49%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_8%,_49%_8%)]",
                  "md:[clip-path:polygon(23%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_9%,_23%_9%)]"
                )}
                style={{
                  backgroundColor: "#181b1c",
                  background: "#181b1c !important",
                }}
              >
                <div className="h-full mt-12 md:mt-14 p-4">
                  <div className="flex flex-col items-center justify-between space-y-9">
                    <p className="text-white text-sm">
                      SNTI is more than just streetwear—it's a statement. It
                      blends style with meaning, cutting through the noise and
                      connecting with a community that values authenticity.
                      Investors see its ability to merge premium streetwear with
                      a deeper message, giving it staying power and real growth
                      potential.
                    </p>
                    <p className="text-white text-sm">
                      Big names are noticing too. James Barr called it "a fresh
                      take on streetwear with real meaning," while Cole Nicolson
                      said, "SNTI isn't just about fashion—it's about making a
                      statement." Even Andrew Ben mentioned, "This brand is
                      tapping into something deeper—it's style with purpose."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* SVG filter for rounded corners */}
            <svg className="absolute w-0 h-0">
              <defs>
                <filter id="investment-round" colorInterpolationFilters="sRGB">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="5"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 19 -9"
                    result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>

          {/* Sentiment Pulse */}
          <div className="relative w-full h-full min-h-[480px] md:min-h-[300px]">
            <h3 className="absolute left-4 top-[1px] text-sm font-normal text-[#F2F2F2]">
              Sentiment Pulse
            </h3>
            <div
              className="absolute w-full h-full left-0 top-0 rounded-xl"
              style={{ filter: "url(#sentiment-round)" }}
            >
              <div
                className={cn(
                  "absolute w-full h-full",
                  "[clip-path:polygon(43%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_6%,_43%_6%)]",
                  "md:[clip-path:polygon(18%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_8%,_18%_8%)]"
                )}
                style={{
                  backgroundColor: "#181b1c",
                  background: "#181b1c !important",
                }}
              >
                <div className="h-full mt-9 px-8 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Twitter/X Section */}
                    <div>
                      {/* Header */}
                      <Image
                        src="/twitter.png"
                        alt="twitter"
                        width={27}
                        height={27}
                      />

                      {/* Title & Description */}
                      <h3 className="text-base mt-2">What's On X</h3>
                      <p className="text-sm text-[#BBBBBB] mt-1">
                        Now blowing up on X right, super bullish vibes! Might be
                        a good time to see what's driving the hype.
                      </p>

                      {/* Sentiment Stats */}
                      <div className="flex items-center justify-between mt-4 text-sm">
                        <div className="text-left">
                          <p className="font-semibold">54.27%</p>
                          <p className="text-[#7A7A7A] text-xs">Bullish</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">44.02%</p>
                          <p className="text-[#7A7A7A] text-xs">Neutral</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">1.71%</p>
                          <p className="text-[#7A7A7A] text-xs">Bearish</p>
                        </div>
                      </div>

                      {/* Sentiment Bar */}
                      <div className="w-full h-1 rounded-full mt-3 flex gap-2">
                        <div
                          className="bg-[#17C671] h-2 rounded-2xl"
                          style={{ width: "54.27%" }}
                        ></div>
                        <div
                          className="bg-[#1346FF] h-2 rounded-2xl"
                          style={{ width: "44.02%" }}
                        ></div>
                        <div
                          className="bg-[#CC434B] h-2 rounded-2xl"
                          style={{ width: "1.71%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Telegram Section */}
                    <div>
                      {/* Header */}
                      <Image
                        src="/telegram.png"
                        alt="telegram"
                        width={27}
                        height={27}
                      />

                      {/* Title & Description */}
                      <h3 className="text-base mt-2">What's On Telegram</h3>
                      <p className="text-sm text-[#BBBBBB] mt-1">
                        Now blowing up on Telegram right, super bullish vibes!
                        Might be a good time to see what's driving the hype.
                      </p>

                      {/* Sentiment Stats */}
                      <div className="flex items-center justify-between mt-4 text-sm">
                        <div className="text-left">
                          <p className="font-semibold">54.27%</p>
                          <p className="text-[#7A7A7A] text-xs">Bullish</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">44.02%</p>
                          <p className="text-[#7A7A7A] text-xs">Neutral</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">1.71%</p>
                          <p className="text-[#7A7A7A] text-xs">Bearish</p>
                        </div>
                      </div>

                      {/* Sentiment Bar */}
                      <div className="w-full h-1 rounded-full mt-3 flex gap-2">
                        <div
                          className="bg-[#17C671] h-2 rounded-2xl"
                          style={{ width: "54.27%" }}
                        ></div>
                        <div
                          className="bg-[#1346FF] h-2 rounded-2xl"
                          style={{ width: "44.02%" }}
                        ></div>
                        <div
                          className="bg-[#CC434B] h-2 rounded-2xl"
                          style={{ width: "1.71%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* SVG filter for rounded corners */}
            <svg className="absolute w-0 h-0">
              <defs>
                <filter id="sentiment-round" colorInterpolationFilters="sRGB">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="5"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 19 -9"
                    result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <VisionEdit
        open={open}
        setOpen={setOpen}
        vision={vision}
        setVision={setVision}
      />
      <NewsText
        text={text}
        setText={setText}
        open={openNew}
        setOpen={setOpenNews}
      />
    </>
  );
}
