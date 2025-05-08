"use client";

import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { showToast, initiaUserState, serverUrl } from "@/utils/constant";
import { IUser } from "@/types/user.types";
import { SocialInput, socialLinks } from "@/components/socials";

type Model = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const urlFields: (keyof IUser)[] = [
  "websiteUrl",
  "twitterUrl",
  "telegramUrl",
  "youtubeUrl",
  "tiktokUrl",
  "discordUrl",
];

export default function EditDialog({ open, setOpen }: Model) {
  const router = useRouter();
  const { publicKey } = useWallet();

  const [baseURL, setBaseURL] = useState<string>("");
  const [imgData, setImgData] = useState<Blob | string>("");
  const [userData, setUserData] = useState<IUser>(initiaUserState);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgData("");
    setBaseURL("");
    if (!event.target.files) {
      return;
    }
    const file: MediaSource | Blob | string = event.target.files[0];
    setImgData(file);
    const urlFILE = URL.createObjectURL(file);
    setBaseURL(urlFILE);
  };

  const updateUserState = (name: string, value: string) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const getUserData = useCallback(async () => {
    try {
      const response = await axios.get(`${serverUrl}/user/me`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });

      setUserData((prev) => ({
        ...prev,
        ...response?.data?.user,
      }));
    } catch (e) {
      console.log(e);
    }
  }, [publicKey]);

  const updateProfileHander = useCallback(async () => {
    if (!publicKey) return showToast("Connect Your Wallet", "error");
    if (!userData.name || !userData.description)
      return showToast("Enter All Fields", "error");

    try {
      // setLoading(true);
      const formData = new FormData();
      if (imgData) formData.append("profilePicture", imgData);
      formData.append("name", userData.name);
      formData.append("description", userData.description);

      urlFields.forEach((field) => {
        const value = userData[field];
        if (typeof value === "string" && value.trim() !== "") {
          formData.append(field, value);
        }
      });

      const { data } = await axios.put(`${serverUrl}/user/update`, formData, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      // console.log(data, "datadata");

      await getUserData();

      showToast("User updated successfully", "success");
      setOpen(false);
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      console.log(e);
    }
  }, [publicKey, userData?.name, userData?.description, imgData, getUserData]);

  useEffect(() => {
    if (!publicKey) return;
    getUserData();
  }, [getUserData, publicKey]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-transparent border-none">
          <div className="bg-[#181B1C]">
            <div className="bg-[#181B1C] p-6">
              <div className="mx-auto max-w-[770px] ">
                <Card className="border-none bg-[#181B1C] ">
                  <div className="p-6">
                    <div className="space-y-8">
                      <div className="flex flex-row  items-center justify-between w-full gap-4 ">
                        <input
                          type="file"
                          id="agent-photo"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFile}
                        />
                        <label
                          htmlFor="agent-photo"
                          className="group relative flex h-[82px] w-[82px] cursor-pointer items-center  justify-center rounded-full border-2 border-dashed border-muted-foreground/25 bg-background dark:bg-[#303030]  transition-colors hover:border-muted-foreground/50 overflow-hidden"
                        >
                          {baseURL ? (
                            <Image
                              src={baseURL || "/placeholder.svg"}
                              alt="Agent"
                              width={72}
                              height={72}
                              className="h-full w-full object-cover"
                            />
                          ) : userData?.profilePicture ? (
                            <Image
                              src={
                                userData?.profilePicture || "/placeholder.svg"
                              }
                              alt="Agent"
                              width={72}
                              height={72}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          )}
                        </label>
                        <div className="w-[85%]">
                          <Label
                            htmlFor="agent-name"
                            className="text-[#F2F2F2]"
                          >
                            Name
                          </Label>
                          <Input
                            id="agent-name"
                            placeholder="Enter Your Name."
                            className="h-9 mt-2  bg-[#222627] dark:bg-[#252525] border-border/40 text-[#F2F2F2] placeholder:text-muted-foreground"
                            value={userData?.name}
                            onChange={(e) =>
                              updateUserState("name", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="w-[85%]">
                        <Label htmlFor="agent-name" className="text-[#F2F2F2]">
                          Biography
                        </Label>
                        <Input
                          id="agent-name"
                          placeholder="Yr nisi ut, gochujang disrupt copper mug do ramps organic quis 8-bit palo santo fanny pack echo park polaroid."
                          className="h-9 mt-2  bg-[#222627] dark:bg-[#252525] border-border/40 text-[#F2F2F2] placeholder:text-muted-foreground"
                          value={userData?.description}
                          onChange={(e) =>
                            updateUserState("description", e.target.value)
                          }
                        />
                      </div>

                      {/* Social Links */}
                      <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
                        {socialLinks.map((link) => (
                          <SocialInput
                            key={link?.id}
                            id={link?.id as keyof IUser}
                            label={link?.label}
                            icon={link?.icon}
                            data={userData}
                            updateState={updateUserState}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Create Button */}
                    <Button
                      onClick={updateProfileHander}
                      className="w-full mt-8 bg-white text-black "
                    >
                      Save Profile
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
