"use client";

import * as React from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent } from "./ui/dialog";
import { cn } from "@/lib/utils";

interface SearchCommandProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  roleColor: string;
  marketCap: string;
  holders: string;
  volume: string;
  change: string;
  tvl: string;
  interferences: string;
  avatar: string;
  description?: string;
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Fox",
    role: "Creator",
    roleColor: "text-[#FF3B9A]",
    marketCap: "$879m",
    holders: "120k",
    volume: "25m",
    change: "+23.12",
    tvl: "25m",
    interferences: "5.6m",
    avatar: "/dummy.png",
    description:
      "World's first AI Community-driven social media agent that understands and engages with your brand's audience. Fox dynamically creates content to fit multi-chain ecosystem and drives engagement across all connected platforms.",
  },
  {
    id: "2",
    name: "Arc",
    role: "DeFi",
    roleColor: "text-[#3BFF9A]",
    marketCap: "$879m",
    holders: "120k",
    volume: "25m",
    change: "+23.12",
    tvl: "25m",
    interferences: "5.6m",
    avatar: "/dummy1.png",
  },
  {
    id: "3",
    name: "Ash",
    role: "Insight",
    roleColor: "text-[#3B9AFF]",
    marketCap: "$879m",
    holders: "120k",
    volume: "25m",
    change: "+23.12",
    tvl: "25m",
    interferences: "5.6m",
    avatar: "/dummy2.png",
  },
  {
    id: "4",
    name: "Alter",
    role: "DeFi",
    roleColor: "text-[#3BFF9A]",
    marketCap: "$879m",
    holders: "120k",
    volume: "25m",
    change: "+23.12",
    tvl: "25m",
    interferences: "5.6m",
    avatar: "/dummy3.png",
  },
];

export function SearchCommand({ isOpen, setIsOpen }: SearchCommandProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredAgents, setFilteredAgents] = React.useState(agents);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value) {
      const filtered = agents.filter((agent) =>
        agent.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAgents(filtered);
      setIsOpen(true);
    } else {
      setFilteredAgents(agents);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[850px] w-[90%] p-0 gap-0 fixed md:top-50 top-60 left-1/2 -translate-x-1/2 bg-white dark:bg-[#151515] border-none rounded-xl">
        <div className="p-1 bg-[#EFEFEF] dark:bg-[#252525] rounded-tl-[12px] rounded-tr-[12px] border-[#2A2A2A]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7A7A]" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="AI"
              className="w-full bg-transparent pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#7A7A7A] focus:outline-none"
            />
          </div>
        </div>
        <div className="px-2 py-3">
          <div className="text-sm text-[#7A7A7A] px-2 mb-2">
            {filteredAgents.length} Results
          </div>
          <div className="space-y-1">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center border-b justify-between px-3 py-2 hover:bg-[#1F1F1F] rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2A2A2A] overflow-hidden">
                    <Image
                      src={agent.avatar || "/placeholder.svg"}
                      alt={agent.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="text-[18px] font-semibold text-white">
                      {agent.name}
                    </div>
                    <div className={cn("text-xs font-normal", agent.roleColor)}>
                      {agent.role}
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-6 grid-cols-2  gap-8 text-sm ">
                  <div>
                    <div className="text-xs text-[#7A7A7A]">Market Cap</div>
                    <div className="text-white">{agent.marketCap}</div>
                  </div>
                  <div className="md:block hidden">
                    <div className="text-xs text-[#7A7A7A]">Holders</div>
                    <div className="text-white">{agent.holders}</div>
                  </div>
                  <div className="md:block hidden">
                    <div className="text-xs text-[#7A7A7A]">24h Volume</div>
                    <div className="text-white">{agent.volume}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#7A7A7A]">24h Change</div>
                    <div className="text-[#32F22C]">{agent.change}</div>
                  </div>
                  <div className="md:block hidden">
                    <div className="text-xs text-[#7A7A7A]">TVL</div>
                    <div className="text-white">{agent.tvl}</div>
                  </div>
                  <div className="md:block hidden">
                    <div className="text-xs text-[#7A7A7A]">Interferences</div>
                    <div className="text-white">{agent.interferences}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
