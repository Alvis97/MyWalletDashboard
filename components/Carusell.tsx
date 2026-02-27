"use client";

import { Bitcoin, Ticket, Wallet } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import caruselStyle from "../style/carusel.module.scss";

function Carusell() {
const [currentCard, setCurrentCard] = useState<"Amount" | "Tokens" | "NFT">("Amount");
const scrollRef = useRef<HTMLDivElement>(null);

const cardOrder: ("Amount" | "Tokens" | "NFT")[] = ["Amount", "Tokens", "NFT"];

useEffect(() => {
const container = scrollRef.current;
if (container) {
    const index = cardOrder.indexOf(currentCard);
    const cardWidth = container.scrollWidth / cardOrder.length;
    container.scrollTo({ left: index * cardWidth, behavior: "smooth"});
}
}, [currentCard]);

  return (
    <div
    className="flex flex-col w-full h-full"
    >
        <div 
        ref={scrollRef}
        className='flex
        flex-1
        overflow-x-auto
        scroll-smooth
        snap-x snap-mandatory
        p-10
        gap-16'
        >

            <div
            className='
            card-base
            min-w-full h-full p-4 text-center
            '>
              <h3>Amount</h3>
              <p>1.5 SOL</p>
            </div>

            <div
             className='
            card-base
            min-w-full h-full  p-4 text-center
            '>
              <h3>Tokens</h3>
              <p>3</p>
            </div>

            <div
         className='
            card-base
            min-w-full h-full p-4 text-center
            '>
              <h3>Tokens</h3>
              <p>3</p>
            </div>

     
        </div>
        
        <div
        className='card-base w-[200px] mx-auto mb-6 flex justify-between items-center p-4 rounded-full'>
            <button onClick={() => setCurrentCard("Amount")}><Wallet/></button>
            <button onClick={() => setCurrentCard("Tokens")}><Ticket/></button>
            <button onClick={() => setCurrentCard("NFT")}><Bitcoin/></button>
        </div>

    </div>
  )
}

export default Carusell