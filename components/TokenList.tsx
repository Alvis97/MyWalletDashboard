"use client"

import { fetchTokenPrice, fetchTokens } from '@/services/tokenService';
import React, { useEffect, useState } from 'react'

type Token = {
  mint: string;
  amount: number;
  decimals: number;
  usdPrice: number;
  priceChange24h: number;
}

type Props = {
  tokens: Token[]
  loading: boolean
  error: boolean
}

function TokenList({ tokens, loading, error }: Props) {
  return (
    <ul className='flex-1 min-h-0 overflow-y-auto'>
        { error ? (
            <p className='text-neutral-400 text-sm text-left pl-2 pt-3'>Something went wrong, <br/> please try again!</p>
        ) : loading ? (
            [...Array(5)].map((_, i) => (
                <li key={i} className='card-inside flex justify-between p-3 my-1'>
                    {[...Array(6)].map((_, j) => (
                        <div key={j} className='animate-pulse bg-neutral-300 dark:bg-[#474745] rounded h-3 w-[50px]'/>
                    ))}
                </li>
            ))
        ) : tokens.length === 0 ? (
            <p className='text-neutral-400 text-sm text-left pl-2 pt-3'>No tokens in this wallet</p>
        ) : (
            tokens.map((token, index) => {
                const holdings = token.amount / 10 ** token.decimals
                const value = holdings * token.usdPrice
                return (
                    <li key={index} className='card-inside flex justify-between p-3 my-1 text-[10px] md:text-xs'>
                        <span className='font-extralight'>{index + 1}</span>
                        <span>{token.mint?.slice(0, 6)}...</span>
                        <span className='font-extralight'>${token.usdPrice.toFixed(4)}</span>
                        <span className='font-extralight'>{holdings.toFixed(2)}</span>
                        <span>${value.toFixed(2)}</span>
                        <span className={token.priceChange24h > 0 ? "text-emerald-700 dark:text-green-500" : "text-amber-700 dark:text-red-500"}>
                            {token.priceChange24h.toFixed(2)}%
                        </span>
                    </li>
                )
            })
        )}
    </ul>
  )
}

export default TokenList