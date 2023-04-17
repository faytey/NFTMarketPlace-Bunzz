import React, { useEffect, useState } from "react";
import { launchpadFactory } from "@/utils/contractInfo.js";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import Link from "next/link";

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
    <Link
      href={`/ongoing/${arg}`}
      key={arg}
      className="rounded-lg shadow-2xl bg-[rgba(0,0,0,0.4)] border-2 border-black p-5"
    >
      <div className="flex justify-center py-2">
        {/* <Image
          src={`/${arg}`}
          alt="image"
          width={500}
          height={100}
          className="rounded-lg"
        /> */}
      </div>
      <div>
        <div className="flex gap-3 p-2 border-b-2">
          <div>
            {/* <Image
              src={`/${arg}`}
              alt="image"
              width={150}
              height={200}
              className="rounded-lg"
            /> */}
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl">{read?.[0]}</h1>
            <h6>LaunchPad Address: {read?.[3]}</h6>
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
    </Link>
  );
};

export default LaunchPads;
