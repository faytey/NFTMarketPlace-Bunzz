import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import IPFS from "ipfs-core";

const NFTDetail = () => {
  const { account, library } = useWeb3React();
  const [ipfs, setIpfs] = useState(null);
  const [imageCid, setImageCid] = useState("");
  const [metadataCid, setMetadataCid] = useState("");

  useEffect(() => {
    const initIpfs = async () => {
      const ipfs = await IPFS.create();
      setIpfs(ipfs);
    };
    initIpfs();
  }, []);

  useEffect(() => {
    const fetchNFTCids = async () => {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
      const nftId = 1; // replace with the ID of the NFT you want to fetch the CID for
      const nftData = await contract.getNFTData(nftId); // replace with the name of the function that retrieves the NFT data from the contract
      setImageCid(nftData.imageCid);
      setMetadataCid(nftData.metadataCid);
    };
    if (library && account) {
      fetchNFTCids();
    }
  }, [library, account]);

  useEffect(() => {
    if (ipfs && imageCid && metadataCid) {
      const fetchImage = async () => {
        const file = await ipfs.cat(imageCid);
        // handle image file
      };
      const fetchMetadata = async () => {
        const file = await ipfs.cat(metadataCid);
        // handle metadata file
      };
      fetchImage();
      fetchMetadata();
    }
  }, [ipfs, imageCid, metadataCid]);

  return (
    // render NFT image and metadata
  );
};

export default NFTDetail;
