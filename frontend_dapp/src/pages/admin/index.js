import { launchpadFactory, marketplaceContract } from "@/utils/contractInfo";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";



const admin = () => {

  const { address } = useAccount()

  const [isAdmin, setIsAdmin] = useState()

  const { data: isAdminData } = useContractRead({
    ...launchpadFactory,
    functionName: "Admins",
    args: [address]
  })



  useEffect(() => {
    setIsAdmin(isAdminData)
  },
  [isAdmin, address])




    const { config: withdrawConfig } = usePrepareContractWrite({
      ...marketplaceContract,
      functionName: "withdrawFee",
    })

    const {data: withdrawData, write: withdrawWrite } = useContractWrite(withdrawConfig)





    const [setAdminAddr, setSetAdminAddr] = useState()

    const { config: setAdminConfig } = usePrepareContractWrite({
      ...launchpadFactory,
      functionName: "setAdmin",
      args: [setAdminAddr]

    })

    const { data: setAdminData, write: setAdmin } = useContractWrite(setAdminConfig)

    



    const [removeAdminAddr, setRemoveAdminAddr] = useState()

    const { config: removeAdminConfig } = usePrepareContractWrite({
      ...launchpadFactory,
      functionName: "removeAdmin",
      args: [removeAdminAddr]

    })
    const { data: removeAdminData, write: removeAdmin } = useContractWrite(removeAdminConfig)





    const [listingFee, setListingFee] = useState()

    const { config: listingFeeConfig } = usePrepareContractWrite({
      ...launchpadFactory,
      functionName: "setListingFee",
      args: [listingFee]

    })

    const { data: listingFeeData, write: listingFeeWrite } = useContractWrite(listingFeeConfig)




    const [whitelistAddr, setWhitelistAddr] = useState()

    const { config: whitelistAddrConfig } = usePrepareContractWrite({
      ...launchpadFactory,
      functionName: "whitelistAddress",
      args: [whitelistAddr]

    })

    const { data: whitelistAddrData, write: whitelistAddrWrite } = useContractWrite(whitelistAddrConfig)






    const { config: withdrawLPConfig } = usePrepareContractWrite({
      ...launchpadFactory,
      functionName: "withdraw",
    })

    const { data: withdrawLPData, write: withdrawLPWrite } = useContractWrite(withdrawLPConfig)

    



  return (
    <div>
      {isAdmin ? 
        <div className="grid grid-cols-1 md:grid-cols-2 m-0 p-8 gap-5 h-full">
          <div className="border m-0 p-8 gap-5 rounded-lg">
            <p className="text-3xl text-center font-bold">Market place</p>
            <button className="border m-0 p-3 rounded-lg" onClick={(e)=>{
              e.preventDefault()
              withdrawWrite?.()
            }}>Withdraw fee</button>
          </div>


          <div className="border m-0 p-8 gap-5 rounded-lg ">
            <p className="text-3xl text-center font-bold">Launchpad</p>
            <div className="flex flex-col m-0 p-3 gap-3">
              <p className="font-bold">Set Admin</p>
              <input type="text" className="text-black m-0 p-2 rounded-lg" placeholder="Admin address" onChange={(e) => {setSetAdminAddr(e.target.value)}} />
              <button className="m-0 p-2 border rounded-lg" onClick={(e) => {
                e.preventDefault()
                setAdmin?.()
              }}>Set Admin</button>
            </div>


            <div className="flex flex-col m-0 p-3 gap-3">
              <p className="font-bold">Remove Admin</p>
              <input type="text" className="text-black m-0 p-2 rounded-lg" placeholder="Admin address" onChange={(e) => {setRemoveAdminAddr(e.target.value)}} />
              <button className="m-0 p-2 border rounded-lg" onClick={(e) => {
                e.preventDefault()
                removeAdmin?.()
              }}>Remove Admin</button>
            </div>


            <div className="flex flex-col m-0 p-3 gap-3">
              <p className="font-bold">Set Listing Fee</p>
              <input type="text" className="text-black m-0 p-2 rounded-lg" placeholder="Listing Fee in ETH" onChange={(e) => {setListingFee(ethers.utils.parseEther(e.target.value))}} />
              <button className="m-0 p-2 border rounded-lg" onClick={(e) => {
                e.preventDefault()
                listingFeeWrite?.()
              }}>Set Listing Fee</button>
            </div>


            <div className="flex flex-col m-0 p-3 gap-3">
              <p className="font-bold">Whitelist Address</p>
              <input type="text" className="text-black m-0 p-2 rounded-lg" placeholder="Address to whitelist" onChange={(e) => {setWhitelistAddr(e.target.value)}} />
              <button className="m-0 p-2 border rounded-lg" onClick={(e) => {
                e.preventDefault()
                whitelistAddrWrite?.()
              }}>Whitelist</button>
            </div>


            <div className="flex flex-col m-0 p-3 gap-3">
              <p className="font-bold">Withdraw</p>
              <button className="m-0 p-2 border rounded-lg" onClick={(e) => {
                e.preventDefault()
                withdrawLPWrite?.()
              }}>Withdraw</button>
            </div>
          </div>

        </div>
        : 
        <p className="w-full h-full m-0 p-16 text-center">Only Admin can access this page</p>
      }
    </div>
  );
};

export default admin;
