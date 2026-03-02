"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection, TransactionResponse } from '@solana/web3.js';
import { MoveDown, MoveUp } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function TransactionHistory() {
const {publicKey} = useWallet();
const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

useEffect(() => {
   if (!publicKey) return

   const fetchTransactions = async () => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });

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

          return (
          <li key={i} className='flex justify-between'>
            <span>{ type === "Deposit" ? <MoveUp size={16} className="inline-block"/> : <MoveDown size={16} className="inline-block"/>}{type}</span>
            <span>{amount} SOL</span>
            <span
            className={
              status === "Completed" 
                ? "text-green-500" 
                : status === "Failed" 
                  ? "text-red-500" 
                  : "text-gray-300"
            }
          >
            {status}
          </span>
          </li>
          )
      
        })}
      </ul>
    </div>
  )
}

export default TransactionHistory