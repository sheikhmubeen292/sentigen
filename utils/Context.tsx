"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import base58 from "bs58";
import axios from "axios";

import { IUser } from "@/types/user.types";
import { AppContext, initiaUserState, serverUrl } from "./constant";
import SigningDialog from "@/components/signingDialog";

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { publicKey, connected, signMessage, disconnect, disconnecting } =
    useWallet();

  const [user, setUser] = useState<IUser>(initiaUserState);
  const [signMessageData, setSignMessageData] = useState("");
  const [isOpenConnectWallet, setIsOpenConnectWallet] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getUser = useCallback(async () => {
    const signedToken = localStorage.getItem("token");
    const response = await axios.get(`${serverUrl}/user/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: signedToken,
      },
    });

    if (response.status !== 200) throw new Error("User not found");

    // console.log(response.data, "response.dataresponse.data");

    setUser((prev) => ({
      ...prev,
      ...response?.data?.user,
    }));
  }, [publicKey]);

  const signMessageHandler = useCallback(async () => {
    try {
      if (!publicKey) {
        localStorage.clear();
        await disconnect();
        setIsOpenConnectWallet(false);
        return localStorage.setItem("isWalletConnected", "false");
      }
      const message = new TextEncoder().encode(signMessageData);
      if (!signMessage) return;

      const uint8arraySignature = await signMessage(message);

      const responseLogin = await axios.post(`${serverUrl}/user/login`, {
        signature: base58.encode(uint8arraySignature).toString(),
        publicKey: publicKey?.toString(),
      });

      if (responseLogin.status !== 201) throw new Error("Error logging in");

      setIsOpenConnectWallet(false);
      localStorage.setItem("token", responseLogin.data.token);
      localStorage.setItem("isWalletConnected", "true");

      setUser({
        walletAddress: responseLogin?.data?.user?.walletAddress || "",
        name: responseLogin?.data?.user?.name || "",
        description: responseLogin?.data?.user?.description || "",
        profilePicture: responseLogin?.data?.user?.profilePicture || "",
      });
    } catch (e) {
      console.log(e);
    }
  }, [disconnect, publicKey, signMessage, signMessageData]);

  const cancelSignMessage = async () => {
    try {
      localStorage.clear();
      await disconnect();
      router?.refresh();
      setIsOpenConnectWallet(false);
    } catch (e) {
      console.log(e);
      await disconnect();
      localStorage.clear();
      router?.refresh();
      setUser(initiaUserState);
    }
  };

  useEffect(() => {
    const walletToken = localStorage.getItem("isWalletConnected");

    if (!walletToken) {
      localStorage.clear();
      return localStorage.setItem("isWalletConnected", "false");
    }

    const signedToken = localStorage.getItem("token");
    (async () => {
      try {
        if (publicKey) {
          if (!signedToken || !walletToken || walletToken === "false") {
            const response = await fetch(
              `${serverUrl}/user/get-nonce?publicKey=${publicKey?.toString()}`
            );
            if (!response.ok) throw new Error("User not found");
            const data = await response.json();

            setIsOpenConnectWallet(true);
            setSignMessageData(data.nonce);
          } else {
            await getUser();
          }
        }
      } catch (e) {
        console.log(e);
        localStorage.clear();
        await disconnect();
        router?.refresh();
        setUser(initiaUserState);
      }
    })();
  }, [connected, disconnect, getUser, publicKey, router, signMessage]);

  useEffect(() => {
    if (!disconnecting || !connected) return;

    const disconnectLocalStorage = async () => {
      localStorage.clear();
      await disconnect(); // Call disconnect function from useWallet hook
      router.refresh(); // Reload the page
      setUser(initiaUserState);
    };

    disconnectLocalStorage();
  }, [disconnecting, connected, disconnect, router]);

  return (
    <AppContext.Provider value={{ user, isChatOpen, setIsChatOpen }}>
      <SigningDialog
        open={isOpenConnectWallet}
        confirmHandler={signMessageHandler}
        handleClose={cancelSignMessage}
      />
      {children}
    </AppContext.Provider>
  );
};
