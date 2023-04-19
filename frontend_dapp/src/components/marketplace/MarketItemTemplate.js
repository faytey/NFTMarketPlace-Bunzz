import { memo, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { erc721ABI, useContractRead } from "wagmi";
import { ethers } from "ethers";



const MarketItemTemplate = memo(
  ({
    marketItem,
  }) => {


    const [tokenMetadata, setTokenMetadata] = useState();
    const [nftImgUrl, setNftImgUrl] = useState();


    const { data: tokenURI, isError: tokenUriError, isLoading: tokenUriIsLoading } = useContractRead({
        address: marketItem.nftContract,
        abi: erc721ABI,
        functionName: 'tokenURI',
        args: [marketItem.tokenId]
    })

 

    const baseIpfs = "https://ipfs.io/ipfs/";

    async function getMetadata(tokenURI) {
        var metadataurl = `${baseIpfs}${tokenURI?.slice(7)}`
        var res = await axios.get(metadataurl).then((res) => {return(res.data)}).catch((err) => {console.log(err)})
        setTokenMetadata(res)
        var imgURI = tokenMetadata?.image
        var imgurl = `${baseIpfs}${imgURI?.slice(7)}`
        setNftImgUrl(imgurl)
    }

    useEffect(
      () => {
        getMetadata(tokenURI);
      },
      [tokenMetadata, tokenURI]
    )

    return (
        <div >
  
          <div
            className="flex-1 rounded-xl bg-[#1C1C1C] flex flex-col items-center justify-start cursor-pointer"
          >
            <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start">
              <img src={nftImgUrl} />
            </div>
            <div className="self-stretch flex flex-col pt-5 px-[30px] pb-[25px] items-start justify-start gap-[25px]">
              <div className="flex justify-between w-full">
                <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
                  <div className="self-stretch relative leading-[140%] capitalize font-semibold">
                    Token Contract: {marketItem?.nftContract?.slice(0,6)+"..."+marketItem?.nftContract?.slice(-6) ?? <p>Loading...</p>}
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start gap-[12px] text-base font-h5-space-mono">
                    <div className="flex flex-row items-start justify-start">
                      <div className="relative w-6 h-6 shrink-0">
                        <img
                          className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-101xl max-w-full overflow-hidden max-h-full object-cover"
                          alt=""
                          src={nftImgUrl ?? "assets/Avatar.png"}
                        />
                      </div>
                    </div>
                    <div className="flex-1 relative leading-[140%]">Token ID: {marketItem?.tokenId.toString()}</div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start text-xs text-caption-label-text font-h5-space-mono">
                <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
                  <div className="self-stretch relative leading-[110%]">
                    Price
                  </div>
                  <div className="self-stretch relative text-base leading-[140%] text-text">
                    {marketItem?.price.toString() / ethers.utils.parseEther("1")} ETH
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Link className="border m-0 p-3 rounded-lg cursor-pointer" href={`/marketplace/${marketItem?.itemId}`}>Buy Item</Link>
                <Link className="border m-0 p-3 rounded-lg cursor-pointer" href={`/marketplace/collections/${marketItem?.nftContract}`}>View Collection</Link>
              </div>
            </div>
          </div>
  
        </div>
      );
  }
);

export default MarketItemTemplate;
