"use client";

import { Image, Coins, Ticket, Wallet } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import WalletInfoCard from './WalletInfoCard';
import TokenCard from './TokenCard';
import NFTcard from './NFTcard';
import { useWallet } from '@solana/wallet-adapter-react';

function Carusell() {
const [currentCard, setCurrentCard] = useState<"Amount" | "Tokens" | "NFT">("Amount");
const scrollRef = useRef<HTMLDivElement>(null);
const { publicKey } = useWallet();

const cardOrder: ("Amount" | "Tokens" | "NFT")[] = ["Amount", "Tokens", "NFT"];

useEffect(() => {
const container = scrollRef.current;
if (container) {
    const index = cardOrder.indexOf(currentCard);
    const cardWidth = container.scrollWidth / cardOrder.length;
    container.scrollTo({ left: index * cardWidth, behavior: "smooth"});
}
}, [currentCard]);

if (!publicKey) {
  return(
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      <p className='text-gray-400'>Connect your wallet to get started</p>
    </div>
  )
}

  return (
    <div
    className="flex flex-col w-full h-full"
    >
        <div 
        ref={scrollRef}
        className='flex
        flex-1
        overflow-x-auto
        overflow-y-hidden
        scroll-smooth
        snap-x snap-mandatory
        p-4
        pt-5
        pb-7
        gap-9
        md:p-10
        md:pt-5
        md:gap-16'
        >

            <div
            className='
            card-base
            min-w-full h-full p-0 text-center
            md:p-4
            '>
              <WalletInfoCard/>
            </div>

            <div
             className='
            card-base
            min-w-full h-full  p-0 text-center
            md:p-4
            '>
              <TokenCard/>
            </div>

            <div
         className='
            card-base
            min-w-full h-full p-0 text-center
            md:p-4
            '>
              <NFTcard/>
            </div>

        </div>
        
        <div
        className='card-base w-[170px] mx-auto mb-2 flex justify-between items-center p-3 rounded-full
        md:mb-6 md:p-4 md:w-[200px]'>
            <button 
            onClick={() => setCurrentCard("Amount")}
            className={`transition-all duration-200' ${ currentCard === "Amount" ? "scale-125 opacity-100" : "opacity-40" }`}
            >
              <Wallet/>
            </button>
            <button 
            onClick={() => setCurrentCard("Tokens")}
            className={`transition-all duration-200' ${ currentCard === "Tokens" ? "scale-125 opacity-100" : "opacity-40" }`}
            >
              <Coins/>
            </button>
            <button 
            onClick={() => setCurrentCard("NFT")}
            className={`transition-all duration-200' ${ currentCard === "NFT" ? "scale-125 opacity-100" : "opacity-40" }`}
            >
              <Image/>
            </button>
        </div>

    </div>
  )
}

export default Carusell