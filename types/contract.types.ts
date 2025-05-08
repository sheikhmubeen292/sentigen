import { IUser } from "./user.types";

// export type Create_Token = {
//   name: string;
//   ticker: string;
//   description: string;
//   youtubeUrl?: string;
//   tiktokUrl?: string;
//   discordUrl?: string;
//   twitterUrl?: string;
//   telegramUrl?: string;
//   websiteUrl?: string;
// };

export type Create_Token = {
  name: string;
  ticker: string;
  description: string;
  twitterUrl: string;
  telegramUrl: string;
  websiteUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  discordUrl: string;
  tokenFee: number;
  maxTokenFee: number;
};

export type ITokenItem = {
  id: string;
  creator: string;
  name: string;
  ticker: string;
  description: string;
  tokenMint: string;
  tokenPrivate: string;
  isLiquidityAdded: boolean;
  date: string;
  imgUrl: string;
  coverImgUrl?: string;
  totalComments?: number;
  marketCap: number;
  twitterUrl?: string;
  telegramUrl?: string;
  websiteUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  discordUrl?: string;
  price?: string;
  createdAt: string;
};

export type HeldTokenItem = {
  id: string;
  user: string;
  coin: string;
  createdAt: string;
  coinRef: ITokenItem;
};

export type ITokenDetail = ITokenItem & {
  comments?: number;
  user: IUser;
  agentFee?: number;
  tags?: [];
  tokenFee: number;
  maxTokenFee: number;
  seed: string;
};

export type Metrics = {
  buyAmount: number;
  sellAmount: number;
  buyVolume: number;
  sellVolume: number;
  buyHolders: number;
  sellHolders: number;
  totalHolders: number;
};

export type TokenComment = {
  id: string;
  uid: string;
  title: string;
  user: string;
  userRef: {
    _id: string;
    name: string;
    profilePicture: string;
    wallet: string;
  };
  createdAt: string;
  isLikedByMe: boolean;
  totalLikes: number;
  image: string;
  replyComment: string | null;
};
