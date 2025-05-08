import { PublicKey } from "@solana/web3.js";

export type ISlipPage = {
  openModal: boolean;
  slippage: number;
  fee: number;
};

export type IPairData = {
  pairAddress: string;
  tokenBMint: string;
  tokenAAccount: string;
  tokenBAccount: string;
  total_supply: number;
  reserve_token: number;
  reserve_sol: number;
  reserveAToken: number;
  reserveBToken: number;
};

export type AccountState = {
  tokenA: PublicKey | null;
  tokenB: PublicKey | null;
  balanceA: number;
  balanceB: number;
};
