"use client";

import React from 'react'
import WalletAdapter from './WalletAdapter'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function Navbar() {
  return (
    <nav
    className='flex justify-between items-center py-3 px-4 md:py-4 md:px-10'>
     <h1>My Wallet Dashboard</h1>   
     <WalletMultiButton/>   
    </nav>
  )
}

export default Navbar