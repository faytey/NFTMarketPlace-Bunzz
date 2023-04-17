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

  const [itemListed, setItemListed] = useState();
  const [marketItems, setMarketItems] = useState();
  // const [marketplaceInfo, setMarketPlaceInfo] = useState();


  const MarketItem = {
    itemId:"5",
    nftContract : "0x85E302Eb913125C9c053257B0A2b878B89388013",
    tokenId : "2",
    seller : "0x85E302Eb913125C9c053257B0A2b878B89388013",
    owner : "0x85E302Eb913125C9c053257B0A2b878B89388013",
    price : "3",
    sold : false,
}

const MarketItemArray = [MarketItem,MarketItem,MarketItem]

  const { data: marketplaceData, isError: marketplaceDataError, isLoading: marketplaceDataIsLoading } = useContractReads({
    contracts: [
      {
        ...marketplaceContract,
        functionName: 'fetchItemListed',
      },
      {
        ...marketplaceContract,
        functionName: "fetchMarketItems",
      },
      {
        ...marketplaceContract,
        functionName: 'fetchMyNfts',
      },
  ]})



  useEffect(() => {
    setItemListed(marketplaceData?.[0])
    setMarketItems(marketplaceData?.[1])
    // console.log(marketplaceInfo)
  },
  [marketplaceData]
  )

  const router = useRouter();


  // const onNFTCardContainerClick = useCallback(() => {
  //   router.push({
  //     pathname: "/nftdetail",
  //     query: { item: "assets/DistantGalaxy.png", id:"Distant Galaxy" }
  //   });
  // }, [router]);

  

  return (
    <div className="relative bg-[#2B2B2B] w-full flex flex-col items-start justify-start text-center text-3xl max-w-full m-auto font-sans">
    
    <div className="self-stretch flex flex-col items-center justify-start">
        <img
          className="self-stretch relative max-w-full overflow-hidden h-80 shrink-0 object-cover"
          alt=""
          src="assets/ImagePlaceHolder.png"
        />
        <div className="w-[1050px] flex flex-row items-start justify-start mt-[-70px]">
        <div className="rounded-xl flex flex-row items-start justify-start border-[2px] border-solid border-[#2B2B2B]">
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
        <div className="self-stretch bg-[#2B2B2B] flex flex-col items-center justify-start gap-[10px]">
        <div className="self-stretch relative box-border h-px shrink-0 border-t-[1px] border-solid border-background-secondary" />
        <div className="w-[1050px] flex flex-row items-start justify-start">
          <div className="flex-1 flex flex-row items-start justify-start">
          <Tab>
            <div className="flex-1 box-border h-[60px] flex flex-row py-0 px-[30px] items-center justify-center gap-[16px] text-text border-b-[2px] border-solid border-caption-label-text">
              <div className="relative leading-[140%] capitalize font-semibold">
                  Owned
                  </div>
                  <div className="rounded-xl bg-[#1C1C1C] flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base font-h5-space-mono">
                    <div className="relative leading-[140%]">302</div>
                  </div>
                </div>
              </Tab>
              <Tab>
                <div className="flex-1 h-[60px] flex flex-row py-0 px-[30px] box-border items-center justify-center gap-[16px]">
                  <div className="relative leading-[140%] capitalize font-semibold">
                    Listed Item
                    </div>
                    <div className="rounded-2xl bg-[#1C1C1C] flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base text-text font-h5-space-mono">
                      <div className="relative leading-[140%]">67</div>
                    </div>
                  </div>
                </Tab>
                <Tab>
                  <div className="flex-1 h-[60px] flex flex-row py-0 px-[30px] box-border items-center justify-center gap-[16px]">
                    <div className="relative leading-[140%] capitalize font-semibold">
                      
                    </div>
                    <div className="rounded-2xl bg-background-secondary flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base text-text font-h5-space-mono">
                    <div className="relative leading-[140%]"></div>
                  </div>
                </div>
            </Tab>
          </div>
        </div>
      </div>
        </Tab.List>
        <Tab.Panels>
          <div className="self-stretch bg-[#2B2B2B]-secondary flex flex-col py-20 px-0 items-center justify-start gap-[30px]">
          <Tab.Panel>
              { itemListed?.map((item) => {
                return (
                    <div>
                      {<NFTContainer 
                          marketItem={item}
                          //onNFTCardContainerClick={onNFTCardContainerClick}
                          />}
                    </div>
                    )
                  })}
            </Tab.Panel>

          <Tab.Panel>
          { MarketItemArray?.map((item) => {
            return (
                <div>
                  {<NFTContainer 
                      marketItem={item}
                      //onNFTCardContainerClick={onNFTCardContainerClick}
                      />}
                </div>
                )
              })}
          </Tab.Panel>

          <Tab.Panel>
            { MarketItemArray?.map((item) => {
              return (
                  <div>
                    {<NFTContainer 
                        marketItem={item}
                        //onNFTCardContainerClick={onNFTCardContainerClick}
                        />}
                  </div>
                  )
                })}
          </Tab.Panel>

        </div>
        </Tab.Panels>
      </Tab.Group>

    </div>
  );
};

export default ArtistPage;

 


