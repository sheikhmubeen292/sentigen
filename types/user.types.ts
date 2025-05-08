export type IUser = {
  walletAddress: string;
  name: string;
  description: string;
  profilePicture: string;
  websiteUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  discordUrl?: string;
};

export type AppContextType = {
  user: IUser;
  isChatOpen: boolean;
  setIsChatOpen: any;
};
