import { Inter } from 'next/font/google'
import { erc721ABI, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { azukiContract, launchpadContract, marketplaceContract } from '@/utils/contractInfo'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'
import ImageInfoTemplate from '@/components/marketplace/ImageInfoTemplate'
import { ethers } from 'ethers'
import ListItemHeaderTemplate from '@/components/marketplace/ListItemHeaderTemplate'


const inter = Inter({ subsets: ['latin'] })




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


    const { data: nftTokenURI, isError: collectionDataError, isLoading: collectionDataIsLoading } = useContractRead({
        address: itemDetails?.address ?? "0x0",
        abi: erc721ABI,
        functionName: 'tokenURI',
        args: [itemDetails?.tokenId ?? 0],

    })


    const [tokenMetadata, setTokenMetadata] = useState();
    const [nftImgUrl, setNftImgUrl] = useState();

    const baseIpfs = "https://ipfs.io/ipfs/";

    async function getMetadata(tokenURI) {
        var metadataurl = `${baseIpfs}${tokenURI?.slice(7)}`
        var res = await axios.get(metadataurl).then((res) => {return(res.data)}).catch((err) => {console.log(err)})
        setTokenMetadata(res)
        var imgURI = tokenMetadata?.image
        var imgurl = `${baseIpfs}${imgURI?.slice(7)}`
        setNftImgUrl(imgurl)
    }

    useEffect(
    () => {
        getMetadata(nftTokenURI);
    },
    [tokenMetadata, nftTokenURI]
    )


    const { config: approveConfig } = usePrepareContractWrite({
        address: itemDetails?.address,
        abi: erc721ABI,
        functionName: 'approve',
        args: [marketplaceContract?.address, itemDetails?.tokenId],
    })
    

    const { data: approveData, write: approveWrite } = useContractWrite({
        ...approveConfig,
    })

    const { data: approveDetails } = useWaitForTransaction({
        hash: approveData?.hash,

        onSuccess(data) {
            console.log(data);
            listWrite?.()
        }
    })


    const { config: listConfig } = usePrepareContractWrite({
        ...marketplaceContract,
        functionName: 'ListItemForSale',
        args: [itemDetails?.address, itemDetails?.tokenId, itemDetails?.price],
        overrides: {
            value: ethers.utils.parseEther("0.00067")
        }
    })

    const { data: listData, write: listWrite } = useContractWrite({
        ...listConfig
    })

    


    return (
        <div>
            <ListItemHeaderTemplate />
            <div className='grid grid-cols-1 md:grid-cols-2 m-0 p-16 gap-8'>
                <div>
                    <img src={nftImgUrl ?? "assets/Avatar.png"} />
                </div>
                <form className='flex flex-col m-0 p-10 border rounded-lg justify-between gap-5'>
                    <p><b className="relative leading-[100%] capitalize">Listing Fee: </b>{listingPrice?.toString()} ETH</p>
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
                            var val = ethers.utils.parseEther(e.target.value).toString()
                            setItemDetails({...itemDetails, price: val})
                            console.log(itemDetails)}
                        }/>
                    </label>
                    <button type='submit' className='border rounded-lg m-0 p-2' onClick={(e) => {
                        e.preventDefault();
                        approveWrite?.()
                        }}>
                            List Item
                    </button>
                </form>
            </div>
        </div>
    )
}