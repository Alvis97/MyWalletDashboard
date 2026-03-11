"use client"

import React, { useEffect, useState } from 'react'
import { fetchNFTs } from '../services/nftService'

function NftGallery() {
    const [modalVisable, setModalVisable] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [selectedNft, setSelectedNft] = useState<any>(null);
    const testWallet = process.env.NEXT_PUBLIC_TEST_WALLET;

    useEffect(() => {
         fetchNFTs(testWallet)
          .then((data) => {
            console.log("NFTs:", data)
            setNfts(data);
          })
    }, []);

  return (
    <div>

        {/* modal popup */}
        { modalVisable && (
              <div onClick={() => setModalVisable(false)}>
            <div>
                <button onClick={() => setModalVisable(false)}>X</button>
                //Print based on what key that gets printed..
                <div>
                    <img src={selectedNft?.content?.files[0]?.uri} alt="Nft picture" />
                    <h2>{selectedNft?.content?.metadata?.name}</h2>
                    <p>{selectedNft?.id}</p>
                    <p>{selectedNft?.content?.metadata?.description}</p>
                </div>
     
            </div>
        </div>
        )}
        
        {/* nft card */}
        <ul>
            {nfts.map((nft: any) => (
            <li key={nft.id}>
                <div onClick={() => { setModalVisable(true); setSelectedNft(nfts); }}>
                    <img src={nft.content?.files[0]?.uri} alt="NFT image" />
                    <span>{nft.content?.metadata?.name}</span>
                </div>
            </li>
            ))}
         
        </ul>
      

    </div>
  )
}

export default NftGallery