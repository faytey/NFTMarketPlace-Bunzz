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

const Upcoming = () => {
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

  return (
    <div className="flex flex-col gap-8 items-center h-auto mt-[1rem] mb-[5rem]">
      <h1>Upcoming Launchpad</h1>
      <div className="bg-[rgba(0,0,0,0.4)] border-2 border-black rounded-md shadow-2xl p-8">
        <div className="flex flex-col gap-2 p-4">
          <p>Name: {readData?.[0]}</p>
          <p>Symbol: {data?.[0]}</p>
          <p>LaunchPad Address: {read}</p>
          <p>Creator: {readData?.[1]}</p>
        </div>
        <Link
          href={`https://sepolia.io/${read}`}
          // passHref
          // legacyBehavior
          className="border px-4 py-2 ml-4 rounded-md"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default Upcoming;
