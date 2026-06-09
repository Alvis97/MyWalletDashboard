import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export async function GET(request: NextRequest ) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const network = searchParams.get('network');
    const apiKey = process.env.HELIUS_API_KEY;

    const rpcUrl = network === "Mainnet" 
    ? `https://mainnet.helius-rpc.com/?api-key=${apiKey}`
    : `https://devnet.helius-rpc.com/?api-key=${apiKey}`;

    const response = await fetch(rpcUrl, {
        
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
    if (data.err) {
        return NextResponse.json({ error: data.error}, { status: 500 });
    }

    console.log("NFT response:", JSON.stringify(data, null, 2));
    console.log("API key:", apiKey);

    const nfts = data.result.items.filter(
        (item: any) =>
        (item.interface === 'V1_NFT' || item.interface == 'MplCoreAsset' &&
         item.content?.files?.legth > 0 //Needs an image
        )
      
    );
  return NextResponse.json({ items: nfts});
}