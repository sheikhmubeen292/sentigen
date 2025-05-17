"use client";

import axios from "axios";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { serverUrl } from "@/utils/constant";

interface CreatorEditProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentCrator: {
    about: string;
    img: string;
    web: string;
    x: string;
    telegram: string;
    youtube: string;
    discord: string;
  };
  setContentCreator: (value: any) => void;
  onSave?: (text: any) => void;
  tokenMint?: string;
}

export default function CreatorEdit({
  open,
  setOpen,
  contentCrator,
  setContentCreator,
  onSave,
  tokenMint,
}: CreatorEditProps) {
  const maxChars = 400;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("tokenMint", tokenMint || "");
      formData.append("description", contentCrator.about || "");
      formData.append("telegramUrl", contentCrator.telegram || "");
      formData.append("twitterUrl", contentCrator.x || "");
      formData.append("websiteUrl", contentCrator.web || "");
      formData.append("youtubeUrl", contentCrator.youtube || "");
      formData.append("discordUrl", contentCrator.discord || "");

      formData.append("tiktokUrl", "");

      if (contentCrator.img && contentCrator.img.startsWith("data:")) {
        const response = await fetch(contentCrator.img);
        const blob = await response.blob();
        formData.append("image", blob, "creator-image.png");
      }

      const response = await axios.post(`${serverUrl}/coin/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // or just `token: token` if backend expects `token`
        },
      });
      console.log("Response from server:", response.data);
      if (onSave) {
        onSave(contentCrator);
      }

      setOpen(false);
    } catch (error) {
      console.error("Failed to update creator information:", error);
      // Handle error (could add error state and display message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setContentCreator((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="p-0 w-80 border-0 flex flex-col justify-between"
        style={{ backgroundColor: "#181B1C" }}
      >
        <div className="flex flex-col h-full overflow-auto">
          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between py-4">
              <div
                className="flex flex-row items-center justify-between cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <button className="text-sm text-muted-foreground hover:text-foreground flex flex-row items-center">
                  <IoIosArrowDropleftCircle
                    style={{ fontSize: "22px", marginRight: "10px" }}
                  />
                  <p className="hidden md:block">Edit Hero</p>
                </button>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-2">
              <Label
                htmlFor="hero-content"
                className="text-[#F2F2F2] font-normal text-sm"
              >
                About Creator
              </Label>
              <Textarea
                id="hero-content"
                className="bg-[#222627] text-white placeholder-[#F2F2F2] resize-none border-0 rounded min-h-[160px]"
                maxLength={maxChars}
                value={contentCrator.about || ""}
                onChange={(e) => handleChange("about", e.target.value)}
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
                  Characters: {contentCrator.about?.length || 0}/{maxChars}
                </span>
              </div>

              {/* Image Upload */}
              <ImageUpload
                value={contentCrator.img}
                onChange={(newImg) => handleChange("img", newImg)}
              />

              {/* Social Inputs */}
              <div className="flex flex-col gap-4 w-full max-w-md">
                {[
                  {
                    label: "Website",
                    icon: "/digital-globe.png",
                    field: "web",
                  },
                  {
                    label: "X/Twitter",
                    icon: "/abstract-x-network.png",
                    field: "x",
                  },
                  {
                    label: "Telegram",
                    icon: "/stylized-paper-airplane.png",
                    field: "telegram",
                  },
                  {
                    label: "YouTube",
                    icon: "/youtube-logo-display.png",
                    field: "youtube",
                  },
                  {
                    label: "Discord",
                    icon: "/stylized-discord-logo.png",
                    field: "discord",
                  },
                ].map(({ label, icon, field }) => (
                  <div key={field} className="text-white">
                    <label className="block mb-2 text-sm text-[#F2F2F2] text-normal">
                      {label}
                    </label>
                    <div className="flex items-center bg-[#222627] rounded-lg px-4 gap-4">
                      <Image
                        src={icon}
                        alt={label}
                        width={24}
                        height={24}
                        className="opacity-70"
                      />
                      <Input
                        type="text"
                        placeholder={`${label} Account`}
                        className="border-none bg-transparent text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                        value={
                          contentCrator[field as keyof typeof contentCrator] ||
                          ""
                        }
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mb-4 mx-3">
          <Button
            className="bg-white text-[#1F1F1F] hover:bg-gray-200 w-full h-10 rounded-lg"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
