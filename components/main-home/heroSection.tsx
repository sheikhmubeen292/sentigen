"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowBigLeftDash,
  ArrowBigRight,
  ArrowUpRight,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FC, Fragment, useState } from "react";
import clsx from "clsx";
import { useAuth } from "@/utils/constant";

const marketCap = "$120m";
const marketCapChange = 8.62;
const holders = "77k";
const followersOnX = "138k";
const isPositive = marketCapChange > 0;
const comonBtnStyling = {
  display: "flex",
  position: "absolute",
  zIndex: 1,
  cursor: "pointer",
  top: "24px",
};

interface TeamNextArrowProps {
  onClick: () => void;
}

export default function HeroSection() {
  const { isChatOpen } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const TeamNextArrow: FC<TeamNextArrowProps> = ({ onClick }) => {
    return (
      <div
        className={clsx(
          "absolute top-[580px] right-[72%] md:right-[20px] transition-all duration-500 ease-in-out -z-1",
          {
            "md:top-[380px]": isChatOpen,
            "md:top-[480px]": !isChatOpen,
          }
        )}
        onClick={onClick}
      >
        <Image
          src="/arrowRight.png"
          alt="arrowleft"
          width={40}
          height={40}
          className="w-[45px] h-[45px]"
        />
      </div>
    );
  };

  const TeamPrevArrow: FC<TeamNextArrowProps> = ({ onClick }) => {
    return (
      <div
        className={clsx(
          "absolute top-[580px] w-[11%] md:w-[3%]  right-[88%] md:right-[69px] transition-all duration-500 ease-in-out z-1 md:z-10",
          {
            "md:top-[380px]": isChatOpen,
            "md:top-[480px]": !isChatOpen,
          }
        )}
        onClick={onClick}
      >
        <Image
          src="/arrowleft.png"
          alt="arrowleft"
          width={40}
          height={40}
          className="w-[40px] md:w-[50px] h-[45px]"
        />{" "}
      </div>
    );
  };

  const settings = {
    nextArrow: <TeamNextArrow onClick={() => {}} />,
    prevArrow: <TeamPrevArrow onClick={() => {}} />,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    // arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="p-4 max-w-[1920px] mx-auto">
      <div className="w-full hidden md:block">
        <Slider {...settings}>
          {[1, 2, 3, 4].map((item) => {
            return (
              <div className="relative max-h-[685px] w-full rounded-lg">
                {/* Content */}
                <Image
                  src="/sun_heroImg.png"
                  alt="sun"
                  width={500}
                  height={200}
                  className="w-full h-fit mr-1    rounded-lg"
                />{" "}
                <div className="w-full absolute bottom-4 px-6">
                  <button className="border rounded-lg border-[#FFB78D] flex gap-1 items-center px-3  h-[40px]">
                    <Image
                      src="/fire.png"
                      alt="fire"
                      width={50}
                      height={50}
                      className="w-5 h-6 mr-2"
                    />{" "}
                    <p className="text-sm text-[#FFB78D]">Featured</p>
                  </button>
                  <div className="mb-2 mt-6 w-[300px] h-[78px] cursor-pointer">
                    <Image
                      src="/sentigentHero.png"
                      alt="fire"
                      width={200}
                      height={300}
                      className="w-[290px] h-[70px]"
                    />
                  </div>
                  <p className="text-[#F2F2F2] text-sm w-[77%] ">
                    Sentigen is your AI co-founder. You bring the idea — <br />
                    Sentigen handles the rest.
                  </p>

                  <div className="flex items-center gap-6 mt-4">
                    <Button className="rounded-[4px] h-[40px] font-semibold text-xs text-[#1F1F1F] bg-gradient-to-r from-[#4599FF] to-[#04FEAE] ">
                      <Image src="/eye.png" alt="eye" width={28} height={10} />
                      View Project
                    </Button>
                    <Button className="rounded-[4px] h-[40px] text-xs font-semibold text-[#1F1F1F] bg-[#F2F2F2]">
                      <Image
                        src="/fireInvest.png"
                        alt="fireInvest"
                        width={28}
                        height={10}
                        className="w-[25px] h-[25px] mt-[-2px]"
                      />
                      Invest
                    </Button>
                    <Image src="/save.png" alt="save" width={28} height={32} />
                  </div>

                  <div className="flex items-center justify-between text-white rounded-lg mt-7">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col mt-2">
                        <span className="text-sm text-[#7A7A7A]">
                          Market Cap
                        </span>
                        <div className="flex items-center gap-2 ">
                          <span className="text-lg font-semibold text-[#F2F2F2]">
                            {marketCap}
                          </span>
                          <span
                            className={`text-xs ${
                              isPositive
                                ? "text-[#04FEAE] font-semibold text-[11px]"
                                : "text-red-500"
                            } flex items-center`}
                          >
                            {marketCapChange}%
                            {isPositive && (
                              <Image
                                src="/upArrow.png"
                                alt="upArrow"
                                width={10}
                                height={10}
                                className="w-3 h-2 mb-[2px] ml-[3px]"
                              />
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col mt-2">
                        <span className="text-sm text-[#7A7A7A]">Holders</span>
                        <span className="text-lg font-semibold text-[#F2F2F2]">
                          {holders}
                        </span>
                      </div>

                      <div className="flex flex-col mt-2  ">
                        <span className="text-sm text-[#7A7A7A]">
                          Followers on X
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-semibold text-[#F2F2F2]">
                            {followersOnX}
                          </span>
                          <Image
                            src="/exteralLink.png"
                            alt="exteralLink"
                            width={10}
                            height={10}
                            className="h-4 w-4 text-[#7A7A7A]"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex items-center gap-2 cursor-pointer  ">
                  <Image
                    src="/arrowleft.png"
                    alt="arrowleft"
                    width={40}
                    height={40}
                    className=""
                  />{" "}
                  <Image
                    src="/arrowRight.png"
                    alt="arrowleft"
                    width={40}
                    height={40}
                    className=""
                  />
                </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      {/* mobile view */}

      <div className="block md:hidden">
        <Slider {...settings}>
          {[1, 2, 3, 4].map((item, i) => {
            return (
              <Fragment key={item + i}>
                <div
                  className="h-[180px] w-full  bg-[url('/sun_heroImg.png')] bg-cover bg-center bg-no-repeat flex md:hidden flex-row items-start justify-between p-4 rounded-lg"
                  style={{ backgroundSize: "100% 100%" }}
                >
                  {/* Content */}
                  <button className="border rounded-lg border-[#FFB78D] flex items-center justify-between w-[125px] px-3 h-[44px]">
                    <Image
                      src="/fire.png"
                      alt="fire"
                      width={50}
                      height={50}
                      className="w-8 h-7 mr-1 object-contain"
                    />
                    <p className="text-sm text-[#FFB78D]">Featured</p>
                  </button>
                  <Image
                    src="/save.png"
                    alt="save"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex md:hidden flex-col">
                  <div className="mb-4 mt-6 w-[300px] h-[78px] cursor-pointer">
                    <Image
                      src="/sentigentHero.png"
                      alt="fire"
                      width={200}
                      height={300}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-[#F2F2F2] text-sm">
                    Sentigen is your AI co-founder. You bring the idea —
                    Sentigen handles the rest.
                  </p>

                  <div className="flex items-center flex-col w-full gap-6 mt-4">
                    <Button className="rounded-[4px] h-[40px] w-full font-semibold text-[#1F1F1F] bg-gradient-to-r from-[#4599FF] to-[#04FEAE] ">
                      <Image src="/eye.png" alt="eye" width={28} height={10} />
                      Create Agent
                    </Button>
                    <Button className="rounded-[4px] h-[40px] w-full font-semibold text-[#1F1F1F] bg-white">
                      <Image
                        src="/fireInvest.png"
                        alt="fireInvest"
                        width={28}
                        height={10}
                      />
                      Invest
                    </Button>
                  </div>

                  <div className="flex items-start flex-col text-white rounded-lg mt-7 ">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col mt-2">
                        <span className="text-sm text-[#7A7A7A]">
                          Market Cap
                        </span>
                        <div className="flex items-center gap-2 ">
                          <span className="text-lg font-semibold">
                            {marketCap}
                          </span>
                          <span
                            className={`text-xs ${
                              isPositive ? "text-[#04FEAE]" : "text-red-500"
                            } flex items-center`}
                          >
                            {isPositive && <ChevronUp className="h-3 w-3" />}
                            {marketCapChange}%
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col mt-2">
                        <span className="text-sm text-[#7A7A7A]">Holders</span>
                        <span className="text-lg font-semibold">{holders}</span>
                      </div>

                      <div className="flex flex-col mt-2">
                        <span className="text-sm text-[#7A7A7A]">
                          Followers on X
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-semibold">
                            {followersOnX}
                          </span>
                          <Image
                            src="/exteralLink.png"
                            alt="exteralLink"
                            width={10}
                            height={10}
                            className="h-4 w-4 text-[#7A7A7A]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex  gap-2 mt-6 ">
                      {/* <Image
                      src="/arrowleft.png"
                      alt="arrowleft"
                      width={40}
                      height={40}
                      className=""
                    />{" "}
                    <Image
                      src="/arrowRight.png"
                      alt="arrowleft"
                      width={40}
                      height={40}
                      className=""
                    /> */}
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
