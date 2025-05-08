"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { tokenInitialSupply, tokenMintAmount } from "@/utils/solana";

interface AgentPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  createAgent: () => void;
  amount: string | number;
  returnAmount: string | number;
  setAmount: (value: string) => void;
  tokenData: any;
  balance: number;
}

export function AgentPurchaseDialog({
  open,
  onOpenChange,
  createAgent,
  amount,
  returnAmount,
  setAmount,
  tokenData,
  balance,
}: AgentPurchaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content md:max-w-[425px] max-w-[350px] bg-white dark:bg-[#1F1F1F] rounded-[16px] text-white border-0 outline-none shadow-none">
        <DialogHeader>
          <DialogTitle className="text-[20px] text-black dark:text-white font-Audiowide text-center">
            CHOOSE THE AMOUNT OF
            <br /> $AGENT YOU WANT TO BUY
          </DialogTitle>
          <DialogDescription className="text-[#7A7A7A] text-[13px] text-center">
            It's recommended you buy at least 1% of your token supply
          </DialogDescription>
        </DialogHeader>

        {/* Input Area */}
        <div
          className={`mt-0 rounded-xl p-[1px] ${
            amount
              ? "bg-gradient-to-r from-[#00F0FF] to-[#00FF85]"
              : "bg-[#eeeef0] dark:bg-[#252525]"
          }`}
        >
          <div className="bg-[#eeeef0] dark:bg-[#252525] rounded-xl p-1 flex justify-between items-center">
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent w-24 text-black dark:text-white text-lg border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="flex items-center pr-2 gap-2 text-[#7A7A7A] text-[14px]">
              <span>Balance: {balance}</span>
              <Image src={"/favlogo.png"} width={32} height={32} alt="" />
            </div>
          </div>
        </div>

        {/* Return Info */}
        <div className=" flex items-center gap-2 text-black dark:text-[#F2F2F2] text-[14px]">
          <span>
            You will receive {Number(returnAmount).toFixed(3)} (
            {Number((Number(returnAmount) * 100) / tokenInitialSupply).toFixed(
              2
            )}{" "}
            %)
          </span>
          <Image
            src={tokenData?.profilePicture || "/dummy.png"}
            width={32}
            height={32}
            alt=""
          />
        </div>

        {/* Fee Breakdown */}
        <div className="mt-6 space-y-2 bg-[#eeeef0] dark:bg-[#252525] rounded-[16px] p-3 ">
          <div className="flex justify-between text-[#7A7A7A] text-[14px]">
            <span>AGENT CREATION FEE</span>
            <span>300.00</span>
          </div>
          <div className="flex justify-between text-[#7A7A7A] text-[14px]">
            <span>YOUR INITIAL BUY</span>
            <span>{amount}</span>
          </div>
          <div className="flex justify-between text-black dark:text-[#F2F2F2] text-[16px] font-semibold">
            <span>TOTAL</span>
            <span>872.12</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <Button
            variant="secondary"
            className="bg-[#eeeef0] dark:bg-[#2a2a2a] text-black dark:text-white border-0 w-[48%] h-[50px]"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={createAgent}
            className="bg-gradient-to-r from-[#00F0FF] to-[#00FF85] w-[48%] h-[50px] text-black hover:opacity-90 border-0"
          >
            Launch Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
