export const fetchNFTs = async (walletAddress, network) => {
    const response = await fetch(
        `/api/nfts?address=${walletAddress}&network=${network}`
    );

    if (!response) {
        return [];
    }

    const data = await response.json();

    if (!data || !data.items || data.items.length === 0) {
        return [];
    }

    console.log("NFT data: ", data);
    return data.items;
}