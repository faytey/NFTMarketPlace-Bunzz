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
import React, { useState } from "react";
import { ongoing, arr } from "../launchpad";
import { ethers } from "ethers";

const StartLaunchPad = () => {
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
  console.log(readData);

  const { address } = useAccount();

  const [duration, setDuration] = useState();
  const [price, setPrice] = useState("0");
  const [totalAmountNeeded, setTotalAmountNeeded] = useState("0");

  const handleSubmit = (e) => {
    e.preventDefault();
    write?.();
  };

  const { config } = usePrepareContractWrite({
    address: String(readData?.[3]),
    abi: launchpadContract.abi,
    functionName: "startLaunchPad",
    args: [
      duration,
      ethers.utils.parseUnits(price, 18),
      ethers.utils.parseUnits(totalAmountNeeded, 18),
    ],
  });
  const {
    data,
    isLoading: writeLoad,
    isSuccess,
    write,
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
      console.log("Success Message: ", data);
    },
  });

  if (sendWaitData) {
    console.log("Your wait data is ", sendWaitData);
  }

  const date = (x) => {
    let myDate = new Date(x * 1000);
    return myDate;
  };

  const today = date(readData?.[2]).toDateString();
  console.log(today);

  return (
    <div className="flex flex-col gap-8 items-center h-auto mb-[2rem]">
      <h1>Start LaunchPad</h1>
      <span className="bg-[rgba(0,0,0,0.4)] rounded-md shadow-xl p-8">
        {/* <Image
          className="shadow-lg mb-4 rounded-md"
          src={`/${info?.img}`}
          alt="image"
          width={400}
          height={200}
        /> */}
        <div className="flex flex-col gap-2 items-center">
          <p>Name: {readData?.[0]}</p>
          <p>Creator: {readData?.[1]}</p>
          <p>Created: {today}</p>
          <Link
            href={`/www.sepolia.io/${readData?.[3]}`}
            className="border px-4 py-2 rounded-md"
          >
            View More
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <label htmlFor="duration">Duration: </label>
          <input
            className="text-black p-2 rounded-md"
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <label htmlFor="price">Price: </label>
          <input
            className="text-black p-2 rounded-md"
            type="text"
            id="price"
            placeholder="Enter Price of the NFT"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="amount">Total Amount Needed: </label>
          <input
            className="text-black p-2 rounded-md"
            type="text"
            id="amount"
            placeholder="Enter Total Amount Needed to be raised"
            value={totalAmountNeeded}
            onChange={(e) => setTotalAmountNeeded(e.target.value)}
          />
          <button type="submit">
            {writeLoad || loadWaitData ? "Starting LaunchPad" : "SUBMIT"}
          </button>
        </form>
      </span>
    </div>
  );
};

export default StartLaunchPad;
