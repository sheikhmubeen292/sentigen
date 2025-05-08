"use client";

import type { PageContent } from "@/types/page-content";
import { Pencil } from "lucide-react";
import Image from "next/image";
import NarrativeText from "./edit-dailog/narrative-edit";
import { useState } from "react";
import CreatorEdit from "./edit-dailog/creator-edit";
import StreetEdit from "./edit-dailog/street-edit";
import { cn } from "@/lib/utils";

interface EditableLandingPageProps {
  content: PageContent;
  onElementClick: (id: string, type: "text" | "image", section: string) => void;
}

const dummyText =
  "Our world is constantly shifting between physical and digital, creating noise that drowns out what matters. That's where SNTI comes in. We're premium streetwear designed for those seeking clarity in chaos, connecting individuals who understand that style isn't just what you wear—it's how you process and transmit your unique signal.";

export default function StreetWearShowcase({
  content,
  onElementClick,
}: EditableLandingPageProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(dummyText);
  const [openCreator, setOpenCreator] = useState(false);
  const [contentCrator, setContentCreator] = useState({
    about:
      "I started SNTI because I saw the chaos and wanted to create something that cuts through it. For me, style isn't just about clothes—it's about clarity. Each piece we design helps you cut out your own signal. SNTI is my way of finding clarity and connecting with others who feel the same.",
    img: "/boys2Img.png",
    web: "",
    x: "",
    telegram: "",
    youtube: "",
    discord: "",
  });

  const [openStreet, setOpenStreet] = useState(false);
  const [streetImg, setStreetImage] = useState("/boys.png");

  const secondSection = content.sections[1];
  const secondElement = secondSection?.elements[1];
  if (!secondElement || secondElement.type !== "image") return null;

  const narrativeSection = content.sections[1];
  const narrativeElement = narrativeSection.elements[0];
  if (!narrativeElement || narrativeElement.type !== "text") return null;

  const boySectionCreator = content.sections[1];
  const boysElement = boySectionCreator.elements[2];
  if (!boysElement || boysElement.type !== "image") return null;

  return (
    <>
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        .street-bg {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="flex flex-col px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full">
          {/* Left Column - Product Showcase */}
          <div className="relative group rounded-xl h-full w-full flex-grow">
            <Image
              src={streetImg || "/placeholder.svg"}
              alt="SNTI Streetwear Collection"
              width={800}
              height={730}
              className="w-full h-full object-cover rounded-3xl"
            />

            <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
              <div className="flex items-center gap-3 border rounded-lg border-[#293032] bg-[#141819] p-2 ">
                <Image
                  src="/pancil.png"
                  alt="ai-icon"
                  width={10}
                  height={10}
                  className="w-5 h-5"
                  onClick={() => setOpenStreet(true)}
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

          {/* Right Column - Brand Narrative */}
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="relative w-full min-h-[350px] py-6 px-10 group">
              <h3 className="absolute left-3 top-0 text-sm font-normal text-[#F2F2F2]">
                Narrative
              </h3>

              <div
                className="absolute w-full h-full left-0 top-0"
                style={{
                  filter: "url(#narrative-round)",
                  colorRendering: "optimizeQuality",
                }}
              >
                <div
                  className={cn(
                    "absolute w-full h-full street-bg",
                    "[clip-path:polygon(22%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_6%,_22%_6%)]",
                    "md:[clip-path:polygon(12%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_9%,_12%_9%)]"
                  )}
                  style={{
                    backgroundColor: "#181b1c",
                    background: "#181b1c !important",
                    transition: "none",
                  }}
                >
                  <div className="street-bg p-4 mt-[30px] relative">
                    <span className="absolute -top-6 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
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
                    <p className="text-white text-lg md:text-2xl">{text}</p>
                  </div>
                </div>
              </div>

              {/* SVG filter for rounded corners */}
              <svg className="absolute w-0 h-0">
                <defs>
                  <filter id="narrative-round" colorInterpolationFilters="sRGB">
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
                    <feComposite
                      in="SourceGraphic"
                      in2="goo"
                      operator="atop"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Creator Section */}
            <div className="relative w-full min-h-[900px] md:min-h-[620px] py-6 group">
              <h3 className="absolute left-4 top-0 text-sm font-normal text-[#F2F2F2]">
                Creator
              </h3>
              <div
                className="absolute w-full h-full left-0 top-0"
                style={{
                  filter: "url(#creator-round)",
                  colorRendering: "optimizeQuality",
                }}
              >
                <div
                  className={cn(
                    "absolute w-full h-full street-bg",
                    "[clip-path:polygon(21%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_3%,_21%_3%)]",
                    "md:[clip-path:polygon(11%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_4%,_11%_4%)]"
                  )}
                  style={{
                    backgroundColor: "#181b1c",
                    background: "#181b1c !important",
                    transition: "none",
                  }}
                >
                  <span className="absolute top-2 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                    <div className="flex items-center gap-3 border rounded-lg border-[#293032] bg-[#141819] p-2 ">
                      <Image
                        src="/pancil.png"
                        alt="ai-icon"
                        width={10}
                        height={10}
                        className="w-5 h-5"
                        onClick={() => setOpenCreator(true)}
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
                  <div className="flex flex-col md:flex-row gap-6 items-start street-bg">
                    <div className="w-full md:w-1/2 rounded-none md:rounded-lg overflow-hidden">
                      <Image
                        src={contentCrator?.img || "/placeholder.svg"}
                        alt="SNTI Creator"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full md:w-1/2 mt-3 md:mt-16 px-3 md:px-0 md:pr-4 street-bg">
                      <p className="text-white text-sm mb-6">
                        {contentCrator?.about}
                      </p>

                      <div className="flex items-center gap-4">
                        <a
                          href={contentCrator?.x || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src="/twitter.png"
                            alt="twitter"
                            width={30}
                            height={30}
                          />
                        </a>
                        <a
                          href={contentCrator?.telegram || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src="/telegram.png"
                            alt="telegram"
                            width={30}
                            height={30}
                          />
                        </a>
                        <a
                          href={contentCrator?.web || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src="/circle.png"
                            alt="website"
                            width={30}
                            height={30}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* SVG filter for rounded corners */}
              <svg className="absolute w-0 h-0">
                <defs>
                  <filter id="creator-round" colorInterpolationFilters="sRGB">
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
                    <feComposite
                      in="SourceGraphic"
                      in2="goo"
                      operator="atop"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Edit components */}
      <NarrativeText
        open={open}
        setOpen={setOpen}
        text={text}
        setText={setText}
      />
      <CreatorEdit
        open={openCreator}
        setOpen={setOpenCreator}
        contentCrator={contentCrator}
        setContentCreator={setContentCreator}
      />
      <StreetEdit
        open={openStreet}
        setOpen={setOpenStreet}
        img={streetImg}
        setImg={setStreetImage}
      />
    </>
  );
}
