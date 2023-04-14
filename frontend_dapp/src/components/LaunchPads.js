import React, { useEffect, useState } from "react";
import { launchpadFactory } from "@/utils/contractInfo.js";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import Link from "next/link";

export const ongoing = [
  {
    id: 1,
    img: "image1.jpg",
    logo: "image2.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    id: 2,
    img: "image3.png",
    logo: "image4.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    id: 3,
    img: "image5.png",
    logo: "image6.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    id: 4,
    img: "image4.png",
    logo: "image3.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    id: 5,
    img: "image6.png",
    logo: "image5.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    id: 6,
    img: "image2.jpg",
    logo: "image1.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
];

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
      className="rounded-lg shadow-2xl bg-[#3a3a3a] p-5"
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
        <div className="py-4 px-2">
          <div className="flex justify-between ">
            <h4>Total Raised:</h4>
            <h4>$450,000 / $500,000</h4>
          </div>
          <div>
            <hr />
          </div>
        </div>
        <div className="flex justify-evenly w-full p-4">
          <div className="flex flex-col items-center">
            <p>Valuation</p>
            <h6>278K</h6>
          </div>
          <div className="flex flex-col items-center">
            <p>Access</p>
            <h6>{today}</h6>
          </div>
          <div className="flex flex-col items-center">
            <p>Base Allocation</p>
            <h6>$0</h6>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <a href="www.sepolia.etherscan.io">View on Etherscan</a>
        </div>
      </div>
    </Link>
  );
};

export default LaunchPads;
