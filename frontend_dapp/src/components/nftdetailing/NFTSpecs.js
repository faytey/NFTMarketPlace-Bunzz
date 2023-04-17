import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import NFTImage from "@/components/nftdetailing/NFTImage";

const NFTSpecs = memo((
    {
        tokenURI
    }
) => {


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
        console.log(tokenMetadata)
        console.log(nftImgUrl)
      },
      [tokenMetadata]
    )


    return (
        <div className="relative w-full h-[1125px] flex flex-col items-start justify-start text-left text-base font-sans">


        <div className="self-stretch flex flex-row items-center justify-start space-x-20 text-32xl pl-14">
        
            <NFTImage imageURI= {nftImgUrl} />
            <div className="flex-1 flex flex-col py-[100px] px-0 items-start justify-start gap-[40px]">
            <div className="w-[460px] flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
                <div className="self-stretch flex flex-row gap-[12px] items-center justify-start">
                <img
                    className="relative w-7 h-7 shrink-0 rounded-lg"
                    alt=""
                    src="assets/CherryGirl.png"
                />
                <div className="flex-1 relative leading-[110%] capitalize font-normal">
                CherryGirl
                </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start text-3xl">
                <div className="self-stretch relative leading-[160%] capitalize font-bold">
                    <p>CherryGirl</p>
                    <span className="self-stretch leading-[160%] font-bold text-xl text-slate-400">#444444</span>
                </div>
                </div>
            </div>
            </div>
            <div className="w-[330px] flex flex-col items-start justify-start gap-[30px] text-base text-background">
            <div className="self-stretch bg-[#1C1C1C] rounded-xl py-5 px-5 max-h-full max-w-full flex flex-col items-start justify-start gap-[15px]">
                <div className="self-stretch bg-text box-border h-[46px] shrink-0 flex flex-row py-4 px-5 items-center justify-start gap-[12px] border-b-2 border-solid border-gray-300">
                <img
                    className="relative w-7 h-7 shrink-0 rounded-full"
                    alt=""
                    src="assets/CherryGirl.png"
                />
                <div className="flex-1 flex-col relative leading-[140%]">
                    <span className="leading-3 font-light text-slate-400">Current owner</span>
                    <p className="self-stretch leading-[160%] font-bold text-xl">0x4bb62...48aa</p>
                </div>
                </div>
                <div className="self-stretch bg-text box-border h-[65px] shrink-0 flex  py-4 px-5 items-center justify-start gap-[12px] border-b-2 border-solid">
                <div className=" flex flex-1 relative leading-[140%] flex-col items-start gap-3">
                <span className='leading-3 font-light text-slate-400 tracking-wide'>Price:</span>
                <span className=' leading-4 font-semibold text-2xl tracking-wide'> 0.006 eth</span>
                </div>
    
                </div>
                <div className="self-stretch rounded-xl bg-text box-border max-h-full shrink-0 flex flex-col py-4 px-5 items-start justify-start gap-[12px] border-[2px] border-solid">
                    
                    {
                        tokenMetadata?.attributes.map((item) => {
                            return (
                                <div className="flex w-full justify-between gap-16 m-0 p-3 place-items-center">
                                <div className="flex-1 relative leading-[140%]">
                                    Description:
                                  <div className="text-2xl font-bold text-right">{item.trait_type ?? <p>Loading...</p>}:</div>
                                </div>
                                <div className="flex-1 relative leading-[140%]">
                                Value:
                                  <div className="text-left font-bold">{item.value ?? <p>Loading...</p>}</div>
                                </div>
                                </div>
                              )
                        })
                    }

                </div>
            </div>
            <button className="self-stretch rounded-2xl bg-[#A259FF] max-h-full py-[10px] box-border text-center font-semibold cursor-pointer">
                Buy
            </button>
            </div>
            </div>
        
        </div>
        </div>
      )
})

export default NFTSpecs