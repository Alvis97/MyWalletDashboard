"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection, TransactionResponse } from '@solana/web3.js';
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
        {transactions.map((tx, i) => (
          <li key={i}>
            Slot: {tx?.slot ?? "?"},
            Fee: {tx?.meta?.fee ?? "?"},
            Time: {tx.blockTime
            ? new Date(tx.blockTime * 1000).toLocaleString()
          : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionHistory