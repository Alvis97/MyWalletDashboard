"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { Ticket } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { fetchTransaction, fetchTokens, fetchTokenPrice } from '../services/tokenService';

type Token = {
  mint: string;
  amount: number;
  decimals: number;
  usdPrice: number;
  priceChange24h: number;
}

function TokenCard() {
  const [tokens, setTokens] = useState<Token[]>([]);  
 const testWallet = process.env.NEXT_PUBLIC_TEST_WALLET;

    useEffect(() => {
        fetchTokens(testWallet)
        .then(async (tokens) => {
            const tokensWithPrice = await Promise.all(
                tokens.slice(0, 10).map((async (token: {mint: string, amount: number, decimals: number}) => {
                    const priceData = await fetchTokenPrice(token.mint)
                    return {
                        mint: token.mint,
                        amount: token.amount,
                        decimals: token.decimals,
                        usdPrice: priceData?.usdPrice ?? 0,
                        priceChange24h: priceData?.priceChange24h ?? 0,
                    }
                })
                ))

           setTokens(tokensWithPrice)
    })
    }, []);

  return (
    <div className='flex flex-col'>
        <div className='flex justify-end'>
            <Ticket size={40}/>
        </div>
        <div className='flex justify-start pt-10'>
            <h2>Tokens:</h2>
        </div>
      
        <div className='flex flex-col flex-1 bg-sky-50'>
            <ul>
                {tokens.map((token, index) => {
                    const holdings = token.amount / 10 ** token.decimals
                    const value = holdings * token.usdPrice
                    return (
                        <li key={index} className='flex justify-between p-3 my-1'>
                        <span>{index + 1}</span>
                        <span>{token.mint.slice(0, 6)}...</span>
                        <span>${token.usdPrice.toFixed(4)}</span>
                        <span>{holdings.toFixed(2)}</span>
                        <span>${value.toFixed(2)}</span>
                        <span className={token.priceChange24h > 0 ? "text-green-500" : "text-red-500"}>
                            {token.priceChange24h.toFixed(2)}%
                        </span>
                    </li>
                    )
                }
                    
                )}
            </ul>
        </div>
    </div>
  )
}

export default TokenCard


