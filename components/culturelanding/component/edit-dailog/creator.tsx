"use client";

import { useContext, useRef, useState } from "react";
import {
  Upload,
  X,
  MessageSquare,
  Send,
  Youtube,
  Disc as DiscordIcon, // Corrected here: DiscIcon -> Disc
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { AppContext } from "@/utils/constant";
import Image from "next/image";

export default function CreatorEdit() {
  const maxChars = 300;
  const { setSidebarDialog, creatorContent, setCreatorContent } =
    useContext(AppContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [about, setAbout] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (
    field: keyof typeof creatorContent,
    value: string
  ) => {
    setCreatorContent((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    if (isSaved) setIsSaved(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleInputChange("img", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleInputChange("img", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateText = () => {
    const sampleTexts = [
      "I started this project because I saw a gap in the market. My goal is to create something that truly resonates with people who value authenticity and quality.",
      "As a creator, I'm passionate about building a community where ideas can flourish. I believe in creating content that inspires and connects people.",
      "My journey began when I noticed how difficult it was to find genuine connections online. I'm dedicated to creating a space where people can be themselves.",
    ];

    const randomText =
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    handleInputChange("text", randomText);
  };

  const handleSaveChanges = () => {
    console.log("Saving creator content:", creatorContent);
    setIsSaved(true);
    setCreatorContent(false);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-sm bg-[#181B1C] text-[#F2F2F2] overflow-hidden">
      <div>
        <div className="flex items-center justify-between py-4">
          <div
            className="flex flex-row items-center justify-between"
            onClick={() => setSidebarDialog(false)}
          >
            <button className="text-sm text-muted-foreground hover:text-foreground flex flex-row items-center">
              <IoIosArrowDropleftCircle
                style={{ fontSize: "22px", marginRight: "10px" }}
              />
              <p className="hidden md:block font-semibold text-[#7A7A7A] text-sm">
                Creator
              </p>
            </button>
          </div>
        </div>

        <div className="mb-4 mt-4">
          <h3 className="text-zinc-300 text-sm font-normal leading-[100%] tracking-[0%] mb-2">
            About
          </h3>
          <Textarea
            value={creatorContent.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
            placeholder="I started SITH because I saw the chaos and wanted to create something that cuts through it..."
            className="bg-[#222627] text-[#F2F2F2] p-2 text-sm resize-none h-44 scrollbar-hide"
            maxLength={maxChars}
          />
          <div className="flex justify-between items-center mt-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleGenerateText}
            >
              <Image
                src="/ai-pen.png"
                alt="ai-pen"
                width={50}
                height={50}
                className="w-3 h-4"
              />
              <span className="text-[#F2F2F2] text-xs">Generate</span>
            </div>
            <span className="text-[#7A7A7A] text-sm">
              Characters: {creatorContent?.text?.length}/{maxChars}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          {creatorContent.img ? (
            <div className="relative">
              <img
                src={creatorContent.img || "/placeholder.svg"}
                alt="Uploaded preview"
                className="w-full h-[120px] object-cover rounded-md"
              />
              <button
                onClick={() => handleInputChange("img", "")}
                className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          ) : (
            <div
              className={`border border-dashed ${
                isDragging
                  ? "border-blue-500 bg-zinc-800/80"
                  : "border-zinc-700 bg-zinc-800/50"
              } rounded-md flex flex-col items-center justify-center py-6 px-4 cursor-pointer transition-colors`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mb-2">
                <Upload className="h-5 w-5 text-zinc-400" />
              </div>
              <span className="text-zinc-400 text-sm font-medium">
                {isDragging ? "Drop image here" : "Upload Image"}
              </span>
            </div>
          )}
        </div>

        <div className="mb-3">
          {[
            {
              label: "Website",
              placeholder: "X Account",
              icon: <X className="h-4 w-4 text-zinc-500 mr-2" />,
            },
            {
              label: "Telegram",
              placeholder: "Telegram Account",
              icon: <Send className="h-4 w-4 text-zinc-500 mr-2" />,
            },
            {
              label: "Youtube",
              placeholder: "YouTube Account",
              icon: <Youtube className="h-4 w-4 text-zinc-500 mr-2" />,
            },
            {
              label: "Discord",
              placeholder: "Discord Account",
              icon: <DiscordIcon className="h-4 w-4 text-zinc-500 mr-2" />,
            },
          ].map(({ label, placeholder, icon }, idx) => (
            <div key={idx} className="mt-6">
              <h3 className="mt-2 text-zinc-300 text-[14px] font-normal leading-[100%] tracking-[0%] mb-2">
                {label}
              </h3>
              <div className="flex h-9 w-full items-center rounded-md mt-1 bg-[#222627] px-3 py-1 text-sm">
                {icon}
                <input
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-zinc-300 outline-none placeholder:text-zinc-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4">
        <Button
          className="w-full bg-white hover:bg-white/90 text-black"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
