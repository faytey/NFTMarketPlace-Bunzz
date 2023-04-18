import React, { useEffect, useState } from "react";
import { launchpadFactory } from "@/utils/contractInfo.js";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import Link from "next/link";
import CopyButton from "../CopyButton";
import { Truncate } from "../Truncate";

const LaunchPads = ({ arg }) => {
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
  console.log(readData);

  useEffect(() => {
    setRead(readData);
    console.log(read);
  }, [read]);

  const date = (x) => {
    let myDate = new Date(x * 1000);
    console.log(myDate);
    return myDate;
  };

  const today = date(read?.[2]).toDateString();

  return (
    <div
      key={arg}
      className="rounded-lg shadow-2xl bg-[rgba(0,0,0,0.4)] border-2 border-black p-5"
    >
      <div>
        <div className="flex gap-3 p-2 border-b-2">
          <div className="flex flex-col">
            <h1 className="text-3xl">{read?.[0]}</h1>
            <h6>
              LaunchPad Address: <Truncate string={String(read?.[3])} />
              <span>
                <CopyButton arg={read?.[3]} />
              </span>
            </h6>
          </div>
        </div>

        <div className="flex justify-center p-4">
          <Link
            legacyBehavior
            href={`https://sepolia.etherscan.io/address/${read?.[3]}`}
            passHref
          >
            <a target="_blank" rel="noopener noreferrer">
              View on Etherscan
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaunchPads;
