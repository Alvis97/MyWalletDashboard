export const fetchNFTs = async (walletAddress) => {
    const response = await fetch(
        `/api/nfts?address=${walletAddress}`
    );

    const data = await response.json();
    console.log("Owned NFTs:", data);
    return data;
}