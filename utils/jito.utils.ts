import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

import { connection, JitoTip, JitoUrl, JitoWallet } from "./solana";
import bs58 from "bs58";
import axios from "axios";
import { BundleTransaction } from "@/types/tx.types";

export const jitoTrx = async (
  bundles: BundleTransaction[],
  wallet: AnchorWallet
) => {
  const { blockhash } = await connection.getLatestBlockhash();

  const vtxs = bundles.map(({ instructions }, idx) => {
    const isLast = idx === bundles.length - 1;
    const ixList = isLast
      ? [
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(JitoWallet),
            lamports: JitoTip * LAMPORTS_PER_SOL,
          }),
          ...instructions,
        ]
      : instructions;

    const msgV0 = new TransactionMessage({
      payerKey: wallet.publicKey,
      recentBlockhash: blockhash,
      instructions: ixList,
    }).compileToV0Message();

    return new VersionedTransaction(msgV0);
  });

  vtxs.forEach((tx, idx) => {
    const signers = bundles[idx].signers ?? [];
    if (signers.length > 0) {
      tx.sign(signers);
    }
  });

  const fullySigned = await wallet.signAllTransactions(vtxs);

  // const transactionHashes = fullySigned.map((tx) => {
  //   const rawTx = tx?.signatures.map((val) => bs58.encode(val));

  //   return [...rawTx];
  // });

  // console.log("Transaction hashes:", transactionHashes);

  // const encoded = fullySigned.map((tx) => bs58.encode(tx.serialize()));

  const encoded = fullySigned.map((tx) =>
    Buffer.from(tx.serialize()).toString("base64")
  );

  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "sendBundle",
    params: [encoded, { encoding: "base64" }],
  };

  try {
    const resp = await axios.post(`${JitoUrl}/bundles`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const bundleId = resp.data.result;

    // Fetch bundle status
    const statusPayload = {
      jsonrpc: "2.0",
      id: 1,
      method: "getBundleStatuses",
      params: [[bundleId]],
    };

    const statusResp = await axios.post(
      `${JitoUrl}/getBundleStatuses`,
      statusPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const transactionHashes =
      statusResp.data.result.value[0]?.transactions || [];

    console.log(transactionHashes, "transactionHashes");

    return { bundle: bundleId, transactionHashes };
  } catch (error) {
    console.error("Error sending bundle:", error);
    throw error;
  }

  // const bundleUrl = JitoUrl;
  // const payload = {
  //   jsonrpc: "2.0",
  //   id: 1,
  //   method: "sendBundle",
  //   params: [encoded, { encoding: "base64" }],
  // };

  // const resp = await axios.post(bundleUrl, payload, {
  //   headers: { "Content-Type": "application/json" },
  // });

  // return { bundle: resp.data.result, transactionHashes };
};
