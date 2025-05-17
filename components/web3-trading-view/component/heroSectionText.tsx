"use client";

import { Pencil } from "lucide-react";
import { PageContent } from "@/types/page-content";
import HeroText from "@/components/culturelanding/component/edit-dailog/heroText-edit";
import { useState } from "react";
import Image from "next/image";

export default function HeroSectionText({ data, tokenMint }: any) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(
    data?.title || "Premium streetwear for the digitally evolved"
  );

  return (
    <>
      <section className={` pt-[40px] pb-5 px-4 max-w-[1920px] mx-auto`}>
        <div className="relative">
          <div>
            <div className={`cursor-pointer group relative`}>
              <h1 className="text-4xl md:text-7xl font-medium text-white max-w-full md:max-w-[60%] leading-[120%]">
                {text}
              </h1>
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
      </section>

      {/* edit  bar  */}
      <HeroText
        open={open}
        setOpen={setOpen}
        text={text}
        setText={setText}
        tokenMint={tokenMint}
      />
    </>
  );
}
