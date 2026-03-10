import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;

    const response = await fetch (
         `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${apiKey}`
    );

    const data = await response.json();
    return NextResponse.json(data)
}