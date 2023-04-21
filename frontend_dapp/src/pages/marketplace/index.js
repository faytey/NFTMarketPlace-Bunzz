import { Inter } from 'next/font/google'
import { useContractReads } from 'wagmi'
import { marketplaceContract } from '@/utils/contractInfo'
import {  useEffect, useState } from 'react'
import MarketPlaceHeaderTemplate from '@/components/marketplace/MarketPlaceHeaderTemplate'
import MarketItemTemplate from '@/components/marketplace/MarketItemTemplate'


const inter = Inter({ subsets: ['latin'] })




export default function MarketPlace() {

  const [itemListed, setItemListed] = useState();
  const [marketItems, setMarketItems] = useState();




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
  ]})



  useEffect(() => {
    setMarketItems(marketplaceData?.[1])
    setItemListed(marketplaceData?.[0])
    console.log(itemListed)
  },
  [marketplaceData, itemListed, marketItems]
  )




  return (
    <div className='w-full m-0 p-24 gap-8'>
      <MarketPlaceHeaderTemplate />
      <div className="w-full">
        <div className='md:grid md:grid-cols-3 gap-10 space-y-5 m-0'>
          { marketItems?.map((item) => {
            return (
              <div>
                {<MarketItemTemplate marketItem={item}/>}
              </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}