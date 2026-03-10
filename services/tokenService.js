//Fetch token transactions history
export const fetchTransaction = async (walletAddress) => {
  const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
  
  const response = await fetch(
    `https://api.helius.xyz/v0/addresses/${walletAddress}/transactions?api-key=${apiKey}`
  );
  
  const data = await response.json();
  console.log(data);
  return data;
};


// fetch tokens that i own
export const fetchTokens = async (walletAddress) => {
  const response = await fetch(
    `/api/tokens?address=${walletAddress}`
  );
  
   const data = await response.json();
   console.log("Owned tokens:", data)

  return data.tokens;
};

//Jupiter fetch token price
export const fetchTokenPrice = async (mintAddress) => {
  const response = await fetch(`/api/price?mint=${mintAddress}`);
  const data = await response.json();
  console.log("Jupiter response 2:", data) 
  return data[mintAddress];
};

