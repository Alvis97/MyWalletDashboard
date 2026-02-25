"use client";

import React from 'react'
import WalletAdapter from './WalletAdapter'

function Navbar() {
  return (
    <nav style={{
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: "0.5rem", 
    height: "60px",
    backgroundColor: "#f5f5f5" 
    }}>
     <h1>My Wallet Dashboard</h1>   
     <WalletAdapter/>   
    </nav>
  )
}

export default Navbar