"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { serverUrl } from "@/utils/constant";
import axios from "axios";

interface StreetEditProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  img: any;
  setImg: (value: any) => void;
  onSave?: (img: any) => void;
  tokenMint: string;
}

export default function StreetEdit({
  open,
  setOpen,
  setImg,
  img,
  onSave,
  tokenMint,
}: StreetEditProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [localImg, setLocalImg] = useState<any>(img);

  useEffect(() => {
    if (open) {
      setLocalImg(img);
      setError(null);
    }
  }, [open, img]);

  const handleSave = async () => {
    if (!localImg) {
      setError("Please select an image");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("tokenMint", tokenMint);

      if (localImg instanceof File) {
        formData.append("image", localImg);
      } else if (typeof localImg === "string") {
        try {
          if (localImg.startsWith("data:") || localImg.startsWith("blob:")) {
            const response = await fetch(localImg);
            const blob = await response.blob();
            const file = new File([blob], "image.jpg", { type: blob.type });
            formData.append("image", file);
          } else if (localImg.startsWith("/")) {
            formData.append("imagePath", localImg);
          } else {
            formData.append("imageUrl", localImg);
          }
        } catch (err) {
          console.error("Error processing image URL:", err);
          setError("Failed to process image. Please try uploading again.");
          setIsUploading(false);
          return;
        }
      } else if (typeof localImg === "object" && localImg.img) {
        if (localImg.img instanceof File) {
          formData.append("image", localImg.img);
        } else if (typeof localImg.img === "string") {
          try {
            if (
              localImg.img.startsWith("data:") ||
              localImg.img.startsWith("blob:")
            ) {
              const response = await fetch(localImg.img);
              const blob = await response.blob();
              const file = new File([blob], "image.jpg", { type: blob.type });
              formData.append("image", file);
            } else {
              formData.append("imageUrl", localImg.img);
            }
          } catch (err) {
            console.error("Error processing image URL:", err);
            setError("Failed to process image. Please try uploading again.");
            setIsUploading(false);
            return;
          }
        }
      } else {
        console.error("Invalid image format", localImg);
        setError("Invalid image format. Please try again.");
        setIsUploading(false);
        return;
      }

      console.log("Sending form data:", Object.fromEntries(formData.entries()));

      const response = await axios.post(
        `${serverUrl}/coin_detail/creativeImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Image updated successfully:", response.data);

        const newImageUrl = response.data?.imageUrl || localImg;
        setImg(newImageUrl);

        // Call the optional onSave callback
        if (onSave) {
          onSave(newImageUrl);
        }

        setOpen(false);
      } else {
        console.error("Failed to update image details");
        setError("Failed to update image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("An error occurred while saving. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (newImage: any) => {
    setLocalImg(newImage);
    setError(null);
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
              <ImageUpload value={localImg} onChange={handleImageChange} />

              {/* Error message */}
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
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
            {isUploading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
