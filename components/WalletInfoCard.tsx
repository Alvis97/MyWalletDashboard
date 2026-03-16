"use client"

import { fetchSolPrice } from '@/services/priceService';
import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import TransactionHistory from './TransactionHistory';

function WalletInfoCard() {

    const { publicKey } = useWallet();
    const [solBalance, setSolBalance] = useState(0);
    const [usdValue, setUsdValue] = useState(0);
    const [transactionDate, setTransactionDate] = useState(0);

    //Get amount
    useEffect(() => {
        const fetchBalance = async () => {
            if (!publicKey) return

            //get balance från test wallet
            const TEST_WALLET = new PublicKey(process.env.NEXT_PUBLIC_TEST_WALLET!);
            const connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_RPC_URL!);
            const lamports = await connection.getBalance(TEST_WALLET);

            //Get Balance from logged in wallet
            // const lamports = await connection.getBalance(publicKey);

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
    <div className='flex flex-col justify-between h-full min-h-0 p-4 md:p-5'>
        <div className='w-full flex justify-end'>
            <Wallet size={30}/>
        </div>

        <div className='w-full flex flex-col flex-1 text-left justify-end p-3 pb-6 md:p-5'>
            <p className='font-extralight text-xs md:text-s'>Balance:</p>
            <p className='font-light text-2xl md:text-4xl'>{solBalance.toFixed(2)} sol</p>
            <p className='font-extralight text-xs md:text-s'>Total value: ${usdValue.toFixed(2)}</p>
        </div>

        <div className='card-inset p-3 flex flex-col h-[70%] md:p-5'>
           <p className='font-extralight text-xs text-left pb-2 md:pb-4'>Transactions:</p>
           <div className='flex-1 min-h-0 overflow-y-auto'>
            <TransactionHistory/>
           </div>
        </div>
    </div>
  )
}

export default WalletInfoCard