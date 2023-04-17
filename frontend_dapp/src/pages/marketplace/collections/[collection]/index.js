import { Inter } from 'next/font/google'
import { erc721ABI, useContractRead, useContractReads, useProvider } from 'wagmi'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CollectionInfoTemplate from '@/components/marketplace/CollectionInfoTemplate'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'
import { marketplaceContract } from '@/utils/contractInfo'


const inter = Inter({ subsets: ['latin'] })





export default function Collection() {

  const router = useRouter();

  const { collection } = router.query;

  const [contractDetails, setContractDetails] = useState();
  // const [collectionAddress, setCollectionAddress] = useState();
  
  
  // useEffect(() => {
  //   setContractDetails({
  //     address: collection,
  //     abi: erc721ABI,
  //   });
  //   // setCollectionAddress
  // },
  // [contractDetails, collection])

  const { data: collectionName, isError: collectionDataError, isLoading: collectionDataIsLoading } = useContractRead({
      address: collection,
      abi: erc721ABI,
      functionName: 'name',
    })


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



  return (
    <div>
      <div>
        {<CollectionInfoTemplate collectionName={collectionName} collectionAddress={collection}/> ?? <p>Loading...</p>}
      </div>
      <div className='md:grid md:grid-cols-3 gap-10 space-y-5 m-0 p-14'>
        {
          marketplaceData?.[1]?.map((item) => {
            if (item.nftContract == collection) {
              return (
                  <div>
                    {<NFTDetailsTemplate1 contractAddress={collection} tokenID={item.tokenId.toString()} /> ?? <p>Loading...</p>}
                  </div>
                  )
            }
              })
          }
      </div>
    </div>
  )
}