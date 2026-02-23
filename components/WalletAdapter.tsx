"use client";

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import React, { ReactNode, useMemo } from 'react';
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaWalletProps {
    children?: ReactNode;
}

const WalletAdapter: React.FC<SolanaWalletProps> = ({children}) => {

    const network = WalletAdapterNetwork.Devnet;

    const endPoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
   <ConnectionProvider endpoint={endPoint}>
    <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <WalletMultiButton/>
        {children}
        </WalletModalProvider>
    </WalletProvider>
   </ConnectionProvider>
  )
}

export default WalletAdapter