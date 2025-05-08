"use client";

import { useState } from "react";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { IoIosArrowDropleftCircle } from "react-icons/io";

interface StreetEditProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  img: any;
  setImg: (value: any) => void;
  onSave?: (img: any) => void;
}

export default function StreetEdit({
  open,
  setOpen,
  setImg,
  img,
  onSave,
}: StreetEditProps) {
  const handleSave = () => {
    if (onSave) {
      onSave(img);
    }
    setOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    setImg((prev: any) => ({
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
                  <p className="hidden md:block">Edit Street</p>
                </button>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-2">
              {/* Image Upload */}
              <ImageUpload
                value={img.img || img}
                onChange={(newImg) => handleChange("img", newImg)}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
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
