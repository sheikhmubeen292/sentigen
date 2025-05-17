"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { serverUrl } from "@/utils/constant";
import { idlAddress } from "@coral-xyz/anchor/dist/cjs/idl";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";

interface HeroTextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  text: string;
  setText: (text: string) => void;
  onSave?: (text: string) => void;
  tokenMint: string;
}

export default function HeroText({
  open,
  setOpen,
  text,
  setText,
  onSave,
  tokenMint,
}: HeroTextProps) {
  const maxChars = 68;
  const [tempText, setTempText] = useState(text);

  const handleSave = async () => {
    setText(tempText);
    try {
      const response = await axios.post(`${serverUrl}/coin_detail/title`, {
        tokenMint: tokenMint,
        heroText: tempText,
      });

      if (response.status === 200) {
        console.log("Coin details updated successfully");
      } else {
        console.error("Failed to update coin details");
      }
    } catch (err) {
      console.error("Error fetching coin details:", err);
    } finally {
      if (onSave) onSave(tempText);
      setOpen(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="p-0 w-80 border-0 flex flex-col justify-between"
          style={{ backgroundColor: "#181B1C" }}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between py-4">
                <div
                  className="flex flex-row items-center justify-between cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <button className="text-sm text-muted-foreground hover:text-foreground flex flex-row items-center">
                    <IoIosArrowDropleftCircle
                      style={{ fontSize: "22px", marginRight: "10px" }}
                    />{" "}
                    <p className="hidden md:block">Edit Hero</p>
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="hero-content"
                  className="text-[#F2F2F2] font-normal text-sm"
                >
                  Hero Content
                </Label>
                <Textarea
                  id="hero-content"
                  className="bg-[#222627] text-white placeholder-[#F2F2F2] resize-none border-0 rounded min-h-[80px]"
                  maxLength={maxChars}
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                />
                <div className="flex justify-between items-center pt-1 px-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#7A7A7A] hover:text-white p-0 h-auto"
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
                    Characters: {tempText.length}/{maxChars}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 mx-3">
            <Button
              className="bg-white text-[#1F1F1F] hover:bg-gray-200 w-full h-10 rounded-lg"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
