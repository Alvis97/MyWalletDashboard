"use client";

import React, { ReactNode, use } from 'react'
import WalletAdapter from './WalletAdapter'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import NetworkSelector from './networkSelector';
import { NetworkProvider } from './networkContext';
import Providers from './Providers';
import WalletButton from './walletButton';

type Props = {
  children: ReactNode
}

function AppWrapper({ children }: Props) {
  return (
       <div className='flex flex-col h-full'>
        <NetworkProvider>
          <Providers>
            <nav className="flex items-center justify-end px-3 h-16 shrink-0">
              <NetworkSelector />
              <WalletButton/>
            </nav>
            <main className='flex-1'>
          {children}
            </main>
        </Providers>
      </NetworkProvider>
    </div>
  )
}

export default AppWrapper
