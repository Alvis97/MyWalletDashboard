"use client"

import { fetchSolPrice } from '@/services/priceService';
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js';
import { Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import TransactionHistory from './TransactionHistory';
import { useNetwork } from './networkContext';
import { connection } from 'next/server';
import { LuSend } from 'react-icons/lu';
import { MdCallReceived, MdOutlineWaterDrop } from 'react-icons/md';

function WalletInfoCard() {

    const { publicKey } = useWallet();
    const { selectedNetwork } = useNetwork()
    const [solBalance, setSolBalance] = useState(0);
    const [usdValue, setUsdValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [ error, setError ] = useState(false);

    //Get amount
    useEffect(() => {
        if (!publicKey) return

        const fetchBalance = async () => {

            try {

            //get connection based on mainnet or devnet
            const connection = selectedNetwork === "Mainnet"
            ? new Connection(process.env.NEXT_PUBLIC_HELIUS_RPC_URL!)
            : new Connection('https://api.devnet.solana.com');

            //Get Balance from logged in wallet
            const lamports = await connection.getBalance(publicKey);

            const sol = lamports / 1_000_000_000;
            setSolBalance(sol)

            //get Sol prices
            const price = await fetchSolPrice();

            //Convert to US dollars
            if (price) {
                setUsdValue(sol * price)
            }
            
            setLoading(false);
            
            } catch (err) {
                console.error(err);
                setError(true);
            }

        }
        fetchBalance();
           console.log("selectedNetwork walletcard:", selectedNetwork)
    }, [publicKey, selectedNetwork]);

  return (
    <div className='h-full'>
    <div className='w-[90%] h-full flex flex-col justify-between gap-5 mx-auto sm:w-[80%] md:w-[70%] 2xl:w-[60%]'>

        <div className='w-[95%] mx-auto flex flex-col pt-[10%]  md:pt-[5%] sm:flex-row justify-between gap-5 text-start'>
            <div>
            <p className='opacity-50'>Total balance:</p>
       
                { error ? (
                    <p>---</p>
                ) : loading ? (
                    <>
                    <div className='animate-pulse bg-neutral-300 rounded-lg h-7 mt-1 w-[150px] mb-2 dark:bg-neutral-700'/>
                    <div className='animate-pulse bg-neutral-300 rounded-lg h-4 w-[100px] dark:bg-neutral-700'/>
                    </>
                )  : solBalance === 0 ? (
                    <p className=''>Your wallet is empty</p>
                ) : (
                    <>
                    <h1>${usdValue.toFixed(2)}</h1>
                    <div className='flex gap-3 items-center'>
                        <p className='opacity-50'>{solBalance.toFixed(2)} SOL </p>
                        <span><p>+Daily rate</p></span>
                    </div>   
                </>
                )}
            </div>

            <div className='flex justify-between md:gap-4 xl:gap-7'>
                <div className='flex flex-col items-center justify-between gap-2'>
                    <button className='btn-square bg-[var(--purple)]'><LuSend className='h-5 w-5'/></button>
                    <p>Send</p>
                </div>

                <div className='flex flex-col items-center justify-between gap-2'>
                    <button className='btn-square '><MdCallReceived className='h-5 w-5 fill-[var(--purple)]'/></button>
                    <p>Receive</p>
                </div>

                <div className='flex flex-col items-center justify-between gap-2'>
                    <button className='btn-square'><MdOutlineWaterDrop className='h-5 w-5 fill-[var(--purple)]'/></button>
                    <p>Airdrop</p>
                </div>
                
                
                
            </div>
        </div>

        <div className='glass-card p-2 pb-7 pt-3 flex flex-1 flex-col md:p-5'>
            <div className='flex justify-between'>
                <p className='text-sm'>Transactions:</p>
                <a className='text-sm' href="">View all</a>
            </div>
           <div className='flex-1 min-h-0 overflow-y-auto'>
            <TransactionHistory/>
           </div>
        </div>

        </div>
    </div>
  )
}

export default WalletInfoCard