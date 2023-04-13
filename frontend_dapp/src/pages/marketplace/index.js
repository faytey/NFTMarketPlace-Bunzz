import { Inter } from 'next/font/google'
import {Tab} from '@headlessui/react'
import { useContractReads } from 'wagmi'
import { azukiContract, baycContract, marketplaceContract } from '@/utils/contractInfo'
import { Suspense, useEffect, useState } from 'react'
import MarketPlaceHeaderTemplate from '@/components/marketplace/MarketPlaceHeaderTemplate'
import NFTCollectionTemplate1 from '@/components/marketplace/NFTCollectionTemplate1'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'


const inter = Inter({ subsets: ['latin'] })




export default function MarketPlace() {

  const [marketplaceInfo, setMarketPlaceInfo] = useState();

  const nftCollectionsAddress = [azukiContract.address, baycContract.address, "0x96626598cE58c4174295025857106cb8e7Ac81C4"];
  const nftTokenDetails = [{address: azukiContract.address, tokenID: 5}, {address: baycContract.address, tokenID: 8}, {address: "0x96626598cE58c4174295025857106cb8e7Ac81C4", tokenID: 1}];




  const { data: marketplaceData, isError: marketplaceDataError, isLoading: marketplaceDataIsLoading } = useContractReads({
    contracts: [
      {
        ...azukiContract,
        functionName: 'name',
      },
      {
        ...marketplaceContract,
        functionName: "fetchMarketItems",
      },
      {
        ...marketplaceContract,
        functionName: 'fetchMyNfts',
      },
      {
        ...marketplaceContract,
        functionName: "listingPrice",
      },
  ]})



  useEffect(() => {
    setMarketPlaceInfo(marketplaceData?.[0])
    console.log(marketplaceInfo)
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
                <Tab>NFTs</Tab>
                <Tab>Collections</Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className='md:grid md:grid-cols-3 gap-10 space-y-5'>
                  { nftTokenDetails.map((item) => {
                    return (
                       <Suspense fallback={<p>Loading...</p>}>
                          <NFTDetailsTemplate1 contractAddress={item.address} tokenID={item.tokenID} />
                       </Suspense>
                        )
                      })}
                </div>

              </Tab.Panel>
              <Tab.Panel>
                <div className='md:grid md:grid-cols-3 gap-10 space-y-5'>
                  { nftCollectionsAddress.map((item) => {
                    return (
                      <NFTCollectionTemplate1 contractAddress={item} />
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