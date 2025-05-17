import { useState } from "react";
import Image from "next/image";
import CryptoAssetCard from "../web3-trading-view/component/sntiBar";
import StreetWearShowcase from "./component/streetWearShowcase";
import Vision from "./component/vision";
import Viral from "./component/viral";
import Roadmap from "./component/roadmap";
import Partner from "./component/partner";
import Community from "./component/community";
import { Pencil } from "lucide-react";
import { PageContent } from "@/types/page-content";
import HeroImgEdit from "./component/edit-dailog/heroImg-edit";

interface EditableLandingPageProps {
  content: PageContent;
  onElementClick: (id: string, type: "text" | "image", section: string) => void;
  tokenMint?: string;
  data?: any;
}

export default function CultureLanding({
  content,
  onElementClick,
  tokenMint,
  data,
}: EditableLandingPageProps) {
  const firstSection = content.sections[0];
  const firstElement = firstSection?.elements[1];

  if (!firstElement || firstElement.type !== "image") return null;

  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(data?.heroImage || "/cultrureImage.png");
  const [openSenti, setOpenSenit] = useState(false);
  const [sentiImg, setSentiImg] = useState(data?.introLogo || "/snti.png");
  return (
    <>
      <div className="bg-[#0d0d0d] relative overflow-visible max-w-[1920px] mx-auto">
        <div className="px-4 w-full h-[200px] md:h-[450px] relative mt-5 group">
          <Image
            src={img}
            alt={img || "Culture Image"}
            fill
            className="object-cover rounded-2xl md:rounded-lg"
            priority
          />

          <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full cursor-pointer">
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
        <div className="sticky top-0 z-30">
          <CryptoAssetCard
            assetName="snti247"
            userName="Ryan"
            marketCap="$120m"
            marketCapChange={8.65}
            holders="77k"
            followers="138k"
            setOpen={setOpenSenit}
            open={openSenti}
            sentiImg={sentiImg}
            setSentiImg={setSentiImg}
            isEdit={true}
            tokenMint={tokenMint}
          />
        </div>

        <StreetWearShowcase data={data} tokenMint={tokenMint} />
        <Vision data={data} tokenMint={tokenMint} />
        <Roadmap />
        <Partner data={data} token={tokenMint} />
        <Viral data={data} tokenMint={tokenMint} />
        <Community content={content} onElementClick={onElementClick} />
      </div>

      <HeroImgEdit
        open={open}
        setOpen={setOpen}
        img={img}
        setImg={setImg}
        tokenMint={tokenMint}
      />
    </>
  );
}
