"use client";

import { Pencil, RotateCw } from "lucide-react";
import Image from "next/image";
import CommunityQA from "./communityQA";
import type { PageContent } from "@/types/page-content";
import { useState } from "react";
import CommunityEdit from "./edit-dailog/community-edit";
import { cn } from "@/lib/utils";

interface EditableLandingPageProps {
  content: PageContent;
  onElementClick: (id: string, type: "text" | "image", section: string) => void;
}

export default function Community({
  content,
  onElementClick,
}: EditableLandingPageProps) {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState({
    img1: "/community1.png",
    img2: "/community2.png",
    img3: "/community3.png",
  });

  return (
    <>
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        .community-card-bg {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="md:col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative w-full min-h-[190px] md:min-h-[230px]">
              <h3 className="absolute left-2 top-0 text-sm font-normal text-[#F2F2F2]">
                Community Visuals
              </h3>
              <div
                className="absolute w-full h-full left-0 top-0"
                style={{
                  filter: "url(#community-visuals-round)",
                  colorRendering: "optimizeQuality",
                }}
              >
                <div
                  className={cn(
                    "absolute w-full h-full community-card-bg",
                    "[clip-path:polygon(48%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_13%,_48%_13%)]",
                    "md:[clip-path:polygon(39%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_7%,_39%_7%)]"
                  )}
                  style={{
                    backgroundColor: "#181b1c",
                    background: "#181b1c !important",
                    transition: "none",
                  }}
                >
                  <div className="mt-[10px] p-4 community-card-bg">
                    <p className="mt-10 mb-3 font-bold text-white text-xl md:text-xl text-2xl w-full md:w-[63%]">
                      Shoutout to the our community!
                    </p>
                    <RotateCw size={28} color={"#7A7A7A"} />
                  </div>
                </div>
              </div>
              {/* SVG filter for rounded corners */}
              <svg className="absolute w-0 h-0">
                <defs>
                  <filter
                    id="community-visuals-round"
                    colorInterpolationFilters="sRGB"
                  >
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
            <div className="relative group">
              <Image
                src={img?.img1 || "/placeholder.svg"}
                alt="image"
                width={400}
                height={400}
                className="w-full h-full"
              />
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
            </div>

            <div className="relative group">
              <Image
                src={img?.img2 || "/placeholder.svg"}
                alt="image"
                width={400}
                height={400}
                className="w-full h-full"
              />
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
            </div>
            <div className="relative group">
              <Image
                src={img?.img3 || "/placeholder.svg"}
                alt="image"
                width={400}
                height={400}
                className="w-full h-full"
              />
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
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="relative w-full min-h-[690px] md:min-h-[800px]">
            <h3 className="absolute left-2 top-0 text-sm font-normal text-[#F2F2F2]">
              AI Q&A
            </h3>
            <div
              className="absolute w-full h-full left-0 top-0"
              style={{
                filter: "url(#community-qa-round)",
                colorRendering: "optimizeQuality",
              }}
            >
              <div
                className={cn(
                  "absolute w-full h-full community-card-bg",
                  "[clip-path:polygon(17%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_3%,_17%_3%)]",
                  "md:[clip-path:polygon(9%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_3%,_9%_3%)]"
                )}
                style={{
                  backgroundColor: "#181b1c",
                  background: "#181b1c !important",
                  transition: "none",
                }}
              >
                <div className="p-4 community-card-bg">
                  <div className="w-full community-card-bg ">
                    <CommunityQA />
                  </div>
                </div>
              </div>
            </div>
            {/* SVG filter for rounded corners */}
            <svg className="absolute w-0 h-0">
              <defs>
                <filter
                  id="community-qa-round"
                  colorInterpolationFilters="sRGB"
                >
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
      <CommunityEdit open={open} setOpen={setOpen} img={img} setImg={setImg} />
    </>
  );
}
