"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { bundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import clsx from "clsx";
import { ArrowUpIcon } from "lucide-react";
import { AnchorProvider, BN, type Idl, Program } from "@coral-xyz/anchor";
import {
  getAccount,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { toWeb3JsInstruction } from "@metaplex-foundation/umi-web3js-adapters";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

import { Button } from "@/components/ui/button";
import { AccountState, IPairData } from "@/types/trade.type";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { showToast, socket } from "@/utils/constant";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import type { ITokenDetail, Metrics } from "@/types/contract.types";
import {
  connection,
  networkUrl,
  ownerPubKey,
  pdaBaseTokenAgentVault,
  pdaBaseTokenPlatform,
  programId,
  sentigenToken,
  tokenInitialSupply,
  tokenMintAmount,
} from "@/utils/solana";
import IDL from "@/idl/idl.json";
import { checkCompute, checkQuoteToken, checkToken } from "@/services/solana";
import {
  createGenericFileFromBrowserFile,
  TransactionBuilder,
} from "@metaplex-foundation/umi";
import { getExactDecimals } from "@/utils/decimals";
import { formatNumberShort } from "../swap-view";
import Loader from "@/components/Loader";
import { checkAndConfirmTrx, saveTrx } from "@/services/trx";
import { BundleTransaction } from "@/types/tx.types";
import { jitoTrx } from "@/utils/jito.utils";

interface StatProps {
  label: string;
  value: string;
  buyValue: string;
  sellValue: string;
  buyPercent: number;
  sellPercent: number;
}

const periodData = {
  "5m": { value: 2, isPositive: true },
  "1h": { value: 10, isPositive: true },
  "6h": { value: 8, isPositive: true },
  "24h": { value: 7, isPositive: false },
};

interface Props {
  tokenData: ITokenDetail;
  metrics: Metrics;
}

const isDark = true;

export default function Swap({ tokenData, metrics }: Props) {
  const { sendTransaction, wallet: userWallet } = useWallet();
  const wallet = useAnchorWallet();

  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>("");
  const [ramount, setRAmount] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<AccountState>({
    tokenA: null,
    tokenB: null,
    balanceA: 0,
    balanceB: 0,
  });
  const [pairData, setPairData] = useState<IPairData>({
    pairAddress: "",
    tokenBMint: "",
    tokenAAccount: "",
    tokenBAccount: "",
    total_supply: tokenMintAmount,
    reserve_token: tokenInitialSupply,
    reserve_sol: 0,
    reserveAToken: 0,
    reserveBToken: tokenInitialSupply,
  });

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

  const stats = useMemo(() => {
    const totalTxns = metrics?.buyAmount + metrics?.sellAmount || 0;
    const totalVolume = metrics?.buyVolume + metrics?.sellVolume || 0;
    const totalHolders = metrics?.buyHolders + metrics?.sellHolders || 0;

    return [
      {
        label: "Txns",
        value: formatNumberShort(totalTxns),
        buyValue: formatNumberShort(metrics?.buyAmount || 0),
        sellValue: formatNumberShort(metrics?.sellAmount || 0),
        buyPercent: totalTxns > 0 ? (metrics?.buyAmount / totalTxns) * 100 : 0,
        sellPercent:
          totalTxns > 0 ? (metrics?.sellAmount / totalTxns) * 100 : 0,
      },
      {
        label: "Volume",
        value: formatNumberShort(totalVolume),
        buyValue: formatNumberShort(metrics?.buyVolume || 0),
        sellValue: formatNumberShort(metrics?.sellVolume || 0),
        buyPercent:
          totalVolume > 0 ? (metrics?.buyVolume / totalVolume) * 100 : 0,
        sellPercent:
          totalVolume > 0 ? (metrics?.sellVolume / totalVolume) * 100 : 0,
      },
      {
        label: "Makers",
        value: `${metrics?.totalHolders || 0}`,
        buyValue: `${metrics?.buyHolders || 0}`,
        sellValue: `${metrics?.sellHolders || 0}`,
        buyPercent:
          totalHolders > 0 ? (metrics?.buyHolders / totalHolders) * 100 : 0,
        sellPercent:
          totalHolders > 0 ? (metrics?.sellHolders / totalHolders) * 100 : 0,
      },
    ];
  }, [metrics]);

  const getPdaAccount = useCallback(() => {
    const bondingCurve = PublicKey.findProgramAddressSync(
      [
        Buffer.from("bonding_curve"),
        Buffer.from(tokenData.seed),
        sentigenToken.toBuffer(),
        new PublicKey(tokenData.tokenMint).toBuffer(),
      ],
      programId
    )[0];
    const globalPda = PublicKey.findProgramAddressSync(
      [Buffer.from("global-config-sentigen"), ownerPubKey.toBuffer()],
      programId
    )[0];

    const poolAuthority = PublicKey.findProgramAddressSync(
      [Buffer.from("pda-token"), ownerPubKey.toBuffer()],
      programId
    )[0];

    return [bondingCurve, globalPda, poolAuthority];
  }, [tokenData.tokenMint, tokenData.seed]);

  async function urlToFile(
    url: string,
    filename: string,
    mimeType: string
  ): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  }

  const initializeFunc = useCallback(() => {
    setAmount("");
    setRAmount("");
    // setSolAmount(0);
  }, []);

  const pairUpdate = useCallback(async () => {
    try {
      if (!wallet || !tokenData.tokenMint) return;
      const provider = new AnchorProvider(connection, wallet);
      const program = new Program(IDL as Idl, provider);

      const [bondingCurve] = getPdaAccount();

      const swapPair = await (program.account as any).bondingCurve.fetch(
        bondingCurve
      );

      // console.log(swapPair, "swapPairswapPair");

      setPairData((prev) => ({
        ...prev,
        ...Object.assign({
          // pairAddress: String(pairPda),
          tokenAMint: String(swapPair.tokenAMint),
          tokenBMint: String(swapPair.tokenBMint),
          tokenAAccount: String(swapPair.tokenAAccount),
          tokenBAccount: String(swapPair.tokenBAccount),
          tokenBSupply: String(swapPair.tokenBSupply),
          reserveAToken: Number(swapPair.tokenAReserve),
          reserveBToken: Number(swapPair.tokenBReserve),
        }),
      }));
    } catch (e) {
      console.log(e);
    }
  }, [wallet, tokenData.tokenMint, getPdaAccount]);

  const handleUpdateAmount = useCallback(
    async (value: string) => {
      setAmount(value);

      const taxAmount = Number(value) * 0.99;

      let tokenAReserves = 0;
      let tokenBReserves = pairData.reserve_token;
      const initVirtualAToken = tokenInitialSupply;

      if (pairData.tokenBAccount) {
        const [pdaAAcc, pdaBAcc] = await Promise.all([
          getAccount(
            connection,
            new PublicKey(pairData.tokenAAccount),
            "processed",
            TOKEN_2022_PROGRAM_ID
          ),
          getAccount(
            connection,
            new PublicKey(pairData.tokenBAccount),
            "processed",
            TOKEN_2022_PROGRAM_ID
          ),
        ]);

        tokenAReserves = Number(pdaAAcc.amount) / LAMPORTS_PER_SOL;
        tokenBReserves = Number(pdaBAcc.amount) / LAMPORTS_PER_SOL;
      }
      if (isBuy) {
        const denominatorSum = tokenAReserves + initVirtualAToken + taxAmount;

        const divAmt = denominatorSum / taxAmount;

        const amountOut = tokenBReserves / divAmt;

        if (amountOut > tokenBReserves) {
          setStatus(false);
        } else {
          setStatus(amountOut > 0);
          setRAmount(String(amountOut));
        }
      } else {
        const denominatorSum = tokenBReserves + taxAmount;

        const divAmt = denominatorSum / taxAmount;

        const tokenAReserveCount = initVirtualAToken + tokenAReserves;
        const amountOut = tokenAReserveCount / divAmt;

        if (amountOut > tokenAReserves) {
          setStatus(false);
        } else {
          setStatus(amountOut > 0);
          setRAmount(String(amountOut));
        }
      }
    },
    [isBuy, pairData]
  );

  const changeToBN = (amount: string, decimals: number) => {
    const ramount = new BN(Math.floor(Number(amount) * decimals).toString());
    return ramount;
  };

  const fetchBalances = useCallback(async () => {
    try {
      if (!wallet) return;

      const [swapperTokenAAccount, swapperTokenBAccount] = await Promise.all([
        getAssociatedTokenAddress(
          sentigenToken,
          wallet.publicKey,
          true,
          TOKEN_2022_PROGRAM_ID
        ),
        getAssociatedTokenAddress(
          new PublicKey(tokenData.tokenMint),
          wallet.publicKey,
          true,
          TOKEN_2022_PROGRAM_ID
        ),
      ]);

      const [tokenAAccount, tokenBAccount] = await Promise.all([
        connection.getParsedAccountInfo(new PublicKey(swapperTokenAAccount)),
        connection.getParsedAccountInfo(new PublicKey(swapperTokenBAccount)),
      ]);

      setAccounts((prev) => ({
        ...prev,
        tokenA: swapperTokenAAccount,
        tokenB: swapperTokenBAccount,
        balanceA: tokenAAccount.value
          ? (tokenAAccount.value.data as any).parsed.info.tokenAmount.uiAmount
          : 0,
        balanceB: tokenBAccount.value
          ? (tokenBAccount.value.data as any).parsed.info.tokenAmount.uiAmount
          : 0,
      }));
    } catch (e) {
      console.log("Error fetching balance:", e);
    }
  }, [wallet, tokenData.tokenMint]);

  const sendTrx = useCallback(
    async (instructions: TransactionInstruction[]) => {
      if (!wallet) throw new Error("Connect Wallet");

      const { blockhash } = await connection.getLatestBlockhash();
      const message = new TransactionMessage({
        payerKey: wallet.publicKey,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(message);

      const simulationResult = await connection.simulateTransaction(
        transaction,
        {
          replaceRecentBlockhash: true,
          sigVerify: false,
        }
      );

      if (simulationResult.value.err) {
        console.error("Simulation Error:", simulationResult.value.err);
        console.error("Simulation Logs:", simulationResult.value.logs);
        // showToast("Transaction simulation failed. Check logs for details.");

        throw new Error(
          "Transaction simulation failed. Check logs for details."
        );
      }

      const signedTxn = await wallet.signTransaction(transaction);

      const tx = await sendTransaction(signedTxn, connection);

      console.log(tx, "txid");

      return tx;
    },
    [wallet, sendTransaction]
  );

  const swapBuyTrx = useCallback(async () => {
    if (!wallet) throw new Error("Connect Wallet");

    const provider = new AnchorProvider(connection, wallet);
    const program = new Program(IDL as Idl, provider);
    const token = new PublicKey(tokenData.tokenMint);

    // const computeInstruction = await checkCompute();

    const [bondingCurve, globalPda, poolAuthority] = getPdaAccount();

    const amountInBN = changeToBN(amount, LAMPORTS_PER_SOL);

    const tokenDestinationForSwapper = getAssociatedTokenAddressSync(
      token,
      wallet.publicKey,
      true,
      TOKEN_2022_PROGRAM_ID
    );

    const [destinationIxn] = await Promise.all([
      checkQuoteToken(token, wallet.publicKey, tokenDestinationForSwapper),
      pairUpdate(),
    ]);

    let tokenDestinationForPdaA = null;
    let tokenDestinationForPdaB = null;

    let tokenCreateTrx: TransactionBuilder | null = null;
    let revokeTrxIns: TransactionBuilder | null = null;

    if (pairData.tokenBAccount) {
      tokenDestinationForPdaA = new PublicKey(pairData.tokenAAccount);
      tokenDestinationForPdaB = new PublicKey(pairData.tokenBAccount);
    } else {
      console.log("else mai aya ");
      const file = await urlToFile(tokenData.imgUrl, "image.png", "image/png");
      const gFile = await createGenericFileFromBrowserFile(file);
      const { tokenTrx, revokeTrx, pdaTokenAAccount, pdaTokenBAccount } =
        await checkToken(
          umi,
          gFile,
          program,
          wallet.publicKey,
          tokenData,
          sentigenToken,
          token,
          bondingCurve,
          globalPda
        );

      tokenCreateTrx = tokenTrx && tokenTrx;
      revokeTrxIns = revokeTrx && revokeTrx;
      tokenDestinationForPdaA =
        pdaTokenAAccount && new PublicKey(pdaTokenAAccount);
      tokenDestinationForPdaB =
        pdaTokenBAccount && new PublicKey(pdaTokenBAccount);
    }

    const swapIxn = await program.methods
      .buy(amountInBN, new BN("0"))
      .accounts({
        swapper: wallet.publicKey,
        globalConfiguration: globalPda,
        bondingCurve: bondingCurve,
        tokenA: sentigenToken,
        poolTokenAAccount: tokenDestinationForPdaA as PublicKey,
        swapperTokenAAccount: accounts.tokenA as PublicKey,
        tokenB: token,
        poolTokenBAccount: tokenDestinationForPdaB as PublicKey,
        swapperTokenBAccount: accounts.tokenB as PublicKey,
        pdaBaseTokenPlatform: pdaBaseTokenPlatform,
        pdaBaseTokenAgentVault: pdaBaseTokenAgentVault,
        poolTokensAuthority: poolAuthority,
        admin: ownerPubKey.toBase58(),
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const instructionsCreate = [];
    const trx1Signers: Keypair[] = [];
    const instructionsBuy = [];
    if (destinationIxn) {
      instructionsBuy.push(destinationIxn);
    }
    instructionsBuy.push(swapIxn);

    if (tokenCreateTrx && revokeTrxIns) {
      console.log(tokenCreateTrx, "tokenCreateTrx");
      for (const wrapped of tokenCreateTrx.items) {
        const instruction = toWeb3JsInstruction(wrapped.instruction);
        instructionsCreate.push(instruction);
        wrapped.signers.map((wallet: any) => {
          if (wallet.secretKey) {
            const signer = Keypair.fromSecretKey(wallet.secretKey);
            trx1Signers.push(signer as Keypair);
          }
        });
      }

      const revokeInstructions = [];

      for (const wrapped of revokeTrxIns.items) {
        const instruction = toWeb3JsInstruction(wrapped.instruction);
        revokeInstructions.push(instruction);
      }

      instructionsBuy.push(...revokeInstructions);
    }

    if (!tokenCreateTrx) return [{ instructions: instructionsBuy }];

    return [
      {
        instructions: instructionsCreate,
        signers: trx1Signers,
      },
      { instructions: instructionsBuy },
    ];
  }, [
    pairData,
    amount,
    wallet,
    tokenData,
    accounts.tokenA,
    accounts.tokenB,
    getPdaAccount,
  ]);

  const swapSellTrx = useCallback(async () => {
    if (!wallet) throw new Error("Connect Wallet");

    const provider = new AnchorProvider(connection, wallet);
    const program = new Program(IDL as Idl, provider);

    const token = new PublicKey(tokenData.tokenMint);

    const [bondingCurve, globalPda, poolAuthority] = getPdaAccount();

    const computeInstruction = await checkCompute();

    const tokenDestinationForPda = new PublicKey(pairData.tokenBAccount);
    if (!tokenDestinationForPda) throw new Error("Try again later");

    const amountInBN = changeToBN(amount, LAMPORTS_PER_SOL);

    const pdaTokenAAccount = new PublicKey(pairData.tokenAAccount);
    const pdaTokenBAccount = new PublicKey(pairData.tokenBAccount);

    const swapIxn = await program.methods
      .sell(amountInBN, new BN("0"))
      .accounts({
        swapper: wallet.publicKey,
        globalConfiguration: globalPda,
        bondingCurve: bondingCurve,
        tokenA: sentigenToken,
        poolTokenAAccount: pdaTokenAAccount,
        swapperTokenAAccount: accounts.tokenA as PublicKey,
        tokenB: token,
        poolTokenBAccount: pdaTokenBAccount,
        swapperTokenBAccount: accounts.tokenB as PublicKey,
        baseTokenPlatform: pdaBaseTokenPlatform,
        baseTokenAgentVault: pdaBaseTokenAgentVault,
        poolTokensAuthority: poolAuthority,
        admin: ownerPubKey.toBase58(),
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const instructions = [...computeInstruction, swapIxn];

    return [{ instructions }];
  }, [
    pairData,
    amount,
    wallet,
    tokenData,
    accounts.tokenA,
    accounts.tokenB,
    getPdaAccount,
  ]);

  const swap = useCallback(async () => {
    if (!wallet) throw new Error("Connect Wallet");
    try {
      setLoading(true);
      let instructions: TransactionInstruction[] = [];
      let tx = "";

      if (isBuy) {
        const result: BundleTransaction[] = await swapBuyTrx();

        if (result.length === 1) {
          tx = await sendTrx(result[0].instructions);
        } else {
          const bundleTxSignature = await jitoTrx(result, wallet);
          tx = bundleTxSignature.transactionHashes[0];
        }
      } else {
        const result: BundleTransaction[] = await swapSellTrx();
        instructions = result[0].instructions;

        tx = await sendTrx(instructions);
      }

      await checkAndConfirmTrx(tx);

      saveTrx(
        ramount,
        wallet.publicKey.toBase58(),
        isBuy ? "buy" : "sell",
        tx,
        amount,
        tokenData?.tokenMint,
        tokenData?.name
      );

      setLoading(false);

      showToast("Transaction successfull.", "success");

      setTimeout(() => {
        pairUpdate();
      }, 3000);
      initializeFunc();
      await fetchBalances();
    } catch (error: any) {
      setLoading(false);
      console.log(error, "error");

      if (error?.logs) {
        console.error("Error Logs:", error?.logs);
      }

      return showToast(error.message);
    }
  }, [
    wallet,
    isBuy,
    initializeFunc,
    swapBuyTrx,
    pairUpdate,
    ramount,
    amount,
    sendTrx,
    swapSellTrx,
    tokenData?.name,
    tokenData?.tokenMint,
    sendTransaction,
    fetchBalances,
  ]);

  useEffect(() => {
    if (!tokenData?.tokenMint) return;
    pairUpdate();
    if (!wallet) return;
    fetchBalances();
  }, [wallet, tokenData?.tokenMint, pairUpdate, fetchBalances]);

  useEffect(() => {
    if (Number(amount) > 0) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [amount]);

  useEffect(() => {
    if (!wallet) return;
    socket.on("token-trade", async (data) => {
      if (data?.user?.walletAddress === wallet?.publicKey) {
        await fetchBalances();
      }
    });

    return () => {
      socket.off("token-trade");
    };
  }, [wallet?.publicKey, fetchBalances]);

  return (
    <div className="rounded-lg p-4 flex flex-col gap-4">
      <Loader loading={loading} />
      <p className="text-sm text-[#F2F2F2] dark:text-[#F2F2F2] font-normal ">
        Swap
      </p>
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-[#2C3133] rounded-lg">
          <TabsTrigger
            value="buy"
            onClick={() => setIsBuy(true)}
            className={clsx(
              "data-[state=active]:text-black data-[state=active]:bg-white rounded-md px-4 py-2 transition-all",
              {
                "data-[state=active]:bg-white data-[state=active]:text-black":
                  isDark,
                "data-[state=active]:bg-black data-[state=active]:text-white":
                  !isDark,
              }
            )}
          >
            Buy
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            onClick={() => setIsBuy(false)}
            className={clsx(
              "data-[state=active]:text-black data-[state=active]:bg-white rounded-md px-4 py-2 transition-all",
              {
                "data-[state=active]:bg-white data-[state=active]:text-black":
                  isDark,
                "data-[state=active]:bg-black data-[state=active]:text-white":
                  !isDark,
              }
            )}
          >
            Sell
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="flex flex-col gap-4">
          <div
            className={`flex items-center justify-between px-5 py-2.5 rounded-full w-full border mt-1 ${
              isDark ? "bg-[#2C3133]" : "bg-gray-200"
            }`}
          >
            <input
              type="text"
              placeholder="5"
              className={`flex-1 bg-transparent border-none w-full outline-none ${
                isDark ? "text-white" : "text-black"
              }`}
              value={amount}
              onChange={(e) => handleUpdateAmount(e.target.value)}
            />
            <div className="flex items-center">
              <span className="text-[#04feae] text-sm font-medium">
                {getExactDecimals(accounts.balanceA, 2)}
              </span>
              <Image
                src="/mobile-logo.png"
                alt="Santigen Logo"
                width={20}
                height={20}
                className="ml-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-between items-center w-full text-gray-200">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-500">
                Max Slippage:
              </span>
              <span className="text-sm font-medium">{2}%</span>
              <ArrowUpIcon className="h-3 w-3 text-green-500" />
            </div>
            <div className="text-sm font-medium flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-500">Gas: </span>
              <span className="text-sm font-medium">{2.24}</span>
            </div>
          </div>

          <Button
            className="flex items-center justify-between min-w-full px-4 py-2 text-black bg-[#04FEAE] rounded-full"
            onClick={swap}
          >
            <div className="flex items-center">
              <Image
                src={tokenData.imgUrl || "/sentigen-logo-btn.png"}
                alt="Santigen Logo"
                width={20}
                height={20}
                className="mr-1 md:mr-2"
              />
              <span className="font-medium">Buy $SNTI</span>
            </div>
            <span className="font-medium">
              ~{Number(ramount).toFixed(2)} ${tokenData.ticker}
            </span>
          </Button>
        </TabsContent>
        <TabsContent value="sell" className="flex flex-col gap-4">
          <div
            className={`flex items-center justify-between px-5 py-2.5 rounded-full w-full border -mt-1 ${
              isDark ? "bg-[#2C3133]" : "bg-gray-200"
            }`}
          >
            <input
              type="text"
              placeholder="5"
              className={`flex-1 bg-transparent border-none w-full outline-none ${
                isDark ? "text-white" : "text-black"
              }`}
              value={amount}
              onChange={(e) => handleUpdateAmount(e.target.value)}
            />
            <div className="flex items-center">
              <span className="text-[#ef5350] text-sm font-medium">
                {getExactDecimals(accounts.balanceB, 2)}
              </span>
              <Image
                src={tokenData.imgUrl || "/mobile-logo.png"}
                alt="Santigen Logo"
                width={20}
                height={20}
                className="ml-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-between items-center w-full text-gray-200">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-500">
                Max Slippage:
              </span>
              <span className="text-sm font-medium">{2}%</span>
              <ArrowUpIcon className="h-3 w-3 text-green-500" />
            </div>
            <div className="text-sm font-medium flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-500">Gas: </span>
              <span className="text-sm font-medium">{2.24}</span>
            </div>
          </div>

          <Button
            className="flex items-center justify-between min-w-full px-4 py-2 text-black bg-[#ef5350] rounded-full mb-[8px]"
            onClick={swap}
            disabled={!status}
          >
            <div className="flex items-center">
              <Image
                src="/sentigen-logo-btn.png"
                alt="Santigen Logo"
                width={20}
                height={20}
                className="mr-1 md:mr-2"
              />
              <span className="font-medium">Sell ${tokenData.ticker}</span>
            </div>
            <span className="font-medium">
              ~{Number(ramount).toFixed(2)} $SNTI
            </span>
          </Button>
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#181B1C] border border-[#282D2E] rounded-lg">
          <TabsTrigger
            value="stats"
            className={cn(
              "px-4 py-1 transition-all rounded-md text-[#7A7A7A] text-[13px] font-semibold",
              "data-[state=active]:bg-[#2C3132] data-[state=active]:text-[#F2F2F2]"
            )}
          >
            Stats
          </TabsTrigger>
          <TabsTrigger
            value="position"
            className={cn(
              "px-4 py-1 transition-all rounded-md text-[13px] text-[#7A7A7A]",
              "data-[state=active]:bg-[#2C3132] data-[state=active]:text-white"
            )}
          >
            My Position
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="1h" className="w-full">
        <TabsList className="w-full flex gap-2 bg-transparent p-1">
          {Object.entries(periodData).map(([period, data]) => (
            <TabsTrigger
              key={period}
              value={period.toLowerCase()}
              className="w-[205px] h-[60px] flex flex-col items-center justify-center data-[state=active]:bg-[#1F2324] bg-[#1F2324] 
                    px-[12px] py-[8px] border border-transparent 
                   group data-[state=active]:border-[#45AA89] rounded"
            >
              {/* Period Name */}
              <span className="uppercase text-[#7A7A7A] group-data-[state=active]:text-white text-sm font-semibold">
                {period}
              </span>

              {/* Percentage Value */}
              <span
                className={`text-lg font-semibold group-data-[state=active]:text-[#17C671] 
                      ${data.value >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {data.value}%
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="w-full max-w-3xl px-1.5">
        <div className="relative">
          {/* Single vertical divider line that spans the entire component */}
          <div className="absolute left-[calc(25%-10px)] top-0 bottom-0 w-px bg-[#2A2B2D] h-full"></div>

          <div className="space-y-2">
            {stats.map((stat, index) => (
              <div key={index} className="grid grid-cols-12 gap-2">
                {/* Left section - Labels and total values */}
                <div className="col-span-3 flex flex-col justify-center">
                  <div className="text-[#7A7A7A] text-xs">{stat.label}</div>
                  <div className="font-semibold text-sm">{stat.value}</div>
                </div>

                {/* Middle section - Buy metrics with green bars */}
                <div className="col-span-4 md:col-span-4.5 flex flex-col justify-center pl-2">
                  <div className="flex flex-col">
                    <span className="text-[#7A7A7A] text-xs">Buys</span>
                    <span className="font-semibold text-sm">
                      {stat.buyValue}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-[#2A2B2D] rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-[#17C671] rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${stat.buyPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Right section - Sell metrics with red bars */}
                <div className="col-span-5 md:col-span-4.5 flex flex-col justify-center">
                  <div className="flex justify-end text-right">
                    <div className="flex flex-col">
                      <span className="text-[#7A7A7A] text-xs">Sells</span>
                      <span className="font-semibold text-sm">
                        {stat.sellValue}
                      </span>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-[#2A2B2D] rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-[#CC434B] rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${stat.sellPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
