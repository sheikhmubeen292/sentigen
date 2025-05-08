"use client";

import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { IoIosArrowDropleftCircle } from "react-icons/io";

interface CreatorEditProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  img: any;
  setImg: any;
  onSave?: (text: any) => void;
}

export default function CommunityEdit({
  open,
  setOpen,
  setImg,
  img,
  onSave,
}: CreatorEditProps) {
  const maxChars = 400;

  const handleSave = () => {
    if (onSave) {
      onSave(img);
    }
    setOpen(false);
  };

  // Fixed function to use the correct field name
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
                  <p className="hidden md:block">Edit Community</p>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <ImageUpload
                value={img.img1}
                onChange={(newImg) => handleChange("img1", newImg)}
              />
              <ImageUpload
                value={img.img2}
                onChange={(newImg) => handleChange("img2", newImg)}
              />
              <ImageUpload
                value={img.img3}
                onChange={(newImg) => handleChange("img3", newImg)}
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
