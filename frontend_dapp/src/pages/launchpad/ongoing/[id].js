import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { launchpadContract, launchpadFactory } from "@/utils/contractInfo.js";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import React, { useEffect, useState } from "react";
import { ongoing, arr } from "..";
import { ethers } from "ethers";
import CopyButton from "@/components/CopyButton";

const Ongoing = () => {
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
      <h1>Ongoing Launchpad</h1>
      <div className="bg-[rgba(0,0,0,0.4)] border-2 border-black rounded-md shadow-2xl p-8">
        <div className="flex flex-col gap-2 p-4">
          <p>Name: {readData?.[0]}</p>
          <p>Symbol: {data?.[0]}</p>
          <p>
            Amount Raised: {String(data?.[1]) / ethers.utils.parseEther("1")}{" "}
            ETH / {String(data?.[5]) / ethers.utils.parseEther("1")} ETH
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
          <p>
            Creator: {readData?.[1]}
            <CopyButton />
          </p>
          <p>Created: {today}</p>
        </div>
        <div className="flex gap-4 ml-4">
          <Link
            href={`../startLaunchPad/${id}`}
            className="border px-4 py-2 rounded-md"
          >
            START
          </Link>
          <Link
            href={`../deposit/${id}`}
            className="border px-4 py-2 rounded-md"
          >
            DEPOSIT
          </Link>
          <Link
            href={`https://sepolia.etherscan.io/address/${read}`}
            className="border px-4 py-2 rounded-md"
          >
            VIEW MORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ongoing;
