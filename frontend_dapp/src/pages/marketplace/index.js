import { Inter } from 'next/font/google'
import {Tab} from '@headlessui/react'
import Link from 'next/link'
import { MockData, MockData1 } from '@/utils/mockdata'
import { erc20ABI, useContractRead, useContractReads } from 'wagmi'
import { azukiContract, baycContract, marketplaceContract } from '@/utils/contractInfo'
import { useEffect, useState } from 'react'
import axios from 'axios'


const inter = Inter({ subsets: ['latin'] })



const baseIpfs = "https://ipfs.io/ipfs/";

const getTokenURI = (tokenURI) => {
  var url = `${baseIpfs}${tokenURI.slice(7)}`
  return url;
}





export default function MarketPlace() {

  // const [nftDetails, setNftDetails] = useState([]);
  // const [nftDetails1, setNftDetails1] = useState([]);
  const [marketplaceInfo, setMarketPlaceInfo] = useState();


  // {
  //   name: 'token name',
  //   id: index,
  //    address: 'tokenAddress'
  //   author: "author address",
  //   Img: 'https://ethereum.org/static/9a6e158f4ffd1cb5de246a3ecd0d7f86/9d5bb/hackathon_transparent.webp',
  //   authorImg: 'https://ethereum.org/static/9a6e158f4ffd1cb5de246a3ecd0d7f86/9d5bb/hackathon_transparent.webp',
  //   price: "1.03 ETH",
  //   highestBid: "0.33 ETH",
  //   detailsLink: "/"
  // },


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
      {
        ...marketplaceContract,
        functionName: "listingPrice",
      },
  ]})

  // const { data: collectionData, isError: collectionDataError, isLoading: collectionDataIsLoading } = useContractReads({
  //   contracts: [
  //     {
  //       ...baycContract,
  //       functionName: 'name',
  //     },
  //     {
  //       ...azukiContract,
  //       functionName: "name"
  //     }
  // ]})


  

  
  // useEffect(

  // )



  return (
    <div className='w-full m-0 p-16'>
      <div className="flex flex-col gap-3 m-0 p-5">
        <p className='text-3xl'>Browse Marketplace</p>
        <p className='text-sm'>Browse through more than 50k NFTs on the NFT Marketplace.</p>
        <input placeholder='Search your favourite NFTs' className='border rounded-lg p-2 bg-black' />
      </div>
      <div>
        <Link href={"/marketplace/listitem"}>List Item</Link>
      </div>
      <div className="w-full">
          <Tab.Group>
            <Tab.List className="flex m-0 p-5 justify-center gap-8">
              <p><Tab>NFTs</Tab></p>
              <p><Tab>Collections</Tab></p>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className='md:grid md:grid-cols-3 gap-10 space-y-5'>
                  { MockData.map((item) => {
                    return (
                    <div className='border w-full rounded-lg'>
                      <Link key={item.id} href={item.detailsLink}>
                        <img src={item.Img}/>
                        <div className='m-0 p-3'>
                          <p className='font-bold'>{item.author}</p>
                          <div className='flex'>
                            <img src={item.authorImg} className='' width={60} />
                            <p>{item.author}</p>
                          </div>
                          <div className='flex w-full text-sm justify-between'>
                            <div>
                              <p>Price</p>
                              <p>{item.price}</p>
                            </div>
                            <div>
                              <p>Highest Bid</p>
                              <p>{item.highestBid}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    )
                  })}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className='md:grid md:grid-cols-3 gap-10 space-y-5'>
                  { MockData1.map((item) => {
                    return (
                    <div className='border w-full rounded-lg'>
                      <Link key={item.id} href={item.detailsLink}>
                        <img src={item.Img}/>
                        <div className='m-0 p-3'>
                          <p className='font-bold'>{item.author}</p>
                          <div className='flex'>
                            <img src={item.authorImg} className='' width={60} />
                            <p>{item.author}</p>
                          </div>
                          <div className='flex w-full text-sm justify-between'>
                            <div className=''>
                              <p>Price</p>
                              <p>{item.price}</p>
                            </div>
                            <div className=''>
                              <p>Highest Bid</p>
                              <p>{item.highestBid}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
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