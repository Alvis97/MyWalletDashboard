"use client"

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React, { useEffect, useState } from 'react'


function walletButton() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
  return (
    < WalletMultiButton className="wallet-adapter-button"/>
  )
}

export default walletButton