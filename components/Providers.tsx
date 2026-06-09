"use client"

import React, { ReactNode, useMemo } from 'react'
import { useNetwork } from './networkContext'
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Providers({ children } : { children: ReactNode}) {

    const {selectedNetwork} = useNetwork();

    const network = 
    selectedNetwork === "Devnet"
    ? WalletAdapterNetwork.Devnet
    : WalletAdapterNetwork.Mainnet
    const endpoint = useMemo(() => 
        selectedNetwork === "Mainnet"
    ? process.env.NEXT_PUBLIC_HELIUS_RPC_URL!
    : clusterApiUrl(network)
    , [network])
    const wallets = useMemo(() => [new PhantomWalletAdapter()], [network])

    console.log("network: ", network)
    console.log("selected network: ", selectedNetwork)
    console.log("endpoint:", endpoint);
  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  )
}