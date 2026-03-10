import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const mint = searchParams.get('mint');
    const apiKey = process.env.JUPITER_API_KEY;
    console.log("API key:", apiKey) 

    const response = await fetch(
    `https://api.jup.ag/price/v3/price?ids=${mint}`,
    {
      headers: {
        'x-api-key': apiKey!
      }
    }
  );

    const data = await response.json();
    console.log("Jupiter response:", data)
    return NextResponse.json(data)
}