import { createContext, useContext } from "react";
import { enqueueSnackbar, VariantType } from "notistack";
import { io } from "socket.io-client";

import { AppContextType, IUser } from "@/types/user.types";

export const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://orca-app-plo5l.ondigitalocean.app"
    : "http://localhost:5001";

export const socket = io(serverUrl);

export const initiaUserState: IUser = {
  walletAddress: "",
  name: "",
  description: "",
  profilePicture: "",
  websiteUrl: "",
  twitterUrl: "",
  telegramUrl: "",
  youtubeUrl: "",
  tiktokUrl: "",
  discordUrl: "",
};

export const initalContextState: AppContextType = {
  user: initiaUserState,
  isChatOpen: false,
  setIsChatOpen: () => {},
};

export const showToast = (message: string, variant: VariantType = "error") => {
  enqueueSnackbar(message, { variant });
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

export const AppContext = createContext<AppContextType>(initalContextState);

export const useAuth = (): React.ContextType<typeof AppContext> => {
  return useContext(AppContext);
};

export const walletAddressShorten = (walletAddress: string): string => {
  if (!walletAddress) return "N/A";

  return walletAddress.slice(-7);
};

export const truncateWallet = (walletAddress: string): string => {
  if (!walletAddress) return "N/A";

  return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-6)}`;
};
