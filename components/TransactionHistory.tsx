"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection, PublicKey, TransactionResponse } from '@solana/web3.js';
import { MoveDown, MoveUp } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function TransactionHistory() {
const {publicKey} = useWallet();
const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
const [ error, setError ] = useState(false);
const [ loading, setLoading] = useState(true);
const TEST_WALLET = new PublicKey(process.env.NEXT_PUBLIC_TEST_WALLET!);

useEffect(() => {
   if (!publicKey) return

   const fetchTransactions = async () => {

       try {
    //Test for test wallet Helius
    const walletKey = new PublicKey(TEST_WALLET);
    const connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_RPC_URL!);
    const signatures = await connection.getSignaturesForAddress(TEST_WALLET, { limit: 15 });

    // for mainnet
    // const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });

    const txs = await Promise.all(
      signatures.map(sig=> connection.getTransaction(sig.signature))
    );

    const tsxFiltered = txs.filter(
        (tx): tx is TransactionResponse => tx !== null
    ).filter(tx => {
        const accountKeys = tx.transaction.message.accountKeys.map(k => k.toString());
        const walletIndex = accountKeys.findIndex(k => k === TEST_WALLET.toString());
        const pre = tx.meta?.preBalances[walletIndex] ?? 0;
        const post = tx.meta?.postBalances[walletIndex] ?? 0;
        return post - pre !== 0;
    })

    setTransactions(tsxFiltered);
    setLoading(false);

   } catch (err) {
    console.error(err);
    setError(true);
   }
  
   };
   fetchTransactions();

}, [publicKey])
 
  return (
    <div>
      <ul>
        { error ? (
          <li className='text-sm text-left pt-2 text-neutral-400'>Something went wrong, <br/> please try again!</li>
        ) : loading ? (
      <>
          {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className='card-inside flex justify-between p-2.5 my-1 md:p-3'>
                  {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className='animate-pulse bg-neutral-300 dark:bg-gray-700 rounded h-3 w-[50px]'/>
                  ))}
              </li>
          ))}
          </>
      ) : transactions.length === 0 ? (
           <li className='text-sm text-left pt-2 text-neutral-400'>No transactions in this wallet</li>
        ) : (
        <>
        {transactions.map((tx, i) => {
          const accountKeys = tx.transaction.message.accountKeys.map(k => k.toString());
          const walletIndex = accountKeys.findIndex(k => k === TEST_WALLET.toString());
          const pre= walletIndex >= 0 ? tx.meta?.preBalances[walletIndex] ?? 0 : 0;
          const post= walletIndex >= 0 ? tx.meta?.postBalances[walletIndex] ?? 0 : 0;
          const diff = (post - pre) / 1_000_000_000

          const fee = tx.meta?.fee ?? 0
          const feeSOL = fee / 1_000_000_000
          const netAmount = diff - feeSOL

          const type = netAmount > 0 ? "Deposit" : "Withdraw";
          const amount = Math.abs(diff).toFixed(4);

          const status = tx.meta?.err === null ? "Completed" : tx.meta?.err ? "Failed" : "Pending"

          const statusColor =
            status === "Completed"
              ? "text-emerald-700 dark:text-green-500"
              : status === "Failed"
                ? "text-amber-700 dark:text-red-500"
                : "text-mauve-400";

          const date = tx.blockTime
          ? new Date(tx.blockTime * 1000).toLocaleDateString()
          : "Unknown";    

          return (
          <li key={i} className='card-inside flex justify-between p-2.5 my-1 md:p-3'>
            <span className="font-light text-[10px] md:text-xs  flex items-center gap-1">
              { type === "Deposit" ? <MoveUp size={14}/> : <MoveDown size={12}/> }
              {type}
            </span>
            <span className='font-light text-[10px] md:text-xs'>{amount} SOL</span>
            <span className='font-light text-[10px] md:text-xs' >{date}</span>
            <span className={`${statusColor} font-light text-[10px] md:text-xs`}>{status}</span>
          </li>
          )
      
        })}
        </>
      )}

      </ul>
    </div>
  )
}

export default TransactionHistory