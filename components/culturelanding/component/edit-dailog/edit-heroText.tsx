"use client";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { IoIosArrowDropleftCircle } from "react-icons/io";
interface EditStreetWearProps {
  textValue: string;
  setTextValue: (val: string) => void;
}
export default function HeroTextEdit({
  textValue,
  setTextValue,
}: EditStreetWearProps) {
  const maxChars = 50;

  return (
    <div className="space-y-2">
      <Label htmlFor="hero-content" className="text-[#F2F2F2]">
        Hero Content
      </Label>
      <Textarea
        id="hero-content"
        value={textValue}
        className="bg-[#222627] text-white placeholder-[#F2F2F2] resize-none border-none rounded-none h-[20px]"
        maxLength={maxChars}
        onChange={(e) => setTextValue(e.target.value)}
        placeholder="Premium streetwear for the digitally evolved"
      />

      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-[#7A7A7A] hover:text-white"
        >
          <Image
            src="/ai-pen.png"
            alt="ai-pen"
            width={30}
            height={30}
            className="h-4 w-4 mr-1"
          />
          Generate
        </Button>
        <span className="text-xs text-[#7A7A7A]">
          Characters: {textValue.length}/{maxChars}
        </span>
      </div>
    </div>
  );
}
