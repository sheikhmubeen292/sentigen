import { Idl, Program } from "@coral-xyz/anchor";
import {
  createAssociatedTokenAccountInstruction,
  getAccount,
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMint2Instruction,
  createInitializeTransferFeeConfigInstruction,
  getMintLen,
  getMint,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createSetAuthorityInstruction,
  AuthorityType,
} from "@solana/spl-token";
import {
  ComputeBudgetProgram,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  DataV2Args,
  TokenStandard,
  createV1,
  mintV1,
  updateMetadataAccountV2,
  updateV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { none, publicKey } from "@metaplex-foundation/umi";
import {
  type GenericFile,
  type TransactionBuilder,
  type KeypairSigner,
  createSignerFromKeypair,
  percentAmount,
  transactionBuilder,
  amountToNumber,
  Umi,
} from "@metaplex-foundation/umi";
import {
  fromWeb3JsInstruction,
  fromWeb3JsKeypair,
  fromWeb3JsPublicKey,
  toWeb3JsPublicKey,
} from "@metaplex-foundation/umi-web3js-adapters";

import { ITokenDetail } from "@/types/contract.types";
import { connection, ownerPubKey, tokenMintAmount } from "@/utils/solana";
import { generateTrxBuilder } from "@/utils/helper";

export const checkCompute = async () => {
  const instructions = [];
  const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 10000,
  });
  const computeLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
    units: 100000_000,
  });
  instructions.push(computePriceIx);
  instructions.push(computeLimitIx);
  return instructions;
};

export const checkMint = async (token: PublicKey) => {
  try {
    await getMint(connection, token, "confirmed", TOKEN_2022_PROGRAM_ID);
    return true;
  } catch (error) {
    return false;
  }
};

const createMint = async (
  mint: KeypairSigner,
  umi: Umi,
  tokenData: ITokenDetail,
  withdrawAuthority: PublicKey
): Promise<TransactionBuilder> => {
  const extensions = [ExtensionType.TransferFeeConfig];
  const mintLen = getMintLen(extensions);

  const mintLamports = await connection.getMinimumBalanceForRentExemption(
    mintLen
  );

  const mintAccountInstruction = SystemProgram.createAccount({
    fromPubkey: toWeb3JsPublicKey(umi.payer.publicKey),
    lamports: mintLamports,
    newAccountPubkey: toWeb3JsPublicKey(mint.publicKey),
    programId: TOKEN_2022_PROGRAM_ID,
    space: mintLen,
  });

  const transferFeeConfigInstruction =
    createInitializeTransferFeeConfigInstruction(
      toWeb3JsPublicKey(mint.publicKey),
      withdrawAuthority,
      withdrawAuthority,
      amountToNumber(percentAmount(tokenData.tokenFee)),
      BigInt(tokenData.maxTokenFee),
      TOKEN_2022_PROGRAM_ID
    );

  const initializeMintInstruction = createInitializeMint2Instruction(
    toWeb3JsPublicKey(mint.publicKey),
    9,
    toWeb3JsPublicKey(umi.identity.publicKey),
    toWeb3JsPublicKey(umi.identity.publicKey),
    TOKEN_2022_PROGRAM_ID
  );

  return transactionBuilder([
    {
      instruction: fromWeb3JsInstruction(mintAccountInstruction),
      signers: [mint, umi.payer],
      bytesCreatedOnChain: mintLen,
    },
    {
      instruction: fromWeb3JsInstruction(transferFeeConfigInstruction),
      signers: [umi.identity],
      bytesCreatedOnChain: 0,
    },
    {
      instruction: fromWeb3JsInstruction(initializeMintInstruction),
      signers: [umi.identity],
      bytesCreatedOnChain: 0,
    },
  ]);
};

const revokeMintAndFreezeAuthority = (
  mintPubkey: PublicKey,
  currentAuthority: PublicKey
): TransactionBuilder => {
  const revokeMintAuthorityIx = createSetAuthorityInstruction(
    mintPubkey,
    currentAuthority,
    AuthorityType.MintTokens,
    null, // New authority is null = revoke
    [],
    TOKEN_2022_PROGRAM_ID
  );

  const revokeFreezeAuthorityIx = createSetAuthorityInstruction(
    mintPubkey,
    currentAuthority,
    AuthorityType.FreezeAccount,
    null, // New authority is null = revoke
    [],
    TOKEN_2022_PROGRAM_ID
  );

  return transactionBuilder([
    {
      instruction: fromWeb3JsInstruction(revokeMintAuthorityIx),
      signers: [], // umi.identity will sign the whole bundle
      bytesCreatedOnChain: 0,
    },
    {
      instruction: fromWeb3JsInstruction(revokeFreezeAuthorityIx),
      signers: [],
      bytesCreatedOnChain: 0,
    },
  ]);
};

export const checkToken = async (
  umi: Umi,
  imgData: GenericFile,
  program: Program<Idl>,
  userPubKey: PublicKey,
  tokenData: ITokenDetail,
  tokenAMintAddress: PublicKey,
  tokenBMintAddress: PublicKey,
  bondingCurve: PublicKey,
  globalPda: PublicKey
) => {
  try {
    const token = new PublicKey(tokenData.tokenMint);
    const tokenStatus = await checkMint(token);
    if (tokenStatus) {
      return {
        tokenTrx: null,
        revokeTrx: null,
        pdaTokenAAccount: null,
        pdaTokenBAccount: null,
      };
    }

    const tokenAcc = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(`[${tokenData.tokenPrivate}]`))
    );

    const withdrawAuthority = PublicKey.findProgramAddressSync(
      [Buffer.from("tax_withheld_auth"), globalPda.toBuffer()],
      program.programId
    )[0];
    const pdaTokenBAccount = Keypair.generate();

    const mint = createSignerFromKeypair(umi, fromWeb3JsKeypair(tokenAcc));

    const imageUrl = await umi.uploader.upload([imgData]);

    const metadata = {
      name: tokenData.name,
      symbol: tokenData.ticker,
      image: imageUrl[0],
    };

    const uri = await umi.uploader.uploadJson(metadata);

    const poolAuthority = PublicKey.findProgramAddressSync(
      [Buffer.from("pda-token"), ownerPubKey.toBuffer()],
      program.programId
    )[0];

    const createMetatdataTrx = createV1(umi, {
      ...metadata,
      mint: mint.publicKey,
      uri,
      sellerFeeBasisPoints: percentAmount(tokenData.tokenFee),
      splTokenProgram: fromWeb3JsPublicKey(TOKEN_2022_PROGRAM_ID),
      tokenStandard: TokenStandard.Fungible,
    });

    const mintTrx = mintV1(umi, {
      mint: mint.publicKey,
      authority: umi.identity,
      amount: tokenMintAmount,
      token: fromWeb3JsPublicKey(pdaTokenBAccount.publicKey),
      tokenOwner: fromWeb3JsPublicKey(poolAuthority),
      tokenStandard: TokenStandard.Fungible,
      splTokenProgram: fromWeb3JsPublicKey(TOKEN_2022_PROGRAM_ID),
    });

    const createMintTrx = await createMint(
      mint,
      umi,
      tokenData,
      withdrawAuthority
    );

    const globalAccount = await (
      program.account as any
    ).initializeConfiguration.fetch(globalPda);

    const createAccountsIxn = await program.methods
      .create(tokenData.seed)
      .accounts({
        signer: new PublicKey(userPubKey),
        globalConfiguration: globalPda,
        bondingCurve: new PublicKey(bondingCurve),
        tokenA: new PublicKey(tokenAMintAddress),
        poolTokenAAccount: globalAccount.poolTokenAAccount.toBase58(),
        tokenB: new PublicKey(tokenBMintAddress),
        poolTokenBAccount: new PublicKey(pdaTokenBAccount.publicKey),
        poolTokensAuthority: poolAuthority,
        admin: ownerPubKey.toBase58(),
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const pdaTokenBAccountUmi = fromWeb3JsKeypair(pdaTokenBAccount);
    const pdaTokenBAccountSigner = createSignerFromKeypair(
      umi,
      pdaTokenBAccountUmi
    );

    const createAccountsTrx = generateTrxBuilder(
      createAccountsIxn,
      [pdaTokenBAccountSigner],
      0
    );

    const revokeAuthorityTrx = revokeMintAndFreezeAuthority(
      toWeb3JsPublicKey(mint.publicKey),
      toWeb3JsPublicKey(umi.identity.publicKey)
    );

    const feeAmt = percentAmount(tokenData.tokenFee);

    const sellerFeeBasisPoints: number = Number(feeAmt.basisPoints);

    const SYSTEM_PROGRAM_PUBKEY = publicKey("11111111111111111111111111111111");
    const metadataData: DataV2Args = {
      name: metadata.name,
      symbol: metadata.symbol,
      uri: uri,
      sellerFeeBasisPoints,
      creators: [
        { address: umi.identity.publicKey, verified: true, share: 100 },
      ],
      collection: null,
      uses: null,
    };

    const revokeMetadataBuilder = updateV1(umi, {
      mint: mint.publicKey,
      authority: umi.identity,
      data: metadataData,
      newUpdateAuthority: SYSTEM_PROGRAM_PUBKEY,
      isMutable: false,
    });

    const trx = createMintTrx
      .add(createMetatdataTrx)
      .add(createAccountsTrx)
      .add(mintTrx);

    const revokeTrx = revokeAuthorityTrx.add(revokeMetadataBuilder);

    return {
      tokenTrx: trx,
      revokeTrx,
      pdaTokenAAccount: globalAccount.poolTokenAAccount,
      pdaTokenBAccount: pdaTokenBAccount.publicKey,
    };
  } catch (error) {
    console.log("check token error log", error);
    return {
      tokenTrx: null,
      revokeTrx: null,
      pdaTokenAAccount: null,
      pdaTokenBAccount: null,
    };
  }
};

export const checkQuoteToken = async (
  mint: PublicKey,
  pubkey: PublicKey,
  tokenAcc: PublicKey
): Promise<TransactionInstruction | null> => {
  let instructions = null;
  try {
    await getAccount(connection, tokenAcc, "processed", TOKEN_2022_PROGRAM_ID);
  } catch {
    const createTokenAccountIxn = createAssociatedTokenAccountInstruction(
      pubkey,
      tokenAcc,
      pubkey,
      mint,
      TOKEN_2022_PROGRAM_ID
    );
    instructions = createTokenAccountIxn;
  }
  return instructions;
};
