"use client";

import Image from "next/image";
import PartnerEdit from "./edit-dailog/partner-edit";
import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Partner() {
  const [open, setOpen] = useState(false);

  const [logos, setLogos] = useState([
    { id: "1", src: "/dummyImg.png", name: "logoipsum" },
    { id: "2", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "3", src: "/dummyImg.png", name: "logoipsum" },
    { id: "4", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "5", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "6", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "7", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "8", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "9", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "10", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "11", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "12", src: "/dummyImg.png", name: "Logoipsum" },
    { id: "13", src: "/dummyImg.png", name: "Logoipsum" },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        .partner-bg {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="px-4 relative group w-full min-h-[90px] md:min-h-[130px] py-6 mt-10 md:col-span-1">
        <h3 className="absolute left-2 top-0 text-sm font-normal text-[#F2F2F2]">
          Partners
        </h3>
        <div
          className="absolute w-full h-full left-0 top-0"
          style={{
            filter: "url(#partner-round)",
            colorRendering: "optimizeQuality",
          }}
        >
          <div
            className={cn(
              "absolute w-full h-full partner-bg",
              "[clip-path:polygon(24%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_26%,_24%_26%)]",
              "md:[clip-path:polygon(5%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_17%,_5%_17%)]",
              "flex items-center justify-center"
            )}
            style={{
              backgroundColor: "#181b1c",
              background: "#181b1c !important",
              transition: "none",
            }}
          >
            <div className="w-full overflow-x-auto scrollbar-hide partner-bg">
              <div className="flex items-center justify-start gap-4 px-4 min-w-max partner-bg">
                <span className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
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
                {logos.map((logo, index) => (
                  <Image
                    key={index}
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.name}
                    width={200}
                    height={200}
                    className="w-[120px] md:w-[180px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* SVG filter for rounded corners */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="partner-round" colorInterpolationFilters="sRGB">
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
      <div className="flex justify-between items-center">
        <p className="my-8 font-bold text-white text-2xl md:text-4xl w-full md:w-[63%]">
          Shoutout to the ones making it shape the platform, these are our the
          people who share love to our brand.
        </p>
      </div>

      <PartnerEdit
        open={open}
        setOpen={setOpen}
        logos={logos}
        setLogos={setLogos}
        fileInputRef={fileInputRef}
      />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
      />
    </>
  );
}
