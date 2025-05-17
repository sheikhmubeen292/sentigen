"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { RefObject, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/utils/constant";

interface PartnerEditProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  logos: Array<{ id: string; src: string; name: string; file?: File }>;
  setLogos: React.Dispatch<
    React.SetStateAction<
      Array<{ id: string; src: string; name: string; file?: File }>
    >
  >;
  fileInputRef: RefObject<HTMLInputElement>;
  tokenMint?: any;
}

export default function PartnerEdit({
  open,
  setOpen,
  logos,
  setLogos,
  fileInputRef,
  tokenMint,
}: PartnerEditProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    setIsUploading(true);
    try {
      // Create FormData for all new logos
      const formData = new FormData();

      // Add tokenMint if available
      if (tokenMint) {
        formData.append("tokenMint", tokenMint);
      }

      // Add all logo files that haven't been uploaded yet
      logos.forEach((logo, index) => {
        if (logo.file) {
          formData.append(`images`, logo.file);
          formData.append(`names`, logo.name);
        }
      });

      // Send to API
      const response = await axios.post(
        `${serverUrl}/coin_detail/partner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      // Update logos to remove File objects after successful upload
      setLogos(
        logos.map((logo) => ({
          id: logo.id,
          src: logo.src,
          name: logo.name,
        }))
      );

      setOpen(false);
    } catch (error) {
      console.error("Error uploading logos:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = (id: string) => {
    setLogos(logos.filter((logo) => logo.id !== id));
  };

  const handleAddLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const objectUrl = URL.createObjectURL(file);

    const newLogo = {
      id: Date.now().toString(),
      src: objectUrl,
      name: file.name.replace(/\.[^/.]+$/, "") || "New Logo",
      file: file,
    };

    setLogos([...logos, newLogo]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
                    <p className="hidden md:block">Edit Partners</p>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {logos.map((logo, i) => (
                  <div
                    key={logo.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical
                        className="text-gray-500 cursor-move"
                        size={20}
                      />
                      <div className="h-[27px] w-[100px]  flex items-center justify-center overflow-hidden">
                        <Image
                          src={logo.src || "/placeholder.svg"}
                          alt={logo.name}
                          width={40}
                          height={40}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-400 hover:bg-transparent"
                      onClick={() => handleRemoveLogo(logo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {/* Add logo button */}
                <Button
                  className="w-full bg-[#222627] text-white hover:bg-[#2a2f30]"
                  onClick={handleAddLogoClick}
                  disabled={isUploading}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New Logo
                </Button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mb-4 mx-3">
            <Button
              className="bg-white text-[#1F1F1F] hover:bg-gray-200 w-full h-10 rounded-lg"
              onClick={handleSave}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save Changes"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add file input handler */}
      {open && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          disabled={isUploading}
        />
      )}
    </>
  );
}
