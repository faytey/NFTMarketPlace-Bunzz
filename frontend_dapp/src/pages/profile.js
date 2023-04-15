import { useCallback } from "react";
import ArtistInfo from "../components/profile/ArtistInfo";
import NFTContainer from "../components/profile/NFTContainer";
import { useRouter } from "next/router";
import axios from 'axios';

import {Tab} from '@headlessui/react'
import { erc721ABI, useContractReads } from 'wagmi'
import { azukiContract, baycContract, marketplaceContract } from '@/utils/contractInfo'
import { Suspense, useEffect, useState } from 'react'
import MarketPlaceHeaderTemplate from '@/components/marketplace/MarketPlaceHeaderTemplate'
import NFTCollectionTemplate1 from '@/components/marketplace/NFTCollectionTemplate1'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'
import NFTSpecs from "@/components/nftdetailing/NFTSpecs";




const ArtistPage = () => {


  const router = useRouter();


  const [artistInfo, setArtistInfo] = useState();


  const nftCollectionsAddress = ["0x85E302Eb913125C9c053257B0A2b878B89388013", "0xdcFe1dBeFE3d795176785a0c7cf0518AD7908429", "0x9c2f220a005a22C38AFc073eBa3390fbF579A0A5"];
  const nftTokenDetails = [{address: '0x85E302Eb913125C9c053257B0A2b878B89388013', tokenID: 5}, {address: '0xdcFe1dBeFE3d795176785a0c7cf0518AD7908429', tokenID: 8}, {address: "0x9c2f220a005a22C38AFc073eBa3390fbF579A0A5", tokenID: 1}];


  const onNFTCardContainerClick = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/DistantGalaxy.png", imageTitles:"Distant Galaxy" }
    });
  }, [router]);


  const { data: nameAndURI, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: "0x85E302Eb913125C9c053257B0A2b878B89388013",
        abi: erc721ABI,
        functionName: "name"
      },
      {
        address: "0x85E302Eb913125C9c053257B0A2b878B89388013",
        abi: erc721ABI,
        functionName: "tokenURI",
        args: [2]
      },
    ]
  })


  useEffect(() => {
    setArtistInfo(nameAndURI)
  }, [nameAndURI])

  console.log(artistInfo)

  const tokenURI = artistInfo?.[1]

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
    <div className="relative bg-background w-full flex flex-col items-start justify-start text-center text-3xl text-caption-label-text font-caption-work-sans">

      <div className="self-stretch flex flex-col items-center justify-start">
        <img
          className="self-stretch relative max-w-full overflow-hidden h-80 shrink-0 object-cover"
          alt=""
          src="assets/ImagePlaceHolder.png"
        />
        <div className="w-[1050px] flex flex-row items-start justify-start mt-[-70px]">
          <div className="rounded-xl flex flex-row items-start justify-start border-[2px] border-solid border-[#1C1C1C]">
            <div className="relative w-[120px] h-[120px] shrink-0">
              <img
                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                alt=""
                src="assets/Avatar.png"
              />
            </div>
          </div>
        </div>
      </div>

      <ArtistInfo />

      <Tab.Group>
        <Tab.List>
        <div className="self-stretch bg-background flex flex-col items-center justify-start gap-[10px]">
        <div className="self-stretch relative box-border h-px shrink-0 border-t-[1px] border-solid border-background-secondary" />
        <div className="w-[1050px] flex flex-row items-start justify-start">
          <div className="flex-1 flex flex-row items-start justify-start">
            <Tab>
              <div className="flex-1 box-border h-[60px] flex flex-row py-0 px-[30px] items-center justify-center gap-[16px] text-text border-b-[2px] border-solid border-caption-label-text">
                <div className="relative leading-[140%] capitalize font-semibold">
                  Created
                </div>
                <div className="rounded-xl bg-caption-label-text flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base font-h5-space-mono">
                  <div className="relative leading-[140%]">302</div>
                </div>
              </div>
            </Tab>
            <Tab>
              <div className="flex-1 h-[60px] flex flex-row py-0 px-[30px] box-border items-center justify-center gap-[16px]">
                <div className="relative leading-[140%] capitalize font-semibold">
                  owned
                </div>
                <div className="rounded-xl bg-background-secondary flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base text-text font-h5-space-mono">
                  <div className="relative leading-[140%]">67</div>
                </div>
              </div>
            </Tab>
            <Tab>
              <div className="flex-1 h-[60px] flex flex-row py-0 px-[30px] box-border items-center justify-center gap-[16px]">
                <div className="relative leading-[140%] capitalize font-semibold">
                  Collection
                </div>
                <div className="rounded-xl bg-background-secondary flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base text-text font-h5-space-mono">
                  <div className="relative leading-[140%]">4</div>
                </div>
              </div>
            </Tab>
          </div>
        </div>
        </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-3 gap-5">
              <div className="self-stretch bg-background-secondary flex flex-col py-20 px-0 items-center justify-start gap-[30px]">
                {<NFTContainer
                    NFTURI={nftImgUrl ?? "assets/CherryGirl.png"}
                    NFTName={tokenMetadata?.name ?? <p>Loading...</p>}
                    onNFTCardContainerClick={onNFTCardContainerClick}
                  /> ?? <p>Loading...</p>}
                <p>1</p>
              </div>
              {<NFTSpecs tokenURI={artistInfo?.[1]} />}

            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="self-stretch bg-background-secondary flex flex-col py-20 px-0 items-center justify-start gap-[30px]">
              <NFTContainer
                NFTURI={nftImgUrl ?? "assets/CherryGirl.png"}
                NFTName={tokenMetadata?.name ?? <p>Loading...</p>}
                onNFTCardContainerClick={onNFTCardContainerClick}
              />
              <p>2</p>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="self-stretch bg-background-secondary flex flex-col py-20 px-0 items-center justify-start gap-[30px]">
              <NFTContainer
                NFTURI={nftImgUrl ?? "assets/CherryGirl.png"}
                NFTName={tokenMetadata?.name ?? <p>Loading...</p>}
                onNFTCardContainerClick={onNFTCardContainerClick}
              />
              <p>3</p>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

    </div>
  );
};

export default ArtistPage;




