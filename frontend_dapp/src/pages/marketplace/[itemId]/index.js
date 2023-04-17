import { memo, useEffect, useState } from "react";
import axios from "axios";
// import NFTImageTemplate from "./NFTImageTemplate";
import { ethers } from "ethers";
import { erc721ABI, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { marketplaceContract } from "@/utils/contractInfo";
import { useRouter } from "next/router";
import Link from "next/link";


const NFTMetadataTemplate = memo(
  ({
  }) => {


    // const [nftMetadata, setNftMetadata] = useState();

    // const baseIpfs = "https://ipfs.io/ipfs/";


    // async function getMetadata(uri) {
    //     var url = `${baseIpfs}${tokenURI?.slice(7)}`
    //     var res = await axios.get(url).then((res) => {return(res.data)})
    //     setNftMetadata(res)
    // }

    // useEffect(
    //     () => {
    //         getMetadata(tokenURI)
    //         console.log(nftMetadata)
    //     },
    //     [nftMetadata]
    // )


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
        // console.log(tokenMetadata)
        // console.log(nftImgUrl)
        // console.log(tokenURI)
        console.log(buyResult)
      },
      [tokenMetadata, tokenURI]
    )



    return (
      <div className="relative bg-background w-full h-[1125px] flex flex-col items-start justify-start text-left text-base text-text font-h3-work-sans">
        <div className="self-stretch bg-background flex items-center justify-start gap-[60px] text-32xl pl-14">
          <div >
           {<img src={nftImgUrl} /> ?? <p>Loading...</p>}
          </div>
          <div className="self-stretch flex flex-col pt-5 px-[30px] pb-[25px] items-start justify-start gap-[25px]">
              <div className="flex justify-between w-full">
                <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
                  <div className="self-stretch relative leading-[140%] capitalize font-semibold">
                    <p>Token Contract: {data?.nftContract?.slice(0,6)+"..."+data?.nftContract?.slice(-6) ?? <p>Loading...</p>}</p>
                    {/* {data?.nftContract ?? <p>Loading....</p>} */}
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
              <div className="flex gap-3">
                  <button className="font-2xl text-center w-full border rounded-lg m-0 p-2" onClick={(e) => {
                  e.preventDefault();
                  write?.()
                  }}>
                    Buy
                </button>
                <Link className="border m-0 p-3 rounded-lg cursor-pointer" href={`/marketplace/collections/${data?.nftContract}`}>View Collection</Link>
              </div>
            </div>
          <div>
            {
              tokenMetadata?.attributes.map((item) => {
                return (
                  <div className="flex w-full justify-between gap-16 m-0 p-3 place-items-center">
                    <div className="text-2xl font-bold text-right">{item.trait_type ?? <p>Loading...</p>}:</div>
                    <div className="text-left font-bold">{item.value ?? <p>Loading...</p>}</div>
                  </div>
                )
              })
            }
         </div>
        </div>
        <div className="self-stretch bg-background-secondary flex flex-col py-10 px-[195px] items-center justify-start gap-[30px] text-3xl font-caption-space-mono">
        </div>
      </div>
    );
  }
);

export default NFTMetadataTemplate;