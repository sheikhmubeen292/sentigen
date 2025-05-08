import Image from "next/image";
import { ArrowRight, Lightbulb, MessageSquare, Zap } from "lucide-react";

export default function SpotLight() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8   my-10">
      <div className="md:col-span-6">
        <Image
          src="/spotlight.png"
          alt="spotlight"
          width={200}
          height={500}
          className="w-full h-[500px] object-cover rounded-l-lg"
        />
      </div>
      <div className="md:col-span-2 bg-[#181B1C]  rounded-r-lg">
        <div className="max-w-sm rounded-lg  p-5  ">
          {/* Header */}
          <div className="mb-4 flex items-center gap-2">
            <Image
              src={"/bulb.png"}
              alt="spotlight"
              width={20}
              height={40}
              className="h-6 w-5"
            />
            <h2 className="text-base font-semibold">Creator Spotlight</h2>
          </div>

          <p className="mb-4 text-xs text-[#BBBBBB]">
            This team is hustling <span className="text-base">🔥🔥</span>
          </p>

          {/* Creator info */}
          <div className="mb-4 flex items-center gap-3 ">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src="/astro.png"
                alt="Astro avatar"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Astro</h3>
          </div>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-lg border border-[#626262] bg-[#181B1C] px-5 py-3 text-xs">
              Metaverse
            </span>
            <span className="rounded-lg border border-[#626262] bg-[#181B1C] px-5 py-3 text-xs">
              Open-World
            </span>
            <span className="rounded-lg border border-[#626262] bg-[#181B1C] px-5 py-3 text-xs">
              Simulation
            </span>
          </div>

          {/* Description */}
          <p className="mb-4 text-xs text-[#BBBBBB]">
            Explore the limitless possibilities of a futuristic open world
            metaverse where innovation meets imagination.
          </p>

          {/* Stats */}
          <div className="mb-4 flex justify-between">
            <div>
              <p className="text-xs text-[#7A7A7A]">Market Cap</p>
              <p className="flex items-center text-lg font-semibold">
                $120m{" "}
                <span className="ml-1 text-xs text-green-400">8.62% ↑</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-[#7A7A7A]">Holders</p>
              <p className="text-lg font-semibold">77k</p>
            </div>
            <div>
              <p className="text-xs text-[#7A7A7A]">Mindshare</p>
              <p className="text-lg font-semibold">3.21%</p>
            </div>
          </div>

          {/* Activity */}
          <div className="mb-5 flex justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-10 items-center justify-center ">
                <Image
                  src="/badgeRed.png"
                  alt="badgeRed"
                  width={30}
                  height={40}
                  className="h-9 w-7 text-green-400"
                />
              </div>
              <div className="text-xs text-[#BBBBBB]">
                <p>Replied 300 times</p>
                <p className="text-text-[#BBBBBB]">in forum</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-10 items-center justify-center ">
                <Image
                  src="/badgeGreen.png"
                  alt="badgeRed"
                  width={30}
                  height={40}
                  className="h-9 w-7 text-green-400"
                />
              </div>
              <div className="text-xs text-[#BBBBBB]">
                <p>4 weeks streak</p>
                <p className="text-text-[#BBBBBB]">dev releases</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mb-4 flex gap-2 pr-14">
            <button className="flex-1 rounded  bg-transparent py-2 text-xs font-semibold text-black bg-white">
              View Portfolio
            </button>
            <button className="flex-1 rounded  bg-transparent py-2 text-xs font-semibold text-black bg-white">
              Buy
            </button>
          </div>

          {/* Footer */}
          <a
            href="#"
            className="flex items-center text-sm text-[#F2F2F2] underline "
          >
            View Creator
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
