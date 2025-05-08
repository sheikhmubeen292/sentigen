import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Send, Upload, X, Disc as DiscordIcon } from "lucide-react";
import Image from "next/image";
interface EditStreetWearProps {
  boys2Text: string;
  setBoys2Text: (val: string) => void;
  telegramLink: string;
  setTelegramLink: (val: string) => void;
  twitterLink: string;
  setTwitterLink: (val: string) => void;
  webLink: string;
  setWebLink: (val: string) => void;
  imageAlt: string;
  setImageAlt: (val: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function EditStreetWear({
  boys2Text,
  setBoys2Text,
  telegramLink,
  setTelegramLink,
  twitterLink,
  setTwitterLink,
  webLink,
  setWebLink,
  imageAlt,
  setImageAlt,
  fileInputRef,
  handleFileChange,
}: EditStreetWearProps) {
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-zinc-300 text-sm font-normal leading-[100%] tracking-[0%] mb-2">
          About
        </h3>
        <div className="mb-4">
          <Textarea
            id="boys2-text"
            value={boys2Text}
            onChange={(e) => setBoys2Text(e.target.value)}
            rows={4}
            placeholder="I started SITH because I saw the chaos and wanted to create something that cuts through it..."
            className="bg-[#222627] text-[#F2F2F2] p-2 text-sm resize-none h-44 scrollbar-hide"
          />
          <div className="flex justify-between items-center mt-4 mb-4">
            <div className="flex items-center gap-3 cursor-pointer">
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
              Characters: {0}/{300}
            </span>
          </div>
        </div>

        {/*  */}
        <div>
          {" "}
          <Label htmlFor="image-upload">Upload Image</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="mt-3"
          />
          <div
            className={` mt-4 border border-dashed ${"border-zinc-700 bg-zinc-800/50"} rounded-md flex flex-col items-center justify-center py-6 px-4 cursor-pointer transition-colors`}
            onClick={handleClick}
          >
            <div className="h-10 w-10 ...">
              <Upload />
            </div>

            {/* Hidden File Input */}
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <span>Upload Image</span>
          </div>
        </div>

        {/*  */}
        <div className="mt-4">
          <div className="mt-6">
            <h3 className="mt-2 text-zinc-300 text-[14px] font-normal leading-[100%] tracking-[0%] mb-2">
              Telegram Link
            </h3>
            <div className="flex h-9 w-full items-center rounded-md mt-1 bg-[#222627] px-3 py-1 text-sm">
              <Send className="h-4 w-4 text-zinc-500 mr-2" />
              <input
                value={telegramLink}
                onChange={(e) => setTelegramLink(e.target.value)}
                className="flex-1 bg-transparent text-zinc-300 outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mt-2 text-zinc-300 text-[14px] font-normal leading-[100%] tracking-[0%] mb-2">
              Twitter Link
            </h3>
            <div className="flex h-9 w-full items-center rounded-md mt-1 bg-[#222627] px-3 py-1 text-sm">
              <X className="h-4 w-4 text-zinc-500 mr-2" />
              <input
                value={twitterLink}
                onChange={(e) => setTwitterLink(e.target.value)}
                className="flex-1 bg-transparent text-zinc-300 outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mt-2 text-zinc-300 text-[14px] font-normal leading-[100%] tracking-[0%] mb-2">
              Web Link
            </h3>
            <div className="flex h-9 w-full items-center rounded-md mt-1 bg-[#222627] px-3 py-1 text-sm">
              <DiscordIcon className="h-4 w-4 text-zinc-500 mr-2" />
              <input
                value={webLink}
                onChange={(e) => setWebLink(e.target.value)}
                className="flex-1 bg-transparent text-zinc-300 outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
