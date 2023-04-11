import { Inter } from 'next/font/google'
import {useEffect, useState} from 'react'
import {Tab} from '@headlessui/react'
import { erc20ABI, useAccount, useContractRead, useContractReads } from 'wagmi'
import { azukiAbi, azukiAddr, baycAbi, baycAddr } from '@/utils/utils'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })


const MockData = [
  {
    name: 'Magic Mushroom 0325',
    id: 1,
    author: "Shroomie",
    Img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1583&q=80',
    authorImg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1583&q=80',
    price: "1.03 ETH",
    highestBid: "0.33 ETH",
    detailsLink: "/"
  },
  {
    name: 'Magic Mushroom 0325',
    id: 2,
    author: "Shroomie",
    authorImg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1583&q=80',
    Img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1583&q=80',
    price: "1.03 ETH",
    highestBid: "0.33 ETH",
    detailsLink: "/"
  },
  {
    name: 'Magic Mushroom 0325',
    id: 3,
    author: "Shroomie",
    Img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1583&q=80',
    authorImg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1583&q=80',
    price: "1.03 ETH",
    highestBid: "0.33 ETH",
    detailsLink: "/"
  },
]


const MockData1 = [
  {
    name: 'Magic Mushroom 0325',
    id: 1,
    author: "Shroomie",
    Img: 'https://ethereum.org/static/9a6e158f4ffd1cb5de246a3ecd0d7f86/9d5bb/hackathon_transparent.webp',
    authorImg: 'https://ethereum.org/static/9a6e158f4ffd1cb5de246a3ecd0d7f86/9d5bb/hackathon_transparent.webp',
    price: "1.03 ETH",
    highestBid: "0.33 ETH",
    detailsLink: "/"
  },
  {
    name: 'Magic Mushroom 0325',
    id: 1,
    author: "Shroomie",
    Img: 'https://ethereum.org/static/9a6e158f4ffd1cb5de246a3ecd0d7f86/9d5bb/hackathon_transparent.webp',
    authorImg: 'https://ethereum.org/static/9a6e158f4ffd1cb5de246a3ecd0d7f86/9d5bb/hackathon_transparent.webp',
    price: "1.03 ETH",
    highestBid: "0.33 ETH",
    detailsLink: "/"
  },
]




export default function MarketPlace() {

  const [info, setInfo] = useState();


  const { data, error, isError, isLoading } = useContractReads(
    {contracts: [
      {
        address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
        abi: erc20ABI,
        functionName: 'name',
      },
      {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        abi: erc20ABI,
        functionName: 'name',
      },
    ],}
    );




    
    useEffect(
      async () => {

        if (isError) {
          console.log("Error encountered:", error);
        }
        setInfo(data?.[1]);
      },
      []
      )
      
      console.log(info);


  return (
    <div className='w-full m-0 p-16'>
      <div className="flex flex-col gap-3 m-0 p-5">
        <p className='text-3xl'>Browse Marketplace</p>
        <p className='text-sm'>Browse through more than 50k NFTs on the NFT Marketplace.</p>
        <input placeholder='Search your favourite NFTs' className='border rounded-lg p-2 bg-black' />
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
                          <p className='font-bold'>{item.name}</p>
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
                          <p className='font-bold'>{item.name}</p>
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