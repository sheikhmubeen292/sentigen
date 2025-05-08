"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { RiRobot3Fill } from "react-icons/ri";
import { FaRobot } from "react-icons/fa";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
// import { ChainSelector } from "./chain-selector";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { IoLayers } from "react-icons/io5";

export function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { publicKey } = useWallet();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-[100%] md:w-[380px] border-border bg-[#F4F5F7] dark:bg-[#151515cc]  z-[10001]"
      >
        <Image
          className="cursor-pointer"
          src="/sollogo.svg"
          alt=""
          width={23}
          height={20}
        />
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 ">
            <div className="space-y-2 mt-6">
              {/* <div className="rounded-lg bg-card/50 p-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <ChainSelector className="w-full justify-between bg-transparent hover:bg-accent" />
              </div> */}

              <Button
                className="rounded-[4px] w-full h-[40px] text-[#000] bg-gradient-to-r from-[#4599FF] to-[#04FEAE] "
                size="sm"
                onClick={() => router.push("/create-agent")}
              >
                <Image src="/agentlogo.svg" width={20} height={20} alt="" />
                Create Agent
              </Button>
              <p
                onClick={() => {
                  router.push("/");
                  setOpen(false);
                }}
                className="flex items-center text-[14px] pt-6 font-semibold  text-[#7A7A7A]"
              >
                <IoLayers style={{ marginRight: "10px", fontSize: "20px" }} />
                Explore Agents
              </p>
              <p
                className="w-full flex text-[14px] font-semibold   items-center gap-2  py-4 text-[#7a7a7a] "
                onClick={() => {
                  if (!publicKey) return;
                  router.push(`/my-agents/${publicKey.toString()}`);
                  setOpen(false);
                }}
              >
                <Image src="/obot.svg" width={20} height={20} alt="" />
                My Agents
              </p>
              {/* <ThemeToggle /> */}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
