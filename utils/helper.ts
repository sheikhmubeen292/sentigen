import { transactionBuilder, type Signer } from "@metaplex-foundation/umi";
import { fromWeb3JsInstruction } from "@metaplex-foundation/umi-web3js-adapters";
import { type TransactionInstruction } from "@solana/web3.js";

const cleanObject = <T extends Record<string, unknown>>(obj: T): T => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string" && obj[key] === "") {
      delete obj[key];
    }
  });
  return obj;
};

const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
};

const generateTrxBuilder = (
  instruction: TransactionInstruction,
  signers: Signer[],
  bytesCreatedOnChain: number
) => {
  return transactionBuilder([
    {
      instruction: fromWeb3JsInstruction(instruction),
      signers: signers,
      bytesCreatedOnChain,
    },
  ]);
};

export { cleanObject, isValidUrl, generateTrxBuilder };
