"use client";

import { Bitcoin, Ticket, Wallet } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

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
    <div style={{
        width: "100vw",
        height:"80vh",
        backgroundColor: "pink",
        margin: "0, 5vw",
    }}>
        <div 
        ref={scrollRef}
        style={{
            display:"flex",
            overflowX: "auto",
            scrollBehavior:"smooth",
            gap: "1rem",
            padding:"1rem",
        }}>

            <div
            style={{
                minWidth: "100%",
                height: "75vh",
                padding:"1rem",
                backgroundColor: currentCard === "Amount" ? "#d1f7c4" : "#f5f5f5",
                borderRadius: "14px",
                textAlign:"center",
            }}>
              <h3>Amount</h3>
              <p>1.5 SOL</p>
            </div>

            <div
            style={{
                minWidth: "100%",
                height: "70vh",
                padding:"1rem",
                backgroundColor: currentCard === "Tokens" ? "#d1f7c4" : "#f5f5f5",
                borderRadius: "14px",
                textAlign:"center",
            }}>
              <h3>Tokens</h3>
              <p>3</p>
            </div>

            <div
            style={{
                minWidth: "100%",
                padding:"1rem",
                backgroundColor: currentCard === "NFT" ? "#d1f7c4" : "#f5f5f5",
                borderRadius: "14px",
                textAlign:"center",
            }}>
              <h3>Tokens</h3>
              <p>3</p>
            </div>

     
        </div>
        
        <div
        style={{
            backgroundColor:"pink",
            width: "200px",
            margin:"auto",
            display: "flex",
            justifyContent:"space-between",
            padding: "1rem",
            borderRadius:"100px",
        }}>
            <button onClick={() => setCurrentCard("Amount")}><Wallet/></button>
            <button onClick={() => setCurrentCard("Tokens")}><Ticket/></button>
            <button onClick={() => setCurrentCard("NFT")}><Bitcoin/></button>
        </div>

    </div>
  )
}

export default Carusell