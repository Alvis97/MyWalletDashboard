"use client"

import React, { useEffect, useState } from 'react'
import { fetchNFTs } from '../services/nftService'

function NftGallery() {
    const [modalVisible, setModalVisible] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [selectedNft, setSelectedNft] = useState<any>(null);
    const testWallet = process.env.NEXT_PUBLIC_TEST_WALLET;
    const [loading, setLoading ] = useState(true); 


    useEffect(() => {
        if (!testWallet) return;

         fetchNFTs(testWallet)
          .then((data) => setNfts(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [testWallet]);

    if (loading){
        return(
            <div className='flex flex-wrap gap-4 justify-center'>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className='flex flex-col justify-between items-start h-[270px] w-[250px] bg-white p-4 m-5 rounded-sm'>
                        <div className='animate-pulse bg-neutral-300 h-[200px] w-[220px] rounded-xs'></div>
                        <div className='animate-pulse bg-neutral-300 w-full h-[25px]'></div>
                    </div>
                ))}

            </div>
        )
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
            className='bg-[#e0e5ec] rounded-2xl p-6 pt-2 w-[350px] h-fit shadow-xl/30 md:w-[450px]'
            onClick={(e) => e.stopPropagation()}  
        >
            <button 
                className='float-right cursor-pointer text-gray-500 mb-1  hover:text-black'
                onClick={() => setModalVisible(false)}
            >✕</button>

            <img 
                src={selectedNft?.content?.files[0]?.uri} 
                alt="NFT" 
                className='w-full rounded-xl mb-4'
            />
            <h2 className='text-xl font-bold mb-1'>{selectedNft?.content?.metadata?.name}</h2>
            <p className='text-xs text-gray-400 mb-2 w-[250px] truncate m-auto'>{selectedNft?.id}</p>
            <p className='text-sm text-gray-600'>{selectedNft?.content?.metadata?.description}</p>
        </div>
    </div>
)}
        
        {/* nft card */}
        <ul className='flex flex-wrap gap-4 list-none p-0 m-0 justify-center md:justify-between'>
            {nfts.map((nft: any) => (
            <li key={nft.id}>
                <div 
                    onClick={() => { setModalVisible(true); setSelectedNft(nft); }}
                    className='flex flex-col justify-between items-start h-[270px] w-[250px] bg-white p-4 m-5 rounded-sm text-black hover:scale-105 transition-transform duration-200 cursor-pointer'
                >
                    <img 
                    src={nft.content?.files?.[0]?.uri}
                    className='h-[200px] w-[220px] rounded-xs' alt="NFT image" 
                    />
                    <span>{nft.content?.metadata?.name}</span>
                </div>
            </li>    
            ))}    
        </ul>
      

    </div>
  )
}

export default NftGallery