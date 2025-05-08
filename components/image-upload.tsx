"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl); // Pass it up to parent
    }
  };

  return (
    <div className="w-full max-w-md">
      <div
        className="
          mt-4 
          h-[170px] 
          rounded-md 
          border-2 
          border-dashed 
          border-gray-600
          flex 
          flex-col 
          items-center 
          justify-center
          cursor-pointer
          transition-colors
          hover:border-gray-500
          relative
          overflow-hidden
        "
        style={{ backgroundColor: "#222627" }}
        onClick={handleUploadClick}
      >
        {value ? (
          <>
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="flex flex-col items-center">
                <Image
                  src="/uploadIcon.png"
                  alt="Change image"
                  width={32}
                  height={32}
                  className="h-6 w-6 mb-2"
                />
                <p className="text-white text-sm">Change Image</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <Image
              src="/uploadIcon.png"
              alt="uploadIcon"
              width={100}
              height={100}
              className="h-10 w-10 text-gray-400 mb-2"
            />
            <p className="text-sm text-gray-400">Upload Image</p>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Recommended size: 1280 × 1920px. Max file size 20mb.
      </p>
    </div>
  );
}
