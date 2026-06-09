import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const network = searchParams.get('network');
    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;

    const baseUrl = network === 'Mainnet'
    ? 'https://api.helius.xyz'
    : 'https://api.helius.xyz';

    const clusterParam = network === 'Mainnet' ? '' : '&cluster=devnet';

    const response = await fetch (
         `http://api.helius.xyz/v0/addresses/${address}/balances?api-key=${apiKey}${clusterParam}`
    );

    const data = await response.json();
    console.log("Helius response:", data);
    return NextResponse.json(data)
}