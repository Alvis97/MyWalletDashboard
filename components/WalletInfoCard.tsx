"use client"

import { fetchSolPrice } from '@/services/priceService';
import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function WalletInfoCard() {

    const { publicKey, connected } = useWallet();
    const [solBalance, setSolBalance] = useState(0);
    const [usdValue, setUsdValue] = useState(0);

    //Get amount
    useEffect(() => {
        const fetchBalance = async () => {
            if (!publicKey) return

            //get balance
            const connection = new Connection(clusterApiUrl('devnet'));
            const lamports = await connection.getBalance(publicKey);
            const sol = lamports / 1_000_000_000;
            setSolBalance(sol)

            //get Sol prices
            const price = await fetchSolPrice();

            //Convert to US dollars
            if (price) {
                setUsdValue(sol * price)
            }
        }
        fetchBalance();
    }, [publicKey]);

  return (
    <div>
        <div>
            <Wallet/>
        </div>
        <div>
            <p>Saldo:</p>
            <p>{solBalance.toFixed(2)} sol</p>
            <p>Total in US: ${usdValue.toFixed(2)}</p>
        </div>
        <div>
           <p>Transactions:</p>
           <div>
            <p>Scroll div</p>
           </div>
        </div>
    </div>
  )
}

export default WalletInfoCard