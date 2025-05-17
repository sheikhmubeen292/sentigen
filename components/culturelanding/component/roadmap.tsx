"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export default function Roadmap() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const timelineItems: TimelineItem[] = [
    {
      id: "1",
      date: "Aug 2024",
      title: "First concept release",
      description:
        "The idea that started it all. This marked the first glimpse of SNTI's vision—blending streetwear with a deeper cultural message.",
      image: "/visionBg.png",
    },
    {
      id: "2",
      date: "Feb 2025",
      title: "Product Launch",
      description:
        "SKTN hit the shelves, and the response was loud. The launch proved that the brands fusion of style and meaning resonated with the community.",
    },
    {
      id: "3",
      date: "Feb 2025",
      title: "Product Launch",
      description:
        "SKTN hit the shelves, and the response was loud. The launch proved that the brands fusion of style and meaning resonated with the community.",
    },
    {
      id: "4",
      date: "Feb 2025",
      title: "Product Launch",
      description:
        "SKTN hit the shelves, and the response was loud. The launch proved that the brands fusion of style and meaning resonated with the community.",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const currentScroll = scrollContainerRef.current.scrollLeft;

    scrollContainerRef.current.scrollTo({
      left:
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Desktop view */}
      <div className="px-4  hidden md:block relative group w-full min-h-[450px] py-6 mt-10">
        <h3 className="absolute left-4 top-0 text-sm font-normal text-[#F2F2F2]">
          Roadmap
        </h3>
        <div
          className="absolute w-full h-full left-0 top-0"
          style={{ filter: "url(#roadmap-round-desktop)" }}
        >
          <div
            className={cn(
              "absolute w-full h-full",
              "[clip-path:polygon(21%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_6%,_21%_6%)]",
              "md:[clip-path:polygon(6%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_5%,_6%_5%)]"
            )}
            style={{ backgroundColor: "#181b1c" }}
          >
            <div className="h-full flex items-center flex-col justify-center text-white text-base md:text-2xl px-4">
              <div className="w-full text-white p-6 rounded-lg mt-4">
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto gap-0 pb-8"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {timelineItems.map((item, index) => (
                    <div key={item.id} className="min-w-[350px] relative">
                      <div className="px-6 mt-9 h-[290px] flex flex-col justify-end">
                        <div className="relative">
                          {item.image ? (
                            <>
                              <div className="rounded-lg overflow-hidden">
                                <div>
                                  <div className="mb-2 font-medium mt-3">
                                    <span className="text-[#F2F2F2] font-semibold font-[18px]">
                                      {item.date}:
                                    </span>{" "}
                                    <span className="text-[#F2F2F2] font-semibold font-[18px]">
                                      {item.title}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[#BBBBBB]">
                                    {item.description}
                                  </p>
                                </div>
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  width={250}
                                  height={150}
                                  className="object-cover rounded-lg mt-3"
                                />
                              </div>
                            </>
                          ) : (
                            <div>
                              <div className="mb-2 font-medium">
                                <span className="text-white">{item.date}:</span>{" "}
                                <span className="text-white">{item.title}</span>
                              </div>
                              <p className="text-sm text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          )}

                          {index < timelineItems.length - 1 && (
                            <div className="absolute top-0 -right-6 h-full border-r border-dashed border-[#4E5051]"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative border-t border-dashed border-[#4E5051] mt-1">
                  {timelineItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="absolute w-3 h-3 bg-white rounded-full top-1/2 transform -translate-y-1/2"
                      style={{
                        left: `calc(${
                          (index + 0.5) * (100 / timelineItems.length)
                        }%)`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="roadmap-round-desktop" colorInterpolationFilters="sRGB">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Mobile view */}
      <div className="px-4 md:hidden relative group w-full min-h-[750px] py-6 mt-10">
        <h3 className="absolute left-4 top-2 text-sm font-normal text-[#F2F2F2]">
          Roadmap
        </h3>
        <div
          className="absolute w-full h-full left-0 top-0"
          style={{ filter: "url(#roadmap-round-mobile)" }}
        >
          <div
            className={cn(
              "absolute w-full h-full",
              "[clip-path:polygon(23%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_5%,_23%_5%)]"
            )}
            style={{ backgroundColor: "#181b1c" }}
          >
            <div className="h-full flex items-center flex-col justify-center text-white text-base md:text-2xl px-4">
              <div className="w-full text-white p-6 rounded-lg mt-14">
                <div className="relative pl-8">
                  {/* Vertical timeline line */}
                  <div className="absolute left-3 top-2 bottom-2 border-l border-dashed border-[#4E5051]"></div>

                  {timelineItems.map((item, index) => (
                    <div key={item.id} className="mb-8 relative">
                      {/* Timeline dot */}
                      <div
                        className={`absolute -left-5 top-1 w-3 h-3 rounded-full transform -translate-x-1/2 ${
                          index === 1 || index === 2
                            ? "bg-white"
                            : "bg-gray-500"
                        }`}
                      ></div>

                      {/* Content */}
                      <div className="ml-6">
                        <div className="mb-2 font-medium">
                          <span className="text-[#F2F2F2] font-semibold font-[18px]">
                            {item.date}:
                          </span>{" "}
                          <span className="text-[#F2F2F2] font-semibold font-[18px]">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-xs text-[#BBBBBB] mb-3">
                          {item.description}
                        </p>

                        {/* Image if available */}
                        {item.image && (
                          <div className="rounded-lg overflow-hidden mt-2">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              width={250}
                              height={150}
                              className="object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="roadmap-round-mobile" colorInterpolationFilters="sRGB">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-x-auto {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </>
  );
}
