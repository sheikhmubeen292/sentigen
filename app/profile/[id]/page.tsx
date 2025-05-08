"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Globe } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreatedCard from "@/components/profile/created-card";
import HeldCard from "@/components/profile/held-card";
import EditDialog from "@/components/profile/edit-dialog";
import { initiaUserState, serverUrl } from "@/utils/constant";
import { IUser } from "@/types/user.types";
import { HeldTokenItem, ITokenItem } from "@/types/contract.types";
import { ProfileParams } from "@/types/general.types";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

dayjs.extend(relativeTime);

const socialLinks = [
  {
    key: "websiteUrl",
    icon: <Globe style={{ fontSize: "24px", color: "#7a7a7a" }} />,
  },
  {
    key: "twitterUrl",
    icon: <FaXTwitter style={{ fontSize: "24px", color: "#7a7a7a" }} />,
  },
  {
    key: "telegramUrl",
    icon: <FaTelegramPlane style={{ fontSize: "24px", color: "#7a7a7a" }} />,
  },
  {
    key: "youtubeUrl",
    icon: <FaYoutube style={{ fontSize: "24px", color: "#7a7a7a" }} />,
  },
  {
    key: "tiktokUrl",
    icon: <FaTiktok style={{ fontSize: "24px", color: "#7a7a7a" }} />,
  },
  {
    key: "discordUrl",
    icon: <FaDiscord style={{ fontSize: "24px", color: "#7a7a7a" }} />,
  },
];

export default function Profile({ params }: { params: ProfileParams }) {
  const { id } = params;
  const { publicKey } = useWallet();

  // const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<IUser>(initiaUserState);
  const [createdCoins, setCreatedCoins] = useState<ITokenItem[]>([]);
  const [heldCoins, setHeldCoins] = useState<HeldTokenItem[]>([]);

  // const handleSettingsClick = (agentId: string) => {
  //   try {
  //     router.push(`/configure-agent/${agentId}`);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "An error occurred");
  //   }
  // };

  const getUserData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/user/get-single-user/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(data, "data,datadatadatadata");

      setUserData({ ...data?.user });
      setCreatedCoins([...data?.createdCoins]);
      setHeldCoins([...data?.heldCoins]);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getUserData();
  }, [getUserData, id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="flex items-center justify-center mt-14 container">
          <EditDialog open={open} setOpen={setOpen} />
          <div className="w-full max-w-fit md:max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4">
              {/* profile  */}
              <div className="md:col-span-2 bg-[#181B1C] text-white p-4 rounded-3xl max-h-fit">
                <div className="flex items-center gap-4 mt-3">
                  <Image
                    src={userData.profilePicture || "/dog.png"}
                    alt="dummy"
                    width={50}
                    height={50}
                  />
                  <p className="text-sm text-[#F2F2F2]">
                    {userData.walletAddress.slice(0, 6)}...
                    {userData.walletAddress.slice(-6)}{" "}
                  </p>
                  <Image src="/solana.png" alt="dummy" width={25} height={25} />
                </div>
                <p className="mt-5 text-[#7A7A7A] text-sm">
                  {userData.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {socialLinks.map(
                    ({ key, icon }) =>
                      userData[key as keyof typeof userData] && (
                        <a
                          key={key}
                          href={userData[key as keyof typeof userData]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {icon}
                        </a>
                      )
                  )}
                </div>
                {userData.walletAddress === publicKey?.toString() && (
                  <Button
                    onClick={() => setOpen(true)}
                    className="mt-5 w-full py-3 bg-[#303030] text-[#F2F2F2] text-sm font-semibold"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* component 2----- */}
              <div className="md:col-span-4">
                <Tabs defaultValue="created">
                  <div className="bg-[#181B1C] text-white p-4 rounded-3xl">
                    <div className="flex items-center justify-between ">
                      <TabsList className="grid grid-cols-2 bg-transparent border rounded-lg w-[150px] md:w-[300px]">
                        <TabsTrigger
                          value="created"
                          className="data-[state=active]:text-white data-[state=active]:bg-[#2C3132] rounded-md px-4 py-1 transition-all"
                        >
                          Created
                        </TabsTrigger>
                        <TabsTrigger
                          value="held"
                          className="data-[state=active]:text-white data-[state=active]:bg-[#2C3132] rounded-md px-4 py-1 transition-all"
                        >
                          Portfolio
                        </TabsTrigger>
                      </TabsList>

                      <div className="flex items-center space-x-2 text-sm text-white">
                        <span className="text-sm opacity-50">View:</span>
                        <span className="text-sm ">Price</span>
                        <Image
                          src="arrowdown.png"
                          alt="arrow"
                          width={10}
                          height={10}
                        />
                      </div>
                    </div>
                  </div>
                  {/* detail card */}
                  <TabsContent value="created" className="mt-6">
                    {createdCoins.map((agent) => (
                      <CreatedCard agent={agent} />
                    ))}
                  </TabsContent>
                  <TabsContent value="created" className="mt-6">
                    {heldCoins.map((agent) => (
                      <HeldCard agent={agent} />
                    ))}
                  </TabsContent>

                  {/* <Card /> */}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
