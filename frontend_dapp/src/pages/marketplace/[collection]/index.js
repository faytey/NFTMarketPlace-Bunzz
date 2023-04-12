import { Inter } from 'next/font/google'
import Link from 'next/link'
import { erc721ABI, useContractRead, useContractReads } from 'wagmi'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { launchpadContract, marketplaceContract } from '@/utils/contractInfo'


const inter = Inter({ subsets: ['latin'] })




const baseIpfs = "https://ipfs.io/ipfs/";


const getTokenURI = (tokenURI) => {
  if (tokenURI == undefined) {
    return baseIpfs
  }
  var url = `${baseIpfs}${tokenURI.slice(7)}`
  return url;
}





export default function Collection() {

  const router = useRouter();

  const { collection } = router.query;

  const [collectionDetail, setCollectionDetail] = useState([]);
  const [nftDetails, setNftDetails] = useState([]);

  const contractDetails = {
    address: collection ?? "0x",
    abi: erc721ABI,
  }

  const { data: collectionData, isError: collectionDataError, isLoading: collectionDataIsLoading } = useContractRead({
      ...contractDetails,
      functionName: 'name',
    })


  const { data: nftData, isError: nftDataError, isLoading: nftDataIsLoading } = useContractReads({
    contracts: [
      {
        ...contractDetails,
        functionName: 'tokenURI',
        args: [4]
      },
      {
        ...contractDetails,
        functionName: "tokenURI",
        args: [8]
      },
      {
        ...contractDetails,
        functionName: 'tokenURI',
        args: [4]
      },
      {
        ...contractDetails,
        functionName: "tokenURI",
        args: [25]
      },
  ]})



    
  //   useEffect(
  //     () => {
        
  //       function getImgLink() {
  //         var ret = axios.get(getTokenURI(nftData?.[0])).then(res => {getTokenURI(res?.data)});
  //         // console.log(ret)
  //         // setNftDetails(ret)
  //         console.log(ret)
  //       }
  //       getImgLink()
        
  //   },
  //   [nftData]
  // )

  const handleBuy = () => {}



  return (
    <div>
      <div>
        <p>{collection}</p>
        <p>{collectionData}</p>
      </div>
      <div>
        <div>
          {
            getTokenURI(nftData?.[0])
          }
        </div>
          <button onClick={handleBuy}>Buy</button>
      </div>
    </div>
  )
}