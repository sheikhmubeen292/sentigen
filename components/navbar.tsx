"use client";
import Image from "next/image";
import { Search, ChevronDown, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, BN, Idl, Program } from "@coral-xyz/anchor";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

import IDL from "@/idl/idl.json";
import {
  connection,
  ownerPubKey,
  sentigenToken,
  tokenMintAmount,
} from "@/utils/solana";
import { useCallback, useState } from "react";
import { SearchCommand } from "./search-command";
import { MobileNav } from "./mobile-nav";

export default function Navbar() {
  const router = useRouter();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const initializeState = useCallback(async () => {
    try {
      console.log("Initializing state");
      if (!wallet) return console.log("wallet not found");

      const provider = new AnchorProvider(connection, wallet);

      const program = new Program(IDL as Idl, provider);

      const globalPda = PublicKey.findProgramAddressSync(
        [Buffer.from("global-config-sentigen"), ownerPubKey.toBuffer()],
        program.programId
      )[0];

      console.log(globalPda.toString(), "globalPda");

      const baseToken = sentigenToken;
      const poolAuthority = PublicKey.findProgramAddressSync(
        [Buffer.from("pda-token"), ownerPubKey.toBuffer()],
        program.programId
      )[0];

      const poolTokenAAccount = Keypair.generate();
      const baseTokenPlatform = new PublicKey(
        "PnWkpeaGJn5QnH5MKigpChpFzi7RPeATMUh5XVVKA3a"
      );
      const baseTokenAgentVault = new PublicKey(
        "FjU1t6SvZmcCnS76ezDiYhWT8JWeeo5wwjwshd56GGi1"
      );

      const swapperTokenAAccount = await getAssociatedTokenAddress(
        sentigenToken,
        baseTokenPlatform,
        true,
        TOKEN_2022_PROGRAM_ID
      );
      const swapperTokenBAccount = await getAssociatedTokenAddress(
        sentigenToken,
        baseTokenAgentVault,
        true,
        TOKEN_2022_PROGRAM_ID
      );

      const swapIxn = await program.methods
        .initialize(
          new BN("100"),
          new BN("10000000000000"),
          new BN("85000000000"),
          new BN(String(tokenMintAmount))
        )
        .accounts({
          globalConfiguration: globalPda,
          poolTokenAAccount: poolTokenAAccount.publicKey.toBase58(),
          baseTokenPlatform: swapperTokenAAccount,
          baseTokenAgentVault: swapperTokenBAccount,
          poolTokensAuthority: poolAuthority.toBase58(),
          baseToken: baseToken,
          admin: ownerPubKey,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: "SysvarRent111111111111111111111111111111111",
        })
        .instruction();

      const { blockhash } = await connection.getLatestBlockhash();
      const message = new TransactionMessage({
        payerKey: wallet.publicKey,
        recentBlockhash: blockhash,
        instructions: [swapIxn],
      }).compileToV0Message();

      const transaction = new VersionedTransaction(message);

      const simulationResult = await connection.simulateTransaction(
        transaction
      );
      console.log(simulationResult, "simulationResult");

      if (simulationResult.value.err) {
        console.error("Simulation Error:", simulationResult.value.err);
        console.error("Simulation Logs:", simulationResult.value.logs);
        // return showToast(
        //   "Transaction simulation failed. Check logs for details."
        // );
      }

      transaction.sign([poolTokenAAccount]);

      const signedTxn = await wallet.signTransaction(transaction);
      const tx = await sendTransaction(signedTxn, connection);

      console.log(tx, "txid");
    } catch (e) {
      console.log("error in initialization:", e);
    }
  }, [wallet]);
  return (
    <header className="flex items-center justify-between p-4 bg-[#0d0d0d]">
      <div className="flex items-center md:gap-10 bg-red">
        <div className="flex items-center" onClick={() => router.push("/")}>
          <Image
            src="/logo.png"
            alt="Santigen Logo"
            width={180}
            height={40}
            className="cursor-pointer lg:block xl:block  hidden"
          />
          <Image
            src="/mobile-logo.png"
            alt="Santigen Logo"
            width={40}
            height={40}
            className="cursor-pointer block lg:hidden xl:hidden "
          />
        </div>

        <div className="flex items-center justify-between w-auto md:w-[240px] ml-4">
          <Search
            onClick={() => setIsSearchOpen(true)}
            className="h-6 w-6 md:h-5 md:w-5 text-[#7a7a7a] cursor-pointer mr-3"
          />
          <SearchCommand isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />

          <div className="hidden md:flex gap-3">
            <Button
              onClick={() => router.push("/")}
              // onClick={initializeState}
              variant="ghost"
              size="sm"
              className="text-[#7a7a7a]"
            >
              <Image
                src="/explore.png"
                alt="Explore Icon"
                width={24}
                height={40}
                className="h-[29px] w-[27px]"
              />
              <p className="text-sm text-[#7A7A7A]">Explore</p>
            </Button>
            <Button
              onClick={() =>
                publicKey && router.push(`/profile/${publicKey.toString()}`)
              }
              variant="ghost"
              size="sm"
              className="text-[#7a7a7a]"
            >
              <Image
                src="/about.png"
                alt="About Icon"
                width={21}
                height={16}
                className="h-[20px] w-[22px]"
              />
              <p className="text-sm text-[#7A7A7A] ml-1">About</p>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => router.push("/create-agent")}
          className="bg-white hidden md:flex items-center gap-2 px-4 h-10 rounded-md shadow-md"
        >
          <Image
            src="/rocket.png"
            alt="Rocket Icon"
            width={16}
            height={16}
            className="w-5 h-5"
          />
          <span className="font-[Inter] font-semibold text-[14px] capitalize leading-none tracking-normal text-[#1F1F1F]">
            Launch Idea
          </span>
        </Button>

        <WalletMultiButton>
          <Image
            src="/imageText.png"
            alt="User Avatar"
            width={16}
            height={16}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-xs font-[Inter] font-semibold text-[#7A7A7A] ">
            {publicKey
              ? `${publicKey.toString().slice(0, 4)}...${publicKey
                  .toString()
                  .slice(-4)}`
              : "Connect wallet"}
          </span>
        </WalletMultiButton>
        {/* <ThemeToggle /> */}
        {/* <Button className="bg-transparent"> */}
        {/* <ChevronDown className="h-5 w-5 text-[#7a7a7a] hidden md:block" /> */}
        <MobileNav>
          <LayoutGrid
            strokeWidth={3}
            className="md:hidden flex text-[#7A7A7A] cursor-pointer"
          />
        </MobileNav>
        {/* </Button> */}
      </div>
    </header>
  );
}
