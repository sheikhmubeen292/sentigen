"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { JSX } from "react";
export type IUser = {
  walletAddress: string;
  name: string;
  description: string;
  profilePicture: string;
  websiteUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  discordUrl?: string;
};
export const socialLinks = [
  {
    id: "websiteUrl",
    label: "Website",
    icon: <Globe className="h-5 w-5 text-muted-foreground" />,
  },
  {
    id: "twitterUrl",
    label: "X/Twitter",
    icon: <FaXTwitter className="h-5 w-5 text-muted-foreground" />,
  },
  {
    id: "telegramUrl",
    label: "Telegram",
    icon: <FaTelegramPlane className="h-5 w-5 text-muted-foreground" />,
  },
  {
    id: "youtubeUrl",
    label: "YouTube",
    icon: <FaYoutube className="h-5 w-5 text-muted-foreground" />,
  },
  {
    id: "tiktokUrl",
    label: "TikTok",
    icon: <FaTiktok className="h-5 w-5 text-muted-foreground" />,
  },
  {
    id: "discordUrl",
    label: "Discord",
    icon: <FaDiscord className="h-5 w-5 text-muted-foreground" />,
  },
];

export const SocialInput = ({
  id,
  label,
  icon,
  data,
  updateState,
}: {
  id: keyof IUser;
  label: string;
  icon: JSX.Element;
  data: IUser;
  updateState: (name: string, value: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <Label
        htmlFor={id}
        className="text-black dark:text-[#F2F2F2] text-[14px]"
      >
        {label}
      </Label>
      <div
        className={`mt-1.5 flex items-center gap-2 rounded-md bg-background dark:bg-[#252525] border px-2 transition-colors ${
          isFocused ? "border-primary ring-1 ring-primary" : "border-border/40"
        }`}
      >
        {icon}
        <Input
          id={id}
          placeholder={`${label} URL`}
          className="h-9 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          value={""}
          onChange={(e) => updateState(id, e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};
