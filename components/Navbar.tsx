"use client";

import React from 'react'
import WalletAdapter from './WalletAdapter'

function Navbar() {
  return (
    <nav
    className='flex justify-between items-center p-2'>
     <h1>My Wallet Dashboard</h1>   
     <WalletAdapter/>   
    </nav>
  )
}

export default Navbar