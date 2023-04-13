import { Inter } from 'next/font/google'
import { erc721ABI, useContractRead, useContractReads, useProvider } from 'wagmi'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CollectionInfoTemplate from '@/components/marketplace/CollectionInfoTemplate'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'


const inter = Inter({ subsets: ['latin'] })





export default function Collection() {

  const router = useRouter();

  const { collections } = router.query;

  const tokenIDs = [4, 8, 4, 25]

  const [contractDetails, setContractDetails] = useState();
  
  
  useEffect(() => {
    setTimeout(()=> {
      setContractDetails({
        address: collections,
        abi: erc721ABI,
      })
    }, (3000))
  },
  [contractDetails])

  const { data: collectionName, isError: collectionDataError, isLoading: collectionDataIsLoading } = useContractRead({
      ...contractDetails,
      functionName: 'name',
    })




  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <CollectionInfoTemplate collectionName={collectionName} collectionAddress={collections}/>
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <div className='md:grid md:grid-cols-3 gap-10 space-y-5 m-0 p-14'>
          {
            tokenIDs.map((item) => {
              return (
                    <NFTDetailsTemplate1 contractAddress={collections} tokenID={item} />
                    )
                  })
                }
        </div>
      </Suspense>
    </div>
  )
}