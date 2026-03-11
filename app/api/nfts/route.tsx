import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export async function GET(request: NextRequest ) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
    console.log("Helius api key nft:", apiKey);

    const response = await fetch(
        `https://mainnet.helius-rpc.com/?api-key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getAssetsByOwner',
                params: {
                    ownerAddress: address,
                    page: 1,
                    limit: 100,
                }
            })
        }
    );

    const data = await response.json();
    const nfts = data.result.items.filter(
        (item: any) =>
        (item.interface === 'V1_NFT' || item.interface == 'MplCoreAsset') &&
        item.content?.files?.legth > 0 //Needs an image
    );
  return NextResponse.json(nfts);
}