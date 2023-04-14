import { Inter } from 'next/font/google'
import {Tab} from '@headlessui/react'
import { useContractReads } from 'wagmi'
import { azukiContract, baycContract, marketplaceContract } from '@/utils/contractInfo'
import { Suspense, useEffect, useState } from 'react'
import MarketPlaceHeaderTemplate from '@/components/marketplace/MarketPlaceHeaderTemplate'
import NFTCollectionTemplate1 from '@/components/marketplace/NFTCollectionTemplate1'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'
import MarketItemTemplate from '@/components/marketplace/MarketItemTemplate'


const inter = Inter({ subsets: ['latin'] })




export default function MarketPlace() {

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




  return (
    <div className='w-full m-0 p-16'>
      <MarketPlaceHeaderTemplate />
      <div className="w-full">
          <Tab.Group>
            <Tab.List >
              <div className='flex text-2xl font-bold w-full gap-10 py-8 justify-center'>
                <Tab>Listed Items</Tab>
                <Tab>Market Place Items</Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className='md:grid md:grid-cols-3 gap-10 space-y-5'>
                  { MarketItemArray?.map((item) => {
                    return (
                        <div>
                          {<MarketItemTemplate marketItem={item}/>}
                        </div>
                        )
                      })}
                </div>

              </Tab.Panel>
              <Tab.Panel>
                <div className='md:grid md:grid-cols-3 gap-10 space-y-5'>
                  { MarketItemArray?.map((item) => {
                    return (
                      <div>
                        {<MarketItemTemplate marketItem={item}/>}
                      </div>
                      )
                    })}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
    </div>
  )
}