import { Inter } from 'next/font/google'
import { erc721ABI, useContractRead, useContractReads } from 'wagmi'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'
import NFTHeader from '@/components/marketplace/NFTHeader'
import NFTMetadataTemplate from '@/components/marketplace/NFTMetadataTemplate'
import ImageInfoTemplate from '@/components/marketplace/ImageInfoTemplate'


const inter = Inter({ subsets: ['latin'] })


// const baseIpfs = "https://ipfs.io/ipfs/";



const Nft = () => {

  const router = useRouter();

  const { collections, tokenId } = router.query;

  const [nftDetails, setNftDetails] = useState([]);

  useEffect(() => {
        setTimeout(() => {
            setNftDetails({
              address: collections,
              abi: erc721ABI,
            })
        }, (8000))
  },
  [nftDetails])

  const { data: collectionDetails, isError: collectionDataError, isLoading: collectionDataIsLoading } = useContractReads({
    contracts: [
        {
            ...nftDetails,
            functionName: 'name',
        },
        {
            ...nftDetails,
            functionName: 'tokenURI',
            args: [tokenId],
        },

    ]
    })



  // return (
  //   <div>
  //       {/* {<NFTHeader collectionName={collectionDetails?.[0]} collectionAddress={collections} tokenId={tokenId}/> ?? <p>Loading...</p>} */}
  //       <div className='md:grid md:grid-cols-2 gap-10 space-y-5 m-0 p-8'>
  //           {/* {<ImageInfoTemplate tokenURI={collectionDetails?.[1]} /> ?? <p>Loading...</p>} */}
  //           {<NFTMetadataTemplate tokenURI={collectionDetails?.[1]}/> ?? <p>Loading...</p>}
  //       </div>
  //   </div>
  // )


  return (
    <div className="relative bg-background w-full h-[1125px] flex flex-col items-start justify-start text-left text-base text-text font-h3-work-sans">
        {<NFTHeader collectionName={collectionDetails?.[0]} collectionAddress={collections} tokenId={tokenId}/> ?? <p>Loading...</p>}
        <div className="self-stretch bg-background flex flex-row items-center justify-start gap-[60px] text-32xl pl-14">
          {<NFTMetadataTemplate tokenURI={collectionDetails?.[1]}/> ?? <p>Loading...</p>}
        </div>
      {/* <div className="self-stretch bg-background-secondary flex flex-col py-10 px-[195px] items-center justify-start gap-[30px] text-3xl font-caption-space-mono">
      </div> */}
    </div>
  );
}



export default Nft