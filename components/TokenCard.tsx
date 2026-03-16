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
                tokens.slice(0, 50).map((async (token: {mint: string, amount: number, decimals: number}) => {
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

            const filtered = tokensWithPrice.filter(token => {
                const holdings = token.amount / 10 ** token.decimals
                const value = holdings * token.usdPrice
                return value > 0.01
            })

            setTokens(filtered)
        }
    )
    }, []);

    const totalValue = tokens.reduce((sum, token) => {
        const holdings = token.amount / 10 ** token.decimals //getting the amount of tokens, stored as 1000000 in the blockchain
        return sum + (holdings * token.usdPrice)
    }, 0);

    const totalChange = tokens.reduce((sum, token) => {
        const holdings = token.amount / 10 ** token.decimals
        const value = holdings * token.usdPrice
        const weight = totalValue > 0 ? value / totalValue : 0
        return sum + (token.priceChange24h * weight)
    }, 0)

  return (
    <div className='flex flex-col justify-between h-full min-h-0 p-4 md:p-5'>
        <div className='flex justify-end'>
            <Ticket size={30}/>
        </div>

        <div className='flex flex-col flex-1 justify-end p-3 pb-6 pt-7 w-full pb-4 px-2 md:pb-5 md:pt-10 md:px-0'>
            <h2 className='text-left font-extralight text-xs md:text-s'>Token Balance:</h2>
            <div className='flex justify-between items-baseline w-full'>
                <span className='font-light text-2xl md:text-4xl'>$ {totalValue.toFixed(2)}</span>
                <div className='flex justify-between items-baseline card-inside px-2 py-0 w-[90px] md:px-3 md:py-1 md:w-[120px]'>
                    <p className={`text-s md:text-xl ${totalChange >= 0 ? 'text-emerald-700 dark:text-green-500' : 'text-amber-700 dark:text-red-500'}`}>
                        {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)} 
                    </p>
                    <p className='text-[10px] text-black dark:text-white'> 24h</p>
                </div>
            </div>
        </div>
      
        <div className='card-inset px-3 pb-5 pt-3 flex flex-col h-[70%] min-h-0 p-3 md:px-5 pb-5 pt-3'>
            <div className='flex justify-between w-full px-3 font-extralight text-[10px] pb-2 md:text-xs'>
                <span>#</span>
                <span className='font-light'>Token</span>
                <span>Price</span>
                <span>Holdings</span>
                <span className='font-light'>Value</span>
                <span>24h</span>
            </div>
            <ul className='flex-1 min-h-0 overflow-y-auto'>
                {tokens.map((token, index) => {
                    const holdings = token.amount / 10 ** token.decimals
                    const value = holdings * token.usdPrice
                    return (
                        <li key={index} className='card-inside flex justify-between p-3 my-1 text-[10px] md:text-xs'>
                        <span className='font-extralight' >{index + 1}</span>
                        <span>{token.mint.slice(0, 6)}...</span>
                        <span className='font-extralight'>${token.usdPrice.toFixed(4)}</span>
                        <span className='font-extralight'>{holdings.toFixed(2)}</span>
                        <span>${value.toFixed(2)}</span>
                        <span className={token.priceChange24h > 0 ? "text-emerald-700 dark:text-green-500" : "text-amber-700 dark:text-red-500"}>
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


