import { memo, useEffect, useState } from "react";
import axios from "axios";
// import NFTImageTemplate from "./NFTImageTemplate";
import { ethers } from "ethers";
import { erc721ABI, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { marketplaceContract } from "@/utils/contractInfo";
import { useRouter } from "next/router";


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
        var res = await axios.get(metadataurl).then((res) => {return(res.data)})
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






    // return (
    //   <div className="flex" >
    //     <div >
    //       {<img src={nftImgUrl} /> ?? <p>Loading...</p>}
    //     </div>
    //     <div>
    //       <div>
    //         {tokenMetadata?.name ?? <p>Loading...</p>}
    //       </div>
    //       <div>
    //         {
    //           tokenMetadata?.attributes.map((item) => {
    //             return (
    //               <div>
    //                 <div>{item.trait_type ?? <p>Loading...</p>}</div>
    //                 <div>{item.value ?? <p>Loading...</p>}</div>
    //                 <p>1</p>
    //               </div>
    //             )
    //           })
    //         }
    //       </div>
    //     </div>
    //   </div>
    // );


    return (
      <div className="relative bg-background w-full h-[1125px] flex flex-col items-start justify-start text-left text-base text-text font-h3-work-sans">
        <div className="self-stretch bg-background flex items-center justify-start gap-[60px] text-32xl pl-14">
          <div >
           {<img src={nftImgUrl} /> ?? <p>Loading...</p>}
          </div>
          <div>
            <p>Token Contract: {data?.nftContract ?? <p>Loading....</p>}</p>
            <p>Token ID: {data?.tokenId.toString() ?? <p>Loading....</p>}</p>
            <p>Item ID: {data?.itemId.toString() ?? <p>Loading....</p>}</p>
            <p>Seller: {data?.seller ?? <p>Loading....</p>}</p>
            <p>Owner: {data?.owner ?? <p>Loading....</p>}</p>
            {/* <p>Price: {data?.price.toString() ?? <p>Loading....</p>}</p> */}
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
            <p>Price: {data?.price.toString()/ ethers.utils.parseEther("1")} ETH</p>
            <button className="font-2xl text-center w-full border rounded-lg m-0 p-2" onClick={(e) => {
              e.preventDefault();
              write?.()
              }}>
                Buy
            </button>
         </div>
        </div>
        <div className="self-stretch bg-background-secondary flex flex-col py-10 px-[195px] items-center justify-start gap-[30px] text-3xl font-caption-space-mono">
        </div>
      </div>
    );
  }
);

export default NFTMetadataTemplate;
    
    
    // const { config } = usePrepareContractWrite({
    //   ...marketplaceContract,
    //   functionName: "buyAsset",
    //   args: [marketItem.itemId],
    //   overrides: {
    //     value: ethers.utils.parseEther()
    //   }
    // })


    // const { data, write } = useContractWrite(config)