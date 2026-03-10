"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection, PublicKey, TransactionResponse } from '@solana/web3.js';
import { MoveDown, MoveUp } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function TransactionHistory() {
const {publicKey} = useWallet();
const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

useEffect(() => {
   if (!publicKey) return

   const fetchTransactions = async () => {

    //Test for test wallet Helius
    const TEST_WALLET = new PublicKey(process.env.NEXT_PUBLIC_TEST_WALLET!);
    const connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_RPC_URL!);
    const signatures = await connection.getSignaturesForAddress(TEST_WALLET, { limit: 10 });

    // för mainnet
    // const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });

    const txs = await Promise.all(
      signatures.map(sig=> connection.getTransaction(sig.signature))
    );

    const tsxFiltered = txs.filter(
    (tx): tx is TransactionResponse => tx !== null
  );
    setTransactions(tsxFiltered);
  
   };
   fetchTransactions();

}, [publicKey])
 
  return (
    <div>
      <ul>
        {transactions.map((tx, i) => {
          const pre = tx.meta?.preBalances[0] ?? 0
          const post = tx.meta?.postBalances[0] ?? 0
          const diff = (post - pre) / 1_000_000_000
          const fee = tx.meta?.fee ?? 0
          const feeSOL = fee / 1_000_000_000
          const netAmount = diff - feeSOL

          const type = netAmount > 0 ? "Deposit" : "Withdraw";
          const amount = Math.abs(diff).toFixed(2);

          const status = tx.meta?.err === null ? "Completed" : tx.meta?.err ? "Failed" : "Pending"

          const statusColor =
            status === "Completed"
              ? "text-emerald-700"
              : status === "Failed"
                ? "text-amber-700"
                : "text-mauve-400";

          const date = tx.blockTime
          ? new Date(tx.blockTime * 1000).toLocaleDateString()
          : "Unknown";    

          return (
          <li key={i} className='card-inside flex justify-between p-3 my-1'>
            <span className="font-light text-xs  flex items-center gap-1">
              { type === "Deposit" ? <MoveUp size={16}/> : <MoveDown size={16}/> }
              {type}
            </span>
            <span className='font-light text-xs'>{amount} SOL</span>
            <span className='font-light text-xs' >{date}</span>
            <span className={`${statusColor} font-light text-xs`}>{status}</span>
          </li>
          )
      
        })}
      </ul>
    </div>
  )
}

export default TransactionHistory