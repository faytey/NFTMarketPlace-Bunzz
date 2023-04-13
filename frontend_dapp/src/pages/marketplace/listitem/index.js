import { Inter } from 'next/font/google'
import Link from 'next/link'
import { erc721ABI, useContractRead, useContractReads, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { azukiContract, launchpadContract, marketplaceContract } from '@/utils/contractInfo'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'


const inter = Inter({ subsets: ['latin'] })




const baseIpfs = "https://ipfs.io/ipfs/";


const getTokenURI = (tokenURI) => {
  if (tokenURI == undefined) {
    return baseIpfs
  }
  var url = `${baseIpfs}${tokenURI.slice(7)}`
  return url;
}




// function ListItemForSale(
//     address _nftcontract,
//     uint256 _tokenId,
//     uint256 _price
// ) 



export default function ListItem() {

    const [itemDetails, setItemDetails] = useState();

    const handleListItem = () => {}

    // const { config } = usePrepareContractWrite({
    //     ...marketplaceContract,
    //     functionName: 'ListItemForSale',
    //     args: [...itemDetails]
    // })

    // const { data, isError, isLoading } = useContractWrite({config})



    return (
        <div>
            <form className='flex flex-col m-0 p-10'>
                <label>
                    <p>Contract Address</p>
                    <input placeholder='0x'/>
                </label>
                <label>
                    <p>Token ID</p>
                    <input placeholder='1'/>
                </label>
                <label>
                    <p>Price</p>
                    <input placeholder='1'/>
                    <select>
                        <option>Ether</option>
                        <option>Gwei</option>
                        <option>Wei</option>
                    </select>
                </label>
                <button onClick={handleListItem}>List Item</button>
            </form>
        </div>
    )
}