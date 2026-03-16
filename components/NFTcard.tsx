"use client"

import { Bitcoin } from 'lucide-react'
import React from 'react'
import NftGallery from './NftGallery'

function NFTcard() {

  return (
    <div className='flex flex-col justify-between h-full min-h-0 p-4 md:p-5'>
        <div className='w-full flex justify-end'>
            <Bitcoin size={30}/>
        </div>
        <div className='w-full flex flex-col flex-1 justify-end text-left p-4 pb-4 md:p-5'>
            <h2 className='text-2xl md:text-4xl'>NFTs</h2>
        </div>

        <div className='flex h-[70%]  min-h-0 overflow-y-auto'>
            <NftGallery/>
        </div>
    </div>
  )
}

export default NFTcard