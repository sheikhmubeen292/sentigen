import React from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type HeroBannerProps = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageSrc: any;
};

// Use forwardRef to support `ref` prop
const HeroBanner = React.forwardRef<HTMLInputElement, HeroBannerProps>(
  ({ handleFileChange, imageSrc }, ref) => {
    return (
      <div className="w-full py-4">
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
                SlidesShow
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <label className="w-full h-[150px] rounded-lg border border-[#7A7A7A] border-dashed bg-[#222627] flex items-center justify-center relative overflow-hidden cursor-pointer">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Preview"
                fill
                className="object-cover rounded-lg"
              />
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
              ref={ref}
              onChange={handleFileChange}
            />
          </label>

          <p className="text-sm text-[#7A7A7A] mt-3">
            Recommended size: 1920px x 630px.
          </p>
        </div>
      </div>
    );
  }
);

HeroBanner.displayName = "HeroBanner";

export default HeroBanner;
