"use client";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { serverUrl } from "@/utils/constant";
import axios from "axios";
import Image from "next/image";
import { useState, useRef } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";

interface HeroImgEditProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  img: string;
  setImg: (img: string) => void;
  onSave?: (img: string) => void;
  tokenMint: any;
}

export default function SentiLogoEdit({
  open,
  setOpen,
  img,
  setImg,
  onSave,
  tokenMint,
}: HeroImgEditProps) {
  const [tempImg, setTempImg] = useState(img);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setTempImg(imageUrl);
      setSelectedFile(file);
      if (onSave) onSave(imageUrl);
    }
  };

  const handleSave = async () => {
    setImg(tempImg);
    if (onSave) onSave(tempImg);

    try {
      const formData = new FormData();
      formData.append("tokenMint", tokenMint);
      if (selectedFile) {
        formData.append("image", selectedFile);
      } else {
        formData.append("image", img);
      }

      const response = await axios.post(
        `${serverUrl}/coin_detail/introLogo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Hero Image updated successfully");
      } else {
        console.error("Failed to update image details");
      }
    } catch (err) {
      console.error("Error fetching coin details:", err);
    } finally {
      setOpen(false);
      if (onSave) onSave(tempImg);
    }
  };

  return (
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
                  <p className="hidden md:block">Edit Senti Logo</p>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Tabs defaultValue="image" className="w-full mb-4">
                <TabsList className="w-full grid grid-cols-3 bg-transparent border rounded-lg">
                  <TabsTrigger
                    value="image"
                    className="data-[state=active]:text-white data-[state=active]:bg-[#2C3132] rounded-md px-4 py-1 transition-all"
                  >
                    Image
                  </TabsTrigger>
                  <TabsTrigger
                    value="video"
                    className="data-[state=active]:text-white data-[state=active]:bg-[#2C3132] rounded-md px-4 py-1 transition-all"
                  >
                    Video
                  </TabsTrigger>
                  <TabsTrigger
                    value="slide"
                    className="data-[state=active]:text-white data-[state=active]:bg-[#2C3132] rounded-md px-4 py-1 transition-all"
                  >
                    SlideShow
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <label className="w-full h-[150px] rounded-lg border border-[#7A7A7A] border-dashed bg-[#222627] flex items-center justify-center relative overflow-hidden cursor-pointer">
                {tempImg ? (
                  <>
                    <Image
                      src={tempImg}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm">Change Image</p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-col z-10">
                    <Image
                      src="/uploadIcon.png"
                      width={30}
                      height={30}
                      alt="uploadIcon"
                      className="w-6 h-6 mb-2"
                    />
                    <p className="text-[#F2F2F2] text-xs">Upload Image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </label>

              <p className="text-sm text-[#7A7A7A] mt-3">
                Recommended size: 1920px x 630px.
              </p>
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
  );
}
