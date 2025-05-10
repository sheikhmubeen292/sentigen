import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const networkUrl =
  "https://smart-attentive-meadow.solana-mainnet.quiknode.pro/377c9b279bddd4354b175fadc50095201ecee959/";
// export const networkUrl =
//   "https://side-alpha-wave.solana-devnet.quiknode.pro/c9a880c08c5c942c266e677f3cdfe68ed4b58828";

export const connection = new Connection(networkUrl);

export const programId = new PublicKey(
  "Ct1hXFVjP5zoCFU5JWyEaA2weJw7T76snBKhzW6jtoJo"
);
export const WSOL_ADDRESS = new PublicKey(
  "So11111111111111111111111111111111111111111"
);

export const sentigenToken = new PublicKey(
  "DyK7G7epXKQAioQqc661HCYAYbFfv5bQK2ea4UqGFXn5"
);

export const ownerPubKey = new PublicKey(
  "EpEY4AipQLJ5gmkhfk8qJixUs2t7mv2Ygj7xmJV7PeRQ"
);

export const platformOwner = new PublicKey(
  "D6HDkzuic5JhV2cQLhFwUqxgUMS6boqNy8sXwtxJswoi"
);
export const feeOwner = new PublicKey(
  "7YUfy2Ak8DmCUDMGV8HFEuuAyKf1hKD8CS3iTXQ4E6pH"
);

export const pdaBaseTokenPlatform = new PublicKey(
  "JBGrcseNgTdYa1hbRY2XGcMjdK32PvqYPi8jACmVFDLF"
);
export const pdaBaseTokenAgentVault = new PublicKey(
  "8PTwUmgDdps8kT6Wj5WWC3Uy9Aw88h4Y6yocMqX33Nu8"
);

export const tokenInitialSupply = 1000000000;
export const tokenMintAmount = 1000000000 * LAMPORTS_PER_SOL;
export const boundingCurveCapUsd = 33000; // max cap $33000 USD
export const PROPORTION = 13;

export const JitoUrl = "https://amsterdam.mainnet.block-engine.jito.wtf/api/v1";
// export const JitoUrl = "https://london.mainnet.block-engine.jito.wtf/api/v1";
// export const JitoUrl = "https://mainnet.block-engine.jito.wtf/api/v1";
export const JitoTip = 0.001;
export const JitoWallet = "ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt";
