"use client"

import React, { useEffect, useState } from 'react'
import { fetchNFTs } from '../services/nftService'
import ImageWithSkeleton from './ImageWithSkeleton';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNetwork } from './networkContext';
import { resolveUrl } from '@/utils/resolveUrl';

function NftGallery() {
    const { publicKey } = useWallet();
    const { selectedNetwork } = useNetwork();
    const [modalVisible, setModalVisible] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [selectedNft, setSelectedNft] = useState<any>(null);
    const [loading, setLoading ] = useState(true); 
    const [error, setError] = useState(false)


    useEffect(() => {
        if (!publicKey) return;

        setNfts([]);
        setLoading(true);
        setError(false);

        const address = publicKey.toBase58();

         fetchNFTs(address, selectedNetwork)
          .then((data) => setNfts(data))
            .catch((err) => {
                console.error(err);
                setError(true)
            })
            .finally(() => setLoading(false));
    }, [publicKey, selectedNetwork]);

    if (error) {
        <div className='flex flex-wrap gap-4 justify-center'>
            <p>Something went wrong, <br/>
            please try again!</p>
        </div>
    }


  return (
    <div className='flex flex-wrap gap-4'>

     {modalVisible && (
    // backdrop
    <div 
        className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
        onClick={() => setModalVisible(false)}
    >
        {/* modal box */}
        <div 
            className='bg-[#e0e5ec] dark:bg-[#909090] rounded-2xl p-6 pt-2 w-[350px] h-fit shadow-xl/30 md:w-[450px]'
            onClick={(e) => e.stopPropagation()}  
        >
            <button 
                className='float-right cursor-pointer text-gray-500 mb-1  hover:text-black dark:text-olive-900'
                onClick={() => setModalVisible(false)}
            >✕</button>

            <img 
                src={resolveUrl(selectedNft?.content?.files[0]?.uri)} 
                alt="NFT" 
                className='w-full rounded-xl mb-4'
                   onError={(e) => {
                        e.currentTarget.src = '/placeholder.png'
                        e.currentTarget.onerror = null
                    }}
            />
            <h2 className='text-xl font-bold mb-1 dark:text-black'>{selectedNft?.content?.metadata?.name}</h2>
            <p className='text-xs text-gray-400 dark:text-olive-900 mb-2 w-[250px] truncate m-auto'>{selectedNft?.id}</p>
            <p className='text-sm text-gray-600 dark:text-neutral-600 '>{selectedNft?.content?.metadata?.description}</p>
        </div>
    </div>
)}
        
        {/* nft card */}
        <ul className='flex flex-wrap gap-4 list-none p-0 m-0 justify-center md:justify-between'>
            { error ? (
                <li className='text-neutral-400 text-sm'>
                    <p className='text-left pl-2'>
                    Something went wrong, <br/>
                    please try agin! 
                    </p>
                </li>
            ) : loading ? (
                <>
                {Array.from({ length: 6 }).map((_, i) => (
                 <li key={i} className='flex flex-col justify-between items-start h-[270px] w-[250px] bg-white dark:bg-[#606060] p-4 m-5 rounded-sm'>
                    <div className='animate-pulse bg-neutral-300 h-[200px] w-[220px] rounded-xs'></div>
                    <div className='animate-pulse bg-neutral-300 w-full h-[25px]'></div>
                </li>
                ))}
       
                </>
        ): nfts.length === 0 ? (
            <li className='text-neutral-400 text-sm'>
                <p className='text-left pl-2'>
                 No NFTs in this wallet
                </p>
            </li>
        ) : (
        <>
              {nfts.map((nft: any) => (
            <li key={nft.id}>
                <div 
                    onClick={() => { setModalVisible(true); setSelectedNft(nft); }}
                    className='flex flex-col justify-between items-start h-[270px] w-[250px] bg-white dark:bg-[#606060] p-4 m-5 rounded-sm text-black hover:scale-105 transition-transform duration-200 cursor-pointer'
                >
                   
                    <ImageWithSkeleton src={nft.content?.files?.[0]?.uri} />
                    <span>{nft.content?.metadata?.name}</span>
                </div>
            </li>    
            ))}  
        </>
    )}

        </ul>
      

    </div>
  )
}

export default NftGallery