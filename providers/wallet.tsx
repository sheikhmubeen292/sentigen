import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,
  TorusWalletAdapter,
  BitgetWalletAdapter,
  CoinbaseWalletAdapter,
  TrustWalletAdapter,
  Coin98WalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletConnectWalletAdapter } from "@walletconnect/solana-adapter";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ReactNode, useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { networkUrl } from "@/utils/solana";

export default function WalletProvider({ children }: { children: ReactNode }) {
  const network = WalletAdapterNetwork.Mainnet;
  // const network = WalletAdapterNetwork.Devnet;
  const endpoint = networkUrl;
  const _walletConnect = useMemo(() => {
    const connectWallet: WalletConnectWalletAdapter[] = [];
    try {
      connectWallet.push(
        new WalletConnectWalletAdapter({
          network: network as WalletAdapterNetwork.Mainnet,
          options: {
            projectId: "588bcfc95384e4bb82bd504c4becdf7e",
            metadata: {
              name: "Sentigen App",
              description: "Sentigen App",
              url: "https://sentigen-client-git-ui-sentigen.vercel.app",
              icons: [""],
            },
          },
        })
      );
    } catch (e) {
      // console.error('WalletConnect error', e)
    }
    return connectWallet;
  }, [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      ..._walletConnect,
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new TrustWalletAdapter(),
      new CoinbaseWalletAdapter({ endpoint }),
      new SolongWalletAdapter({ endpoint }),
      new Coin98WalletAdapter({ endpoint }),
      new BitgetWalletAdapter({ endpoint }),
    ],
    [_walletConnect, endpoint]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider autoConnect wallets={wallets}>
        <WalletModalProvider>
          <SnackbarProvider
            maxSnack={2}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {children}
          </SnackbarProvider>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
