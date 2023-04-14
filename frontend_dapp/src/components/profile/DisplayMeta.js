import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import Web3 from 'web3';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_ALCHEMY_ID1));

const NFTDetail = () => {
  const router = useRouter();
  const [nft, setNft] = useState(null);
  const { nftId } = router.query;

  useEffect(() => {
    const fetchNFT = async () => {
      try {
        // Fetch the NFT metadata from IPFS
        const metadata = await client.get(nftId);
        const metadataJson = JSON.parse(metadata[0].content.toString());

        // Read the smart contract linked to the NFT from IPFS
        const contractAddress = metadataJson.contractAddress;
        const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);

        // Fetch additional information from the smart contract
        const owner = await contract.methods.ownerOf(nftId).call();
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();

        // Update the state with the NFT and additional information
        setNft({ ...metadataJson, owner, name, symbol });
      } catch (error) {
        console.log(error);
      }
    };

    fetchNFT();
  }, [nftId]);

  if (!nft) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{nft.name}</h1>
      <img src={`https://ipfs.infura.io/ipfs/${nft.image}`} alt={nft.name} />
      <p>{nft.description}</p>
      <p>Owner: {nft.owner}</p>
      <p>Contract name: {nft.name}</p>
      <p>Contract symbol: {nft.symbol}</p>
    </div>
  );
};

export default NFTDetail;
