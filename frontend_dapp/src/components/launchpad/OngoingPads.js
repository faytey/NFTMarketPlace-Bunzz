import React, { useEffect, useState } from "react";
import { launchpadContract, launchpadFactory } from "@/utils/contractInfo.js";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import Link from "next/link";
import { ethers } from "ethers";
import { Truncate } from "../Truncate";
import CopyButton from "../CopyButton";
import { CountDownTimer } from "../CountDownTimer";

const OngoingPads = ({ arg }) => {
  const [read, setRead] = useState();

  const { address } = useAccount();

  const {
    data: readData,
    isError,
    isLoading,
  } = useContractRead({
    address: launchpadFactory.address,
    abi: launchpadFactory.abi,
    functionName: "LaunchPads",
    args: [arg],
  });

  const reads = String(readData?.[3]);

  const {
    data,
    isError: readerror,
    isLoading: readloading,
  } = useContractReads({
    contracts: [
      {
        address: reads,
        abi: launchpadContract.abi,
        functionName: "symbol",
      },
      {
        address: reads,
        abi: launchpadContract.abi,
        functionName: "amtRaised",
      },
      {
        address: reads,
        abi: launchpadContract.abi,
        functionName: "startTime",
      },
      {
        address: reads,
        abi: launchpadContract.abi,
        functionName: "price",
      },
      {
        address: reads,
        abi: launchpadContract.abi,
        functionName: "endTime",
      },
      {
        address: reads,
        abi: launchpadContract.abi,
        functionName: "totalAmountNeeded",
      },
    ],
  });

  useEffect(() => {
    setRead(readData);
  }, [read]);

  const date = (x) => {
    let myDate = new Date(x * 1000);
    return myDate;
  };

  const today = date(read?.[2]).toDateString();
  const start = date(data?.[2]).toDateString();
  const ends = date(data?.[4]).toDateString();
  const d = new Date();

  if (data?.[2] < d.getTime() / 1000 && data?.[4] > d.getTime() / 1000) {
    return (
      <Link
        href={`/launchpad/ongoing/${arg}`}
        className="rounded-lg shadow-2xl bg-[rgba(0,0,0,0.4)] border-2 border-black p-5"
      >
        <div>
          <div className="flex gap-3 p-2">
            <div className="flex flex-col">
              <CountDownTimer time={data?.[4]} />
              <h1 className="text-3xl border-b-2 py-2 mb-2">{read?.[0]}</h1>
              <p>
                Amount Raised:{" "}
                {String(data?.[1]) / ethers.utils.parseEther("1")} ETH /{" "}
                {String(data?.[5]) / ethers.utils.parseEther("1")} ETH
              </p>
              <p>End date: {ends}</p>
              <h6 className="flex gap-2">
                LaunchPad Address: <Truncate string={String(read?.[3])} />
                <span>
                  <CopyButton arg={read?.[3]} />
                </span>
              </h6>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default OngoingPads;
