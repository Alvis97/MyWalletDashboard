"use client"

import { fetchSolPrice } from '@/services/priceService';
import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import TransactionHistory from './TransactionHistory';

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
    <div className='flex flex-col h-full'>
        <div className='w-full flex justify-end'>
            <Wallet/>
        </div>
        <div className='w-full flex flex-col text-left'>
            <p>Saldo:</p>
            <p>{solBalance.toFixed(2)} sol</p>
            <p>Total in US: ${usdValue.toFixed(2)}</p>
        </div>
        <div className='flex flex-col flex-1 overflow-hidden'>
           <p className='text-left'>Transactions:</p>
           <div className='flex-1 overflow-y-auto overflow-x-hidden'>
            <TransactionHistory/>
           </div>
        </div>
    </div>
  )
}

export default WalletInfoCard