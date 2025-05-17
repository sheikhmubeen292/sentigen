"use client";

import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { serverUrl } from "@/utils/constant";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

import { IoIosArrowDropleftCircle } from "react-icons/io";

interface CreatorEditProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  vision: {
    text: string;
    img: string;
    text1: string; // Added text1 to the interface
  };
  setVision: (value: any) => void;
  onSave?: (text: any) => void;
  tokenMint: string; // Changed to string type for clarity
}

export default function NewsEdit({
  open,
  setOpen,
  setVision,
  vision,
  onSave,
  tokenMint,
}: CreatorEditProps) {
  const maxChars = 400;
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localVision, setLocalVision] = useState(vision);

  // Reset local state when the modal opens with new vision data
  useEffect(() => {
    if (open) {
      setLocalVision(vision);
      setError(null);
    }
  }, [open, vision]);

  const handleSave = async () => {
    // Validate input
    if (!localVision.text?.trim()) {
      setError("Vision text is required");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("tokenMint", tokenMint);
      formData.append("text", localVision.text || "");
      formData.append("heading", localVision.text1 || ""); // Add text1 to formData

      // Handle the image based on its type
      let imageProcessed = false;

      if (localVision.img instanceof File) {
        // If it's already a File object, just append it
        formData.append("image", localVision.img);
        imageProcessed = true;
      } else if (typeof localVision.img === "string") {
        try {
          // Handle different types of image strings
          if (
            localVision.img.startsWith("data:") ||
            localVision.img.startsWith("blob:")
          ) {
            // For data URLs and blob URLs, fetch and convert to File
            const response = await fetch(localVision.img);
            const blob = await response.blob();
            const file = new File([blob], "vision-image.jpg", {
              type: blob.type,
            });
            formData.append("image", file);
            imageProcessed = true;
          } else if (localVision.img.startsWith("/")) {
            // For local files, fetch from public directory and convert to File
            try {
              // Attempt to create an absolute URL from the relative path
              const absoluteUrl = new URL(
                localVision.img,
                window.location.origin
              ).href;
              const response = await fetch(absoluteUrl);
              if (!response.ok)
                throw new Error(`Failed to fetch image: ${response.status}`);

              const blob = await response.blob();
              const file = new File([blob], "vision-image.jpg", {
                type: blob.type,
              });
              formData.append("image", file);
              imageProcessed = true;
            } catch (fetchError) {
              console.error("Error fetching local image:", fetchError);
              // If we can't fetch the image, send the path as a fallback
              formData.append("imagePath", localVision.img);
              imageProcessed = true;
            }
          } else {
            // For external URLs
            formData.append("imageUrl", localVision.img);
            imageProcessed = true;
          }
        } catch (error) {
          console.error("Error processing image URL:", error);
          setError("Failed to process image. Please try again.");
          setIsUploading(false);
          return;
        }
      }

      // If no image was processed, report an error
      if (!imageProcessed) {
        setError("An image is required. Please upload an image.");
        setIsUploading(false);
        return;
      }

      console.log("Sending form data for vision update");

      const response = await axios.post(
        `${serverUrl}/coin_detail/news`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Vision updated successfully", response.data);

        // Update the parent's vision state
        setVision(localVision);

        // Call the optional onSave callback
        if (onSave) {
          onSave(localVision);
        }

        setOpen(false);
      } else {
        console.error("Failed to update vision details");
        setError("Failed to update vision. Please try again.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setError(
        error.response?.data?.message || "Failed to upload. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (field: string, value: string | File) => {
    setLocalVision((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user makes changes
    if (error) setError(null);
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
                  <p className="hidden md:block">Edit Vision</p>
                </button>
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-3">
              <Label
                htmlFor="news-title"
                className="text-[#F2F2F2] font-normal text-sm"
              >
                News Title
              </Label>
              <Input
                id="news-title"
                className="bg-[#222627] text-white placeholder-[#F2F2F2] border-0 rounded"
                value={localVision.text1 || ""}
                onChange={(e) => handleChange("text1", e.target.value)}
              />
            </div>

            {/* News Content */}
            <div className="space-y-3">
              <Label
                htmlFor="news-content"
                className="text-[#F2F2F2] font-normal text-sm"
              >
                News Content
              </Label>
              <Textarea
                id="news-content"
                className="bg-[#222627] text-white placeholder-[#F2F2F2] resize-none border-0 rounded min-h-[160px]"
                maxLength={maxChars}
                value={localVision.text || ""}
                onChange={(e) => handleChange("text", e.target.value)}
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
                  Characters: {localVision.text?.length || 0}/{maxChars}
                </span>
              </div>

              {/* Image Upload */}
              <ImageUpload
                value={localVision.img}
                onChange={(newImg) => handleChange("img", newImg)}
              />

              {/* Error Message */}
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
