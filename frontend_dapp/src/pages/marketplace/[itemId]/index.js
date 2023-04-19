import { memo, useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { erc721ABI, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { marketplaceContract } from "@/utils/contractInfo";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiCopy } from "react-icons/bi";


const NFTMetadataTemplate = memo(
  ({
  }) => {


    const router = useRouter();

    const { itemId } = router.query

    const { data, isError, isLoading } = useContractRead({
      ...marketplaceContract,
      functionName: "marketItems",
      args: [itemId]
    })

    const {data: tokenURI, isError: tokenURIisError, isLoading: tokenURIisLoading } = useContractRead({
      address: data?.nftContract,
      abi: erc721ABI,
      functionName: "tokenURI",
      args: [data?.tokenId]
    })


    const { config } = usePrepareContractWrite({
      ...marketplaceContract,
      functionName: "buyAsset",
      args: [itemId],
      overrides: {
        value: data?.price
      }
    })

    const { data: buyData, write } = useContractWrite(config)

    const { data: buyResult } = useWaitForTransaction({
      hash: buyData?.hash
    })



    const [tokenMetadata, setTokenMetadata] = useState();
    const [nftImgUrl, setNftImgUrl] = useState();

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
      <div className="relative bg-background w-full h-full m-0 p-8 items-start justify-start text-left text-base text-text font-h3-work-sans">
        <div className="self-stretch bg-background w-full items-center grid md:grid-cols-2 justify-start gap-3 text-32xl">
          <div >
           {<img src={nftImgUrl} /> ?? <p>Loading...</p>}
          </div>
          <div className="self-stretch flex flex-col p-8 items-start justify-start gap-3">
              <div className="flex justify-between w-full">
                <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
                  <div className="self-stretch relative leading-[140%] capitalize font-semibold flex gap-5 w-full justify-between">
                    <p>Token Contract: </p>
                    <p>{data?.nftContract?.slice(0,6)+"..."+data?.nftContract?.slice(-6) ?? <p>Loading...</p>}</p>
                    <BiCopy size={20} className="hover:cursor-pointer" onClick={() => {navigator.clipboard.writeText(data?.nftContract)}}/>
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
                    <div className="flex-1 relative leading-[140%]">Token ID: {data?.tokenId.toString() ?? <p>Loading....</p>}</div>
                    <div className="flex-1 relative leading-[140%]">Item ID: {data?.itemId.toString() ?? <p>Loading....</p>}</div>
                  </div>
                </div>
              </div>



              <div className="self-stretch flex flex-col gap-3 items-start justify-start text-xs text-caption-label-text font-h5-space-mono">
                <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
                  <div className="self-stretch relative leading-[110%]">
                    Price
                  </div>
                  <div className="self-stretch relative text-base leading-[140%] text-text">
                    {data?.price.toString() / ethers.utils.parseEther("1")} ETH
                  </div>
                </div>
                <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
                  <div className="self-stretch relative leading-[110%]">
                    Seller
                  </div>
                  <div className="self-stretch relative text-base leading-[140%] text-text">
                    {data?.seller ?? <p>Loading....</p>}
                  </div>
                </div>
                <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
                  <div className="self-stretch relative leading-[110%]">
                    Owner
                  </div>
                  <div className="self-stretch relative text-base leading-[140%] text-text">
                    {data?.owner ?? <p>Loading....</p>}
                  </div>
                </div>
              </div>


              <div className="self-stretch grid grid-cols-2 gap-3 items-start justify-start text-xs text-caption-label-text font-h5-space-mono">
                {
                  tokenMetadata?.attributes.map((item) => {
                    return (
                        <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
                          <div className="self-stretch relative text-base leading-[140%] text-text">
                            {item.trait_type ?? <p>Loading...</p>}:
                          </div>
                          <div className="self-stretch relative leading-[110%] ">
                            {item.value ?? <p>Loading...</p>}
                          </div>
                        </div>
                    )
                  })
                }
              </div>


              <div className="gap-3 w-full grid grid-cols-2">
                  <button className="font-2xl text-center border rounded-lg m-0 p-3" onClick={(e) => {
                  e.preventDefault();
                  write?.()
                  }}>
                    Buy
                </button>
                <Link className="border m-0 p-3 rounded-lg cursor-pointer text-center" href={`/marketplace/collections/${data?.nftContract}`}>View Collection</Link>
              </div>
          </div>
        </div>
      </div>
    );
  }
);

export default NFTMetadataTemplate;