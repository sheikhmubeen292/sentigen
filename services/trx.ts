import { TransactionConfirmationStatus } from "@solana/web3.js";

import { serverUrl } from "@/utils/constant";
import { connection } from "@/utils/solana";

export const delay = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const checkAndConfirmTrx = async (txHash: string) => {
  try {
    let receiptMint: TransactionConfirmationStatus | string = "";
    while (receiptMint !== "confirmed") {
      const result = await connection.getSignatureStatus(txHash);
      receiptMint = result?.value?.confirmationStatus as string;
      if (receiptMint === "confirmed") {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  } catch (e) {
    console.log("error in confirmation", e);
  }
};

export const saveTrx = async (
  amountReceived: string,
  wallet: string,
  type: string,
  trxHash: string,
  amount: string,
  tokenMint: string,
  coin: string
) => {
  const saveData = {
    amountReceived,
    wallet,
    type,
    trxHash,
    amount,
    tokenMint,
    coin,
  };

  const response = await fetch(serverUrl + "/tx/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: saveData,
    }),
  });
  const trxData = await response.json();

  console.log(trxData, "trxData");
};
