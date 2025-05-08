import { Keypair, TransactionInstruction } from "@solana/web3.js";

export type TrxHistory = {
  id: string;
  wallet: string;
  amount: number;
  amountReceived: number;
  trxHash: string;
  type: string;
  coin: string;
  tokenMint: string;
  createdAt: string;
  tokenPrice: number;
  usdPrice: number;
};

export type BundleTransaction = {
  instructions: TransactionInstruction[];
  signers?: Keypair[];
};
