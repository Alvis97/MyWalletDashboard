"use client"

import { Bitcoin } from 'lucide-react'
import React from 'react'
import NftGallery from './NftGallery'

function NFTcard() {

  return (
    <div>
        <div>
            <Bitcoin/>
        </div>
        <div>
            <h2>NFTs</h2>
        </div>
        <div>
            <NftGallery/>
        </div>

    </div>
  )
}

export default NFTcard