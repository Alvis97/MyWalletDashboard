export async function fetchSolPrice() {
  try {
        const response = await fetch(
            "https://api.binance.us/api/v3/ticker/price?symbol=SOLUSDT"
        )

        if (!response.ok) {
            throw new Error("Failed to fetch SOL price")
        }

        const data= await response.json();
        return parseFloat(data.price)
    } catch (error) {
        console.error("price fetch error:", error)
        return null
    }
}

//Jupiter fetch token price
export const fetchTokenPrice = async (mintAddress) => {
  const response = await fetch(`/api/price?mint=${mintAddress}`);
  const data = await response.json();
  return data[mintAddress];
};