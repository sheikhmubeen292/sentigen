"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Upload } from "lucide-react";
import Image from "next/image";
import base58 from "bs58";
import axios from "axios";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { AnchorProvider, BN, Idl, Program } from "@coral-xyz/anchor";
import {
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import {
  createGenericFileFromBrowserFile,
  type GenericFile,
} from "@metaplex-foundation/umi";
import { bundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { IoIosArrowDropleftCircle } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Create_Token, ITokenDetail } from "@/types/contract.types";
import { serverUrl, showToast } from "@/utils/constant";
import { cleanObject, generateTrxBuilder } from "@/utils/helper";
import IDL from "@/idl/idl.json";
import {
  connection,
  networkUrl,
  ownerPubKey,
  pdaBaseTokenAgentVault,
  pdaBaseTokenPlatform,
  sentigenToken,
  tokenInitialSupply,
} from "@/utils/solana";
import { AgentPurchaseDialog } from "@/components/agent-purchase-dialog";
import { checkQuoteToken, checkToken } from "@/services/solana";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { toWeb3JsInstruction } from "@metaplex-foundation/umi-web3js-adapters";
import { jitoTrx } from "@/utils/jito.utils";
import Loader from "@/components/Loader";
import { checkAndConfirmTrx, delay, saveTrx } from "@/services/trx";

const initialToken = {
  name: "",
  ticker: "",
  description: "",
  twitterUrl: "",
  telegramUrl: "",
  websiteUrl: "",
  youtubeUrl: "",
  tiktokUrl: "",
  discordUrl: "",
  walletAddress: "",
  profilePicture: "",
  coverImage: "",
  tags: [],
  tokenFee: 0,
  maxTokenFee: 0,
};

export default function CreateAgent() {
  const router = useRouter();
  const {
    publicKey,
    signMessage,
    sendTransaction,
    wallet: userWallet,
  } = useWallet();
  const wallet = useAnchorWallet();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [coverImage, setCoverImage] = useState<Blob | string>("");
  const [imgData, setImgData] = useState<GenericFile | null>(null);
  const [imgBlob, setImgBlob] = useState<Blob | string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [ramount, setRAmount] = useState<string>("");
  const [sentiBalance, setSentiBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tokenData, setTokenData] = useState<
    Create_Token & {
      walletAddress: string;
      profilePicture: string;
      coverImage: string;
    }
  >(initialToken);

  const umi = useMemo(() => {
    const umiInstance = createUmi(networkUrl)
      .use(bundlrUploader())
      .use(mplTokenMetadata());

    if (userWallet) {
      umiInstance.use(walletAdapterIdentity(userWallet.adapter, true));
    } else {
      console.warn("Connect Wallet!");
    }

    return umiInstance;
  }, [userWallet]);

  const initializeFunc = useCallback(() => {
    setAmount("");
    setRAmount("");
  }, []);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const updateUserState = (name: string, value: number | string) => {
    setTokenData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "profilePicture" | "coverImage"
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const urlFILE = URL.createObjectURL(file);
    updateUserState(field, urlFILE);

    if (field === "profilePicture") {
      const gFile = await createGenericFileFromBrowserFile(file);

      console.log(gFile, "gFile");
      setImgData(gFile);
      setImgBlob(file);
    } else if (field === "coverImage") {
      setCoverImage(file);
    }
  };

  const handleUpdateAmount = useCallback(async (value: string) => {
    setAmount(value);

    const taxAmount = Number(value) * 0.99;

    const tokenBReserves = tokenInitialSupply;

    const denominatorSum = tokenBReserves + taxAmount;

    const divAmt = denominatorSum / taxAmount;

    const amountOut = tokenBReserves / divAmt;

    if (amountOut > tokenBReserves) {
      showToast("Not valid amount");
    } else {
      setRAmount(String(amountOut));
    }
  }, []);

  const changeToBN = useCallback((amount: string, decimals: number) => {
    const ramount = new BN(Math.floor(Number(amount) * decimals).toString());
    return ramount;
  }, []);

  const fetchBalances = useCallback(async () => {
    try {
      if (!wallet) return;

      const swapperTokenAAccount = await getAssociatedTokenAddress(
        sentigenToken,
        wallet.publicKey,
        true,
        TOKEN_2022_PROGRAM_ID
      );
      const tokenAAccount = await connection.getParsedAccountInfo(
        new PublicKey(swapperTokenAAccount)
      );

      setSentiBalance(
        tokenAAccount.value
          ? (tokenAAccount.value.data as any).parsed.info.tokenAmount.uiAmount
          : 0
      );
    } catch (e) {
      console.log("Error fetching balance:", e);
    }
  }, [wallet]);

  const swapBuyTrx = useCallback(
    async (tokenData: ITokenDetail) => {
      try {
        if (!wallet) return showToast("Connect Wallet", "error");

        if (!imgData) return showToast("Upload Image");

        const provider = new AnchorProvider(connection, wallet);
        const program = new Program(IDL as Idl, provider);
        const token = new PublicKey(tokenData.tokenMint);

        const bondingCurve = PublicKey.findProgramAddressSync(
          [
            Buffer.from("bonding_curve"),
            Buffer.from(process.env.NEXT_PUBLIC_SEED!),
            sentigenToken.toBuffer(),
            token.toBuffer(),
          ],
          program.programId
        )[0];

        const globalPda = PublicKey.findProgramAddressSync(
          [Buffer.from("global-config-sentigen"), ownerPubKey.toBuffer()],
          program.programId
        )[0];

        const poolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from("pda-token"), ownerPubKey.toBuffer()],
          program.programId
        )[0];

        const amountInBN = await changeToBN(amount, LAMPORTS_PER_SOL);

        const tokenDestinationForSwapper = getAssociatedTokenAddressSync(
          token,
          wallet.publicKey,
          true,
          TOKEN_2022_PROGRAM_ID
        );

        const [swapperTokenAAccount, swapperTokenBAccount, destinationIxn] =
          await Promise.all([
            getAssociatedTokenAddress(
              sentigenToken,
              wallet.publicKey,
              true,
              TOKEN_2022_PROGRAM_ID
            ),
            getAssociatedTokenAddress(
              token,
              wallet.publicKey,
              true,
              TOKEN_2022_PROGRAM_ID
            ),
            checkQuoteToken(
              token,
              wallet.publicKey,
              tokenDestinationForSwapper
            ),
          ]);

        if (!destinationIxn) return showToast("Error Try Again");

        const { tokenTrx, revokeTrx, pdaTokenAAccount, pdaTokenBAccount } =
          await checkToken(
            umi,
            imgData,
            program,
            wallet.publicKey,
            tokenData,
            sentigenToken,
            token,
            bondingCurve,
            globalPda
          );

        const tokenAccCreateTrx = generateTrxBuilder(
          destinationIxn,
          [umi.identity],
          0
        );

        const swapIxn = await program.methods
          .buy(amountInBN, new BN("0"))
          .accounts({
            swapper: wallet.publicKey,
            globalConfiguration: globalPda,
            bondingCurve: bondingCurve,
            tokenA: sentigenToken,
            poolTokenAAccount: pdaTokenAAccount as PublicKey,
            swapperTokenAAccount: swapperTokenAAccount,
            tokenB: token,
            poolTokenBAccount: pdaTokenBAccount as PublicKey,
            swapperTokenBAccount: swapperTokenBAccount,
            pdaBaseTokenPlatform: pdaBaseTokenPlatform,
            pdaBaseTokenAgentVault: pdaBaseTokenAgentVault,
            poolTokensAuthority: poolAuthority,
            admin: ownerPubKey.toBase58(),
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .instruction();

        const buyTrx = generateTrxBuilder(swapIxn, [umi.identity], 0);

        if (!tokenTrx) return showToast("Error.Try Again.");

        const tx = tokenTrx;

        const tx2 = tokenAccCreateTrx.add(revokeTrx).add(buyTrx);

        const trx1Ins = [],
          trx2Ins = [];

        const trx1Signers: Keypair[] = [];

        for (const wrapped of tx.items) {
          const instruction = toWeb3JsInstruction(wrapped.instruction);
          trx1Ins.push(instruction);
          wrapped.signers.map((wallet: any) => {
            if (wallet.secretKey) {
              const signer = Keypair.fromSecretKey(wallet.secretKey);
              trx1Signers.push(signer as Keypair);
            }
          });
        }
        for (const wrapped of tx2.items) {
          const instruction = toWeb3JsInstruction(wrapped.instruction);
          trx2Ins.push(instruction);
        }

        const bundleTxSignature = await jitoTrx(
          [
            {
              instructions: trx1Ins,
              signers: trx1Signers,
            },
            { instructions: trx2Ins },
          ],
          wallet
        );

        await checkAndConfirmTrx(bundleTxSignature.transactionHashes[1]);

        await saveTrx(
          ramount,
          wallet.publicKey.toBase58(),
          "buy",
          bundleTxSignature.transactionHashes[1],
          amount,
          tokenData?.tokenMint,
          tokenData?.name
        );

        await delay(20000);

        initializeFunc();
      } catch (error: any) {
        console.log(error, "error");
        setLoading(false);
        throw new Error(error?.message);
      }
    },

    [amount, wallet, changeToBN, umi]
  );

  const handleSubmit = useCallback(async () => {
    if (!publicKey || !wallet) return showToast("Connect Your Wallet", "error");

    if (!tokenData.name || !tokenData.ticker || !tokenData.description) {
      if (!tokenData.name) {
        return showToast("Enter Name", "error");
      }
      if (!tokenData.ticker) {
        return showToast("Enter Ticker", "error");
      }

      // if (!tokenData.description) {
      //   return showToast("Enter Description", "error");
      // }
    }

    if (!imgData) return showToast("Select Image", "error");
    // if (!coverImage) return showToast("Select Cover Image", "error");

    if (!isDialogOpen) return setIsDialogOpen(true);

    try {
      const message = `${tokenData.name}-${tokenData.ticker}`;
      const messageBytes = new TextEncoder().encode(message);

      // Request the wallet to sign the message
      if (!signMessage) {
        return showToast("Wallet does not support message signing", "error");
      }
      setLoading(true);
      setIsDialogOpen(false);
      const signedMessage = await signMessage(messageBytes);

      // Convert the signed message to Base58 or Hex
      const signatureBase58 = base58.encode(signedMessage);
      const { walletAddress, profilePicture, ...restData } = tokenData;
      const object = {
        ...restData,
        tags: selectedTypes,
        signData: signatureBase58,
      };

      const formData = new FormData();
      formData.append("image", imgBlob);
      formData.append("coverImage", coverImage);
      formData.append("data", JSON.stringify(cleanObject(object)));

      // setLoading(true)

      const rdata = await axios.post(`${serverUrl}/coin/create`, formData, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      // console.log(rdata, "rdatardata");
      // setLoading(false)

      if (rdata && rdata.data && rdata.data.success) {
        if (Number(amount) > 0) {
          await swapBuyTrx(rdata.data.data);
        }

        setTokenData(initialToken);
        initializeFunc();
        setImgData(null);
        setIsDialogOpen(false);
        setLoading(false);
        showToast("Token created successfully", "success");
        router.push(`/trading/${rdata.data.data.tokenMint}`);
      } else {
        showToast(rdata.data.message || "Error creating token", "error");
        return;
      }
    } catch (e: any) {
      const { response } = e;
      console.log(e);
      setLoading(false);
      showToast(response?.data?.message ?? e?.message ?? e, "error");
    }
  }, [imgData, publicKey, signMessage, tokenData, isDialogOpen, amount]);

  useEffect(() => {
    if (!wallet) return;
    fetchBalances();
  }, [fetchBalances, wallet]);

  return (
    <div className="min-h-screen flex flex-col ">
      <Loader loading={loading} />
      <Navbar />
      <main className="flex-grow max-w-[1920px] mx-auto">
        <div className="flex items-center justify-center mt-14 container">
          <div className="w-full max-w-full md:max-w-4xl  bg-background p-3 rounded-lg">
            {/* <div className="mx-auto xl:max-w-[770px] lg:max-w-[100%] md:max-w-[100%] sm:max-w-[100%]"> */}
            <Card className="border-border/40 rounded-[16px] bg-[#181B1C] dark:bg-[#181B1C]">
              <div className="p-6">
                {/* Header */}
                <div className="mb-8 flex flex-row items-center  justify-between">
                  <button
                    onClick={() => router.back()}
                    className="text-sm text-muted-foreground hover:text-foreground flex flex-row items-center"
                  >
                    <IoIosArrowDropleftCircle
                      style={{ fontSize: "22px", marginRight: "10px" }}
                    />{" "}
                    <p className="hidden md:block">Exit Setup</p>
                  </button>
                  <h1 className="text-center text-xl font-medium ">
                    New Project
                  </h1>
                  <div className="md:w-[100px] w-[20px]" />{" "}
                </div>

                {/* Form */}
                <div className="space-y-8">
                  {/* Agent Details */}
                  <div>
                    <h2 className="mb-4 text-[18px] font-medium">
                      Project Details
                    </h2>
                    <div className="grid md:grid-cols-3  gap-6">
                      <div className="flex flex-row items-center">
                        <input
                          type="file"
                          id="agent-photo"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileChange(e, "profilePicture")
                          }
                        />
                        <label
                          htmlFor="agent-photo"
                          className="group relative flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/25 bg-background dark:bg-[#303030] transition-colors hover:border-muted-foreground/50 overflow-hidden"
                        >
                          {tokenData?.profilePicture ? (
                            <>
                              <Image
                                src={
                                  tokenData?.profilePicture ||
                                  "/placeholder.svg"
                                }
                                alt="Agent"
                                width={72}
                                height={72}
                                className="h-full w-full object-cover"
                              />

                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <Edit className="h-5 w-5 text-[#a7a7a7]" />
                              </div>
                            </>
                          ) : (
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          )}
                        </label>
                        <span className="mt-2 text-sm pl-6 text-muted-foreground">
                          Upload Photo
                        </span>
                      </div>
                      <div>
                        <Label
                          htmlFor="agent-name"
                          className="text-black dark:text-[#F2F2F2] text-[14px]"
                        >
                          Project Name
                        </Label>
                        <Input
                          id="agent-name"
                          placeholder="i.e Thor"
                          className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                          value={tokenData.name}
                          onChange={(e) =>
                            updateUserState("name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="ticker"
                          className="text-black dark:text-[#F2F2F2] text-[14px]"
                        >
                          Project Ticker
                        </Label>
                        <Input
                          id="ticker"
                          placeholder="$"
                          className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                          value={tokenData.ticker}
                          onChange={(e) =>
                            updateUserState("ticker", e.target.value)
                          }
                        />
                      </div>
                      {/* <div className="md:col-span-full">
                        <div className="grid md:grid-cols-12 gap-6">
                          <div className="md:col-span-6">
                            <Label
                              htmlFor="agent-name"
                              className="text-black dark:text-[#F2F2F2] text-[14px] span"
                            >
                              Decimals
                            </Label>
                            <Input
                              id="agent-name"
                              placeholder="6"
                              className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                              // value={tokenData.tokenFee}
                              // onChange={(e) =>
                              //   updateUserState(
                              //     "tokenFee",
                              //     Number(e.target.value)
                              //   )
                              // }
                            />
                          </div>
                          <div className="md:col-span-6">
                            <Label
                              htmlFor="agent-name"
                              className="text-black dark:text-[#F2F2F2] text-[14px]"
                            >
                              Supply
                            </Label>
                            <Input
                              id="agent-name"
                              placeholder="i.e 1"
                              className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                              // value={tokenData.tokenFee}
                              // onChange={(e) =>
                              //   updateUserState(
                              //     "tokenFee",
                              //     Number(e.target.value)
                              //   )
                              // }
                            />
                          </div>
                        </div>
                      </div> */}

                      <div>
                        <Label
                          htmlFor="agent-name"
                          className="text-black dark:text-[#F2F2F2] text-[14px]"
                        >
                          Fee %
                        </Label>
                        <Input
                          id="agent-name"
                          placeholder="i.e 1"
                          className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                          value={tokenData.tokenFee}
                          onChange={(e) =>
                            updateUserState("tokenFee", Number(e.target.value))
                          }
                        />
                      </div>

                      {/* <div>
                        <Label
                          htmlFor="agent-name"
                          className="text-black dark:text-[#F2F2F2] text-[14px]"
                        >
                          Max Fee
                        </Label>
                        <Input
                          id="agent-name"
                          placeholder="i.e 1"
                          className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                          // value={tokenData.maxTokenFee}
                          // onChange={(e) =>
                          //   updateUserState(
                          //     "maxTokenFee",
                          //     Number(e.target.value)
                          //   )
                          // }
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="agent-name"
                          className="text-black dark:text-[#F2F2F2] text-[14px]"
                        >
                          Withdrawal Authority
                        </Label>
                        <Input
                          id="agent-name"
                          placeholder="i.e 1"
                          className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                          // value={tokenData.maxTokenFee}
                          // onChange={(e) =>
                          //   updateUserState(
                          //     "maxTokenFee",
                          //     Number(e.target.value)
                          //   )
                          // }
                        />
                      </div> */}
                    </div>
                  </div>

                  {/* <div className="md:col-span-full">
                    <div className="grid md:grid-cols-12 gap-6">
                      <div className="md:col-span-6">
                        <Label
                          htmlFor="agent-name"
                          className="text-black dark:text-[#F2F2F2] text-[14px] span"
                        >
                          Master Account
                        </Label>
                        <Input
                          id="agent-name"
                          placeholder="2.3%"
                          className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                          // value={tokenData.tokenFee}
                          // onChange={(e) =>
                          //   updateUserState(
                          //     "tokenFee",
                          //     Number(e.target.value)
                          //   )
                          // }
                        />
                      </div>
                      <div className="md:col-span-6">
                        <Label
                          htmlFor="agent-name"
                          className="text-black dark:text-[#F2F2F2] text-[14px]"
                        >
                          Default Account State
                        </Label>
                        <Input
                          id="agent-name"
                          placeholder="6"
                          className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                          // value={tokenData.tokenFee}
                          // onChange={(e) =>
                          //   updateUserState(
                          //     "tokenFee",
                          //     Number(e.target.value)
                          //   )
                          // }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-full">
                    <div className="grid md:grid-cols-12 gap-6">
                      <div className="md:col-span-6">
                        <Label
                          htmlFor="agent-name"
                          className="text-black dark:text-[#F2F2F2] text-[14px] span"
                        >
                          Transferable
                        </Label>
                        <Input
                          id="agent-name"
                          placeholder="450000"
                          className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                          // value={tokenData.tokenFee}
                          // onChange={(e) =>
                          //   updateUserState(
                          //     "tokenFee",
                          //     Number(e.target.value)
                          //   )
                          // }
                        />
                      </div>
                      <div className="md:col-span-6">
                        <Label
                          htmlFor="agent-name"
                          className="text-black dark:text-[#F2F2F2] text-[14px]"
                        >
                          Non-Transferable
                        </Label>
                        <Input
                          id="agent-name"
                          placeholder="4500000"
                          className="h-9 mt-1.5 bg-background dark:bg-[#252525] border-border/40 text-foreground placeholder:text-muted-foreground"
                          // value={tokenData.tokenFee}
                          // onChange={(e) =>
                          //   updateUserState(
                          //     "tokenFee",
                          //     Number(e.target.value)
                          //   )
                          // }
                        />
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* Create Button */}
                <Button onClick={handleSubmit} className="w-full mt-8 bg-white">
                  <Image src="/rocket.png" width={20} height={20} alt="" />
                  Launch Idea
                </Button>
              </div>
            </Card>
            {/* </div> */}
          </div>
        </div>
      </main>
      <Footer />
      <AgentPurchaseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        createAgent={handleSubmit}
        amount={amount}
        returnAmount={ramount}
        setAmount={handleUpdateAmount}
        tokenData={tokenData}
        balance={sentiBalance}
      />
    </div>
  );
}
