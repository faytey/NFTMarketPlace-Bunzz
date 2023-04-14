import { Inter } from 'next/font/google'
import Link from 'next/link'
import { erc721ABI, useAccount, useContractRead, useContractReads, useContractWrite, usePrepareContractWrite, useProvider } from 'wagmi'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { azukiContract, launchpadContract, marketplaceContract } from '@/utils/contractInfo'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'
import ImageInfoTemplate from '@/components/marketplace/ImageInfoTemplate'
import { ethers } from 'ethers'


const inter = Inter({ subsets: ['latin'] })




// const baseIpfs = "https://ipfs.io/ipfs/";


// const getTokenURI = (tokenURI) => {
//   if (tokenURI == undefined) {
//     return baseIpfs
//   }
//   var url = `${baseIpfs}${tokenURI.slice(7)}`
//   return url;
// }





export default function ListItem() {

    const [itemDetails, setItemDetails] = useState();
    const [listingPrice, setListingPrice] = useState();


    const { data: marketplaceListingPrice, isError: marketplaceDataError, isLoading: marketplaceDataIsLoading } = useContractRead({
        ...marketplaceContract,
        functionName: "listingPrice",
    })

    useEffect(() => {
        setListingPrice(marketplaceListingPrice / ethers.utils.parseEther("1"));
    },[marketplaceListingPrice])



    const { data: nftTokenURI, isError: collectionDataError, isLoading: collectionDataIsLoading } = useContractReads({
        address: itemDetails?.address ?? "0x0",
        abi: erc721ABI,
        functionName: 'tokenURI',
        args: [itemDetails?.tokenId ?? 1],

    })


    const { config } = usePrepareContractWrite({
        ...marketplaceContract,
        functionName: 'ListItemForSale',
        args: [itemDetails?.address, itemDetails?.tokenId, itemDetails?.price],
        overrides: {
            value: ethers.utils.parseEther("0.0006")
        }
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)




    return (
        <div>
            <p>Listing Price: {listingPrice?.toString()} Ether</p>
            <div className='flex m-0 p-16  justify-between'>
                {/* <ImageInfoTemplate tokenURI={nftTokenURI}/> */}
                <form className='flex flex-col m-0 p-10 border rounded-lg justify-between gap-5'>
                    <label>
                        <p>Contract Address</p>
                        <input placeholder='0x' className='m-0 p-2 text-black rounded-lg w-full' onChange={(e) => {
                            setItemDetails({...itemDetails, address: e.target.value})
                            console.log(itemDetails)}
                        } />
                    </label>
                    <label>
                        <p>Token ID</p>
                        <input placeholder='1' className='m-0 p-2 text-black rounded-lg w-full' onChange={(e) => {
                            setItemDetails({...itemDetails, tokenId: e.target.value})
                            console.log(itemDetails)}
                        } />
                    </label>
                    <label>
                        <p>Price in ETH</p>
                        <input placeholder='1' className='m-0 p-2 text-black rounded-lg w-full' onChange={(e) => {
                            var val = ethers.utils.parseUnits(e.target.value, "ether").toString()
                            setItemDetails({...itemDetails, price: val})
                            console.log(itemDetails)}
                        }/>
                    </label>
                    <button type='submit' onClick={(e) => {
                        e.preventDefault();
                        write?.()
                        }}>
                            List Item
                    </button>
                </form>
            </div>
        </div>
    )
}