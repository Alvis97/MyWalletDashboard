export const fetchNFTs = async (walletAddress) => {
    const response = await fetch(
        `/api/nfts?address=${walletAddress}`
    );

    if (!response) {
        return [];
    }

    const data = await response.json();

    if (!data || !data.items || data.items.length === 0) {
        return [];
    }

    return data.items;
}