"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableData } from "@/lib/constant";
import { cn } from "@/lib/utils";
import type { ITokenDetail } from "@/types/contract.types";
import type { TrxHistory } from "@/types/tx.types";
import { useAuth, walletAddressShorten } from "@/utils/constant";
import { getExactDecimals } from "@/utils/decimals";
import { ChevronDown, Circle, Fish } from "lucide-react";
import dayjs from "dayjs";

const orders2 = [
  {
    address: "0xf7c0",
    type: "Buy",
    amount: "4,291.2192",
    price: "4,291.2192",
    total: "4,291.2192",
    time: "30s",
  },
  {
    address: "0xf7c0",
    type: "Buy",
    amount: "1,702.2192",
    price: "1,702.2192",
    total: "1,702.2192",
    time: "42s",
  },
  {
    address: "0xf7c0",
    type: "Buy",
    amount: "897.742",
    price: "897.742",
    total: "897.742",
    time: "2m",
  },
  {
    address: "0xf7c0",
    type: "Sell",
    amount: "502.116",
    price: "502.116",
    total: "502.116",
    time: "5m",
  },
  {
    address: "0xf7c0",
    type: "Buy",
    amount: "328.01",
    price: "328.01",
    total: "328.01",
    time: "8h",
  },
  {
    address: "0xf7c0",
    type: "Sell",
    amount: "502.116",
    price: "502.116",
    total: "502.116",
    time: "5m",
  },
  {
    address: "0xf7c0",
    type: "Buy",
    amount: "328.01",
    price: "328.01",
    total: "328.01",
    time: "8h",
  },
];
type Props = {
  trxHistory: TrxHistory[];
  tokenData: ITokenDetail;
};

const getShortRelativeTime = (timestamp: string) => {
  const now = dayjs();
  const time = dayjs(timestamp);
  const diffInSeconds = now.diff(time, "second");

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  }
};

export default function OrderBook({ trxHistory, tokenData }: Props) {
  const { isChatOpen } = useAuth();

  return (
    <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
      {/* Global styles to ensure consistent background color */}
      <style jsx global>{`
        * {
          --table-bg: #181b1c !important;
        }
        .bg-\\[\\#181B1C\\] {
          background-color: #181b1c !important;
        }
        table,
        thead,
        tbody,
        tr {
          background-color: #181b1c !important;
        }
      `}</style>

      <div className="flex flex-col gap-4">
        <div className="relative w-full min-h-[400px] py-6 px-10">
          <h3 className="absolute left-2 top-1 text-sm font-normal text-[#F2F2F2]">
            Holders
          </h3>
          <div
            className="absolute w-full h-full left-0 top-0"
            style={{ filter: "url(#round)" }}
          >
            <div
              className="absolute w-full h-full smClipPath"
              style={{
                backgroundColor: "#181b1c",
                background: "#181b1c !important",
                transition: "none",
                color: "#F2F2F2",
              }}
            >
              <div
                className="hidden md:flex mb-6 ml-[110px] mt-[6px]"
                style={{
                  backgroundColor: "#181b1c",
                  background: "#181b1c !important",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-gray-300">Top 10: 13%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-300">Top 49: 20%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-300">Others: 68%</span>
                  </div>
                </div>
              </div>
              <div
                className="flex md:hidden mt-[39px] px-3"
                style={{
                  backgroundColor: "#181b1c",
                  background: "#181b1c !important",
                }}
              >
                <div className="flex items-center flex-wrap jusitfy-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-gray-300">Top 10: 13%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-300">Top 49: 20%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-300">Others: 68%</span>
                  </div>
                </div>
              </div>

              <div className="p-6" style={{ backgroundColor: "#181b1c" }}>
                <div className="h-[300px] overflow-y-auto rounded-md w-full scrollbar-hide">
                  <Table className="border-none w-full scrollbar-hide">
                    <TableHeader
                      style={{ backgroundColor: "#181b1c" }}
                      className="border-none"
                    >
                      <TableRow style={{ backgroundColor: "#181b1c" }}>
                        <TableHead
                          className="text-[#7A7A7A]"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          Address
                        </TableHead>
                        <TableHead
                          className="flex justify-end items-center gap-1 font-normal text-sm text-[#7A7A7A] w-full"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          <p>Amount (SNTI)</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="#7A7A7A"
                          >
                            <path d="M6 9l6 6 6-6H6z" />
                          </svg>
                        </TableHead>
                        <TableHead
                          className="text-right text-[#7A7A7A]"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          Balance
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody style={{ backgroundColor: "#181b1c" }}>
                      {tableData.map((row, index) => (
                        <TableRow
                          key={index}
                          className="border-[#303030] hover:bg-transparen"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          <TableCell
                            className="flex items-center gap-2 font-normal text-sm text-[#7A7A7A] w-full"
                            style={{ backgroundColor: "#181b1c" }}
                          >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1F1F1F]"></div>
                            <span className="truncate">{row.address}</span>{" "}
                            <Fish strokeWidth={3} className="w-4 h-4" />
                          </TableCell>
                          <TableCell
                            className="w-[196px] text-center font-sm text-[#F2F2F2]"
                            style={{ backgroundColor: "#181b1c" }}
                          >
                            {row.amount}
                          </TableCell>
                          <TableCell
                            className="text-right font-sm text-[#F2F2F2]"
                            style={{ backgroundColor: "#181b1c" }}
                          >
                            {row.balance}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
        {/* //////////////////// */}

        <div className="relative w-full min-h-[400px] scrollbar-hide py-6 px-10 mt-3">
          <h3 className="absolute left-2 top-1 text-sm font-normal text-[#F2F2F2]">
            Top Smart Wallet
          </h3>
          <div
            className="absolute w-full h-full left-0 top-0"
            style={{ filter: "url(#round)" }}
          >
            <div
              className={cn(
                `absolute w-full h-full [clip-path:polygon(39%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_8%,_39%_8%)] 
 md:[clip-path:polygon(18.25%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_8.5%,_18.25%_8%)] }`
              )}
              style={{
                backgroundColor: "#181b1c",
                background: "#181b1c !important",
                transition: "none",
                color: "#F2F2F2",
              }}
            >
              <div
                className="rounded-lg p-4 mt-[30px]"
                style={{
                  backgroundColor: "#181b1c",
                  background: "#181b1c !important",
                }}
              >
                <div className="overflow-x-auto">
                  <div
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: "#181b1c",
                      background: "#181b1c !important",
                    }}
                  >
                    <div className="overflow-x-auto">
                      <div className="max-h-[300px] scrollbar-hide overflow-y-auto">
                        <table
                          className="w-full text-sm"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          <thead
                            className="text-[#7a7a7a] text-xs sticky top-0 z-10"
                            style={{ backgroundColor: "#181b1c" }}
                          >
                            <tr style={{ backgroundColor: "#181b1c" }}>
                              <th
                                className="text-left font-normal text-sm text-[#7A7A7A] pb-2"
                                style={{ backgroundColor: "#181b1c" }}
                              >
                                Address
                              </th>
                              <th
                                className="text-left font-normal text-sm text-[#7A7A7A] pb-2"
                                style={{ backgroundColor: "#181b1c" }}
                              >
                                Type
                              </th>
                              <th
                                className="text-left font-normal text-sm text-[#7A7A7A] pb-2"
                                style={{ backgroundColor: "#181b1c" }}
                              >
                                Amount (SNTI)
                              </th>
                              <th
                                className="text-left font-normal text-sm text-[#7A7A7A] pb-2"
                                style={{ backgroundColor: "#181b1c" }}
                              >
                                Price (USD)
                              </th>
                              <th
                                className="text-left font-normal text-sm text-[#7A7A7A] pb-2"
                                style={{ backgroundColor: "#181b1c" }}
                              >
                                Total (USD)
                              </th>
                              <th
                                className="text-left font-normal text-sm text-[#7A7A7A] pb-2"
                                style={{ backgroundColor: "#181b1c" }}
                              >
                                Time ago
                              </th>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: "#181b1c" }}>
                            {trxHistory.map((order, index) => (
                              <tr
                                key={index}
                                className="border-t border-[#1f1f1f]"
                                style={{ backgroundColor: "#181b1c" }}
                              >
                                <td
                                  className="py-2 flex items-center gap-1"
                                  style={{ backgroundColor: "#181b1c" }}
                                >
                                  <span className="font-normal text-sm text-[#7A7A7A]">
                                    {walletAddressShorten(order.wallet)}
                                  </span>
                                  <span className="inline-block w-4 h-4 bg-[#1f1f1f] rounded-full"></span>
                                </td>
                                <td
                                  className={`py-2 ${
                                    order.type === "buy"
                                      ? "text-[#04feae]"
                                      : "text-[#cc434b]"
                                  }`}
                                  style={{ backgroundColor: "#181b1c" }}
                                >
                                  {order.type}
                                </td>
                                <td
                                  className="py-2 font-normal text-sm text-[#F2F2F2]"
                                  style={{ backgroundColor: "#181b1c" }}
                                >
                                  {getExactDecimals(order.amount, 3)}
                                </td>
                                <td
                                  className="py-2 font-normal text-sm text-[#F2F2F2]"
                                  style={{ backgroundColor: "#181b1c" }}
                                >
                                  {getExactDecimals(order.usdPrice, 6)}
                                </td>
                                <td
                                  className="py-2 font-normal text-sm text-[#F2F2F2]"
                                  style={{ backgroundColor: "#181b1c" }}
                                >
                                  {getExactDecimals(order.amountReceived, 2)}
                                </td>
                                <td
                                  className="py-2 font-normal text-sm text-[#F2F2F2]"
                                  style={{ backgroundColor: "#181b1c" }}
                                >
                                  {getShortRelativeTime(order.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
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
        {/* ///////////////// */}
      </div>
      {/*  */}
      <div className="relative w-full min-h-[400px] py-6 px-10">
        <h3
          className={cn(
            `absolute ${
              isChatOpen ? "left-0" : "left-3"
            } top-2 text-sm font-normal text-[#F2F2F2]`
          )}
        >
          Order Book
        </h3>
        <div
          className="absolute w-full h-full left-0 top-0"
          style={{ filter: "url(#round)" }}
        >
          <div
            className={cn(
              `absolute w-full h-full [clip-path:polygon(29%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_9%,_29%_9%)]`,
              `md:[clip-path:polygon(13%_0%,_100%_0%,_100%_100%,_0%_100%,_0%_4%,_13%_4%)]`
            )}
            style={{
              backgroundColor: "#181b1c",
              background: "#181b1c !important",
              transition: "none",
              color: "#F2F2F2",
            }}
          >
            <div
              className="rounded-lg p-4 mt-[30px]"
              style={{
                backgroundColor: "#181b1c",
                background: "#181b1c !important",
                transition: "none",
              }}
            >
              <div className="max-h-[750px] overflow-y-auto">
                <Table>
                  <TableHeader style={{ backgroundColor: "#181b1c" }}>
                    <TableRow
                      className="border-b border-gray-800"
                      style={{ backgroundColor: "#181b1c" }}
                    >
                      <TableHead
                        className="text-[#7A7A7A] font-normal text-sm"
                        style={{ backgroundColor: "#181b1c" }}
                      >
                        <div className="flex items-center">
                          Address <ChevronDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-[#7A7A7A] font-normal text-sm"
                        style={{ backgroundColor: "#181b1c" }}
                      >
                        Type
                      </TableHead>
                      <TableHead
                        className="text-[#7A7A7A] font-normal text-sm"
                        style={{ backgroundColor: "#181b1c" }}
                      >
                        <div className="flex items-center ">
                          Price{" "}
                          <span className="text-[#17C671] ml-[2px]">USD</span>
                          <Circle className="ml-1 h-3 w-3 fill-green-500 text-green-500" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-[#7A7A7A] font-normal text-sm"
                        style={{ backgroundColor: "#181b1c" }}
                      >
                        Amount SNTI
                      </TableHead>
                      <TableHead
                        className="text-[#7A7A7A] font-normal text-sm"
                        style={{ backgroundColor: "#181b1c" }}
                      >
                        <div className="flex items-center">
                          Total{" "}
                          <span className="text-[#17C671] ml-[2px]">
                            ${tokenData.ticker}
                          </span>
                          <Circle className="ml-1 h-3 w-3 fill-green-500 text-green-500" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-[#7A7A7A] font-normal text-sm"
                        style={{ backgroundColor: "#181b1c" }}
                      >
                        <div className="flex items-center">
                          Time ago <ChevronDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody style={{ backgroundColor: "#181b1c" }}>
                    {trxHistory.map((transaction, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-gray-800"
                        style={{ backgroundColor: "#181b1c" }}
                      >
                        <TableCell
                          className="font-normal"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          <div className="flex items-center text-[#7a7a7a]">
                            <div className="h-4 w-4 rounded-full bg-gray-600 mr-2"></div>
                            {transaction.wallet.slice(0, 4)}...
                            {transaction.wallet.slice(-4)}{" "}
                            <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                          </div>
                        </TableCell>
                        <TableCell
                          className={`font-normal text-sm ${
                            transaction.type === "buy"
                              ? "text-[#17C671]"
                              : "text-[#CC434B]"
                          }`}
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          {transaction.type}
                        </TableCell>

                        <TableCell
                          className="text-[#F2F2F2] font-normal"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          {getExactDecimals(transaction.usdPrice, 6)}
                        </TableCell>
                        <TableCell
                          className="text-[#F2F2F2] font-normal"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          {transaction.type === "buy"
                            ? getExactDecimals(transaction.amount, 2)
                            : getExactDecimals(transaction.amountReceived, 2)}
                        </TableCell>
                        <TableCell
                          className="text-[#F2F2F2] font-normal"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          {transaction.type === "buy"
                            ? getExactDecimals(transaction.amountReceived, 2)
                            : getExactDecimals(transaction.amount, 2)}
                        </TableCell>
                        <TableCell
                          className="text-[#F2F2F2] font-normal"
                          style={{ backgroundColor: "#181b1c" }}
                        >
                          {getShortRelativeTime(transaction.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
