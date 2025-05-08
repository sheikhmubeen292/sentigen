"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { ITokenDetail } from "@/types/contract.types";

type Props = {
  tokensData: ITokenDetail[];
};

export default function CryptoTable({ tokensData }: Props) {
  const router = useRouter();

  const handleClick = (token: any) => {
    router.push(`/trading/${token.tokenMint}`);
  };

  return (
    <div className="p-4 mt-14 md:mt-1 max-w-[1920px] mx-auto">
      {/* <style jsx global>{`
        * {
          --table-bg: #181b1c !important;
        }
        .bg-\[\#181B1C\] {
          background-color: #181b1c !important;
        }
        table,
        thead,
        tbody,
        tr {
          background-color: #181b1c !important;
        }
      `}</style> */}
      <div className="relative w-full min-h-[700px]">
        <h3 className="absolute left-2 top-0 text-sm font-normal text-[#F2F2F2]">
          Project List
        </h3>
        <div
          className="absolute w-full h-full left-0 top-0"
          style={{ filter: "url(#round)" }}
        >
          <div
            className="absolute w-full h-full 
                     [clip-path:polygon(25%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_4%,_25%_4%)] 
                     md:[clip-path:polygon(7%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_4%,_7%_4%)] p-4"
            style={{
              backgroundColor: "#181B1C",
              background: "#181B1C !important",
              transition: "none",
              color: "#F2F2F2",
            }}
          >
            <div className="mt-[40px] p-2">
              <Tabs defaultValue="buy" className="w-[300px] mb-4">
                <TabsList className="w-full grid grid-cols-2 bg-transparent border rounded-lg">
                  <TabsTrigger
                    value="buy"
                    className="data-[state=active]:text-[#F2F2F2] data-[state=active]:font-semibold font data-[state=active]:bg-[#2C3132] rounded-md px-4 py-1 transition-all"
                  >
                    Marketshare
                  </TabsTrigger>
                  <TabsTrigger
                    value="sell"
                    className="data-[state=active]:text-[#F2F2F2] data-[state=active]:font-semibold data-[state=active]:bg-[#2C3132] rounded-md px-4 py-1 transition-all"
                  >
                    Mindshare
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div>
                <div className="h-[550px] overflow-y-auto overflow-x-auto rounded-md w-full scrollbar-hide">
                  <Table>
                    <TableHeader
                      style={{ backgroundColor: "#181B1C" }}
                      className="bg-[#181B1C]"
                    >
                      <TableRow className="border-b border-[#303030]">
                        <TableHead className="text-[#7A7A7A] font-normal">
                          <div className="flex items-center text-sm gap-2">
                            Projects
                            <Image
                              src="arrowdown.png"
                              alt="arrow"
                              width={10}
                              height={10}
                              className="mt-[1px]"
                            />
                          </div>
                        </TableHead>
                        <TableHead className="w-[130px] md:w-auto text-[#7A7A7A] text-right  flex items-center justify-end">
                          <div className="text-[#7A7A7A]  text-sm ont-normal flex items-center gap-2">
                            Market Cap
                            <Image
                              src="arrowdown.png"
                              alt="arrow"
                              width={10}
                              height={10}
                              className="mt-[1px]"
                            />
                          </div>
                        </TableHead>
                        <TableHead className="">
                          <p className="text-[#7A7A7A] font-normal text-sm text-right">
                            Market Cap %
                          </p>
                        </TableHead>
                        <TableHead className="text-[#7A7A7A] font-normal text-sm text-right">
                          TVL
                        </TableHead>
                        <TableHead className="text-[#7A7A7A] font-normal text-sm text-right">
                          Holders
                        </TableHead>
                        <TableHead className="text-[#7A7A7A] font-normal text-sm text-right">
                          24h Volume
                        </TableHead>
                        <TableHead className="text-[#7A7A7A] font-normal text-sm text-right">
                          Interferences
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tokensData.map((token) => (
                        <TableRow
                          key={token.id}
                          className="border-b border-zinc-700/50 cursor-pointer"
                          onClick={() => handleClick(token)}
                        >
                          <TableCell className="font-medium p-0">
                            <div className="flex items-center gap-3 w-[130px] md:w-auto">
                              <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center">
                                <Image
                                  src={token.imgUrl || "/placeholder.svg"}
                                  alt={token.name}
                                  width={34}
                                  height={34}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-[#F2F2F2]">
                                  {token.name}
                                </div>
                                <div className="text-xs font-normal bg-gradient-to-r from-[#4599FF] to-[#04FEAE] bg-clip-text text-transparent">
                                  ${token.ticker}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="p-0 text-right pr-0 md:pr-7 text-[#F2F2F2] font-normal text-sm">
                            {token.marketCap.toFixed(0)}
                          </TableCell>
                          <TableCell className="text-right text-[#17C671] font-normal">
                            <div className="flex items-center justify-end gap-1 pr-0 md:pr-6 text-sm">
                              +{100}
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-[#F2F2F2] text-sm font-normal">
                            {100}
                          </TableCell>
                          <TableCell className="text-right text-[#F2F2F2] text-sm font-normal">
                            {100}
                          </TableCell>
                          <TableCell className="text-right text-[#F2F2F2] pr-0 md:pr-9 text-sm font-normal">
                            {100}
                          </TableCell>
                          <TableCell className="text-right text-[#F2F2F2] pr-0 md:pr-9 text-sm font-normal">
                            {100}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SVG filter for rounded corners */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="round" colorInterpolationFilters="sRGB">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
