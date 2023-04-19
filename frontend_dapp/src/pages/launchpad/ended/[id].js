import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { launchpadContract, launchpadFactory } from "@/utils/contractInfo.js";
import {
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import React, { useEffect, useState } from "react";
import { ongoing, arr } from "..";
import { ethers } from "ethers";
import { Truncate } from "@/components/Truncate";
import CopyButton from "@/components/CopyButton";

const Ended = () => {
  // const [read, setRead] = useState();
  const { query } = useRouter();
  const id = Number(query.id);

  const {
    data: readData,
    isError,
    isLoading,
  } = useContractRead({
    address: launchpadFactory.address,
    abi: launchpadFactory.abi,
    functionName: "LaunchPads",
    args: [id],
  });

  const read = String(readData?.[3]);
  // console.log(read);
  const {
    data,
    isError: readerror,
    isLoading: readloading,
  } = useContractReads({
    contracts: [
      {
        address: read,
        abi: launchpadContract.abi,
        functionName: "symbol",
      },
      {
        address: read,
        abi: launchpadContract.abi,
        functionName: "amtRaised",
      },
      {
        address: read,
        abi: launchpadContract.abi,
        functionName: "startTime",
      },
      {
        address: read,
        abi: launchpadContract.abi,
        functionName: "price",
      },
      {
        address: read,
        abi: launchpadContract.abi,
        functionName: "endTime",
      },
      {
        address: read,
        abi: launchpadContract.abi,
        functionName: "totalAmountNeeded",
      },
    ],
  });

  const handleClick = (e) => {
    e.preventDefault();
    write?.();
  };

  const { config } = usePrepareContractWrite({
    address: read,
    abi: launchpadContract.abi,
    functionName: "withdrawNFT",
  });

  const {
    data: writedata,
    isLoading: writeloading,
    isSuccess,
    write,
    isError: writeerror,
  } = useContractWrite(config);

  const {
    data: sendWaitData,
    isError: errorWaitData,
    isLoading: loadWaitData,
  } = useWaitForTransaction({
    hash: data?.hash,

    onError(error) {
      console.log("Error Message: ", error);
    },

    onSuccess(data) {
      console.log("Success: ", data);
    },
  });

  if (sendWaitData) {
    console.log("Your wait data is ", sendWaitData);
  }

  const date = (x) => {
    let myDate = new Date(x * 1000);
    // console.log(myDate);
    return myDate;
  };

  const today = date(readData?.[2]).toDateString();
  const start = date(data?.[2]).toDateString();
  const end = date(data?.[4]).toDateString();
  return (
    <div className="flex flex-col gap-8 items-center h-auto mt-[1rem] mb-[5rem]">
      <h1>Ended Launchpad</h1>
      <div className="bg-[rgba(0,0,0,0.4)] border-2 border-black rounded-md shadow-2xl p-8">
        <div className="flex flex-col gap-2 p-4">
          <p>Name: {readData?.[0]}</p>
          <p>Symbol: {data?.[0]}</p>
          <h6 className="flex gap-2">
            LaunchPad Address: <Truncate string={String(read)} />
            <span>
              <CopyButton arg={read} />
            </span>
          </h6>
          <p>
            Total Raised: {String(data?.[5]) / ethers.utils.parseEther("1")} ETH
          </p>
          <p>Start Date: {start}</p>
        </div>
        <hr />
        <div className="flex flex-col gap-2 p-4">
          <p>
            Price Per NFT: {String(data?.[3]) / ethers.utils.parseEther("1")}{" "}
            ETH
          </p>
          <p>End Date: {end}</p>
          <p className="flex gap-2">
            Creator: <Truncate string={String(readData?.[1])} />
            <span>
              <CopyButton arg={readData?.[1]} />
            </span>
          </p>
          <p>Created: {today}</p>
        </div>

        <button
          type="submit"
          className="border px-4 ml-4 py-2 rounded-md"
          onClick={handleClick}
        >
          {writeloading || loadWaitData ? "Withdrawing" : "WITHDRAW"}
        </button>
        {/* <Link href={`/${info?.scan}`} className="border px-4 py-2 rounded-md">
            View More
          </Link> */}
      </div>
    </div>
  );
};

export default Ended;
