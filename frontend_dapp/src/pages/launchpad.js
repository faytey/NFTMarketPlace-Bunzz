import LaunchPads from "@/components/LaunchPads.js";
import { launchpadFactory } from "@/utils/contractInfo.js";
import { Tab } from "@headlessui/react";
import Image from "next/image.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import Layout from "../components/Layout.js";

export const upcoming = [
  {
    id: 1,
    img: "image4.png",
    logo: "image3.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    id: 2,
    img: "image6.png",
    logo: "image5.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    id: 3,
    img: "image1.jpg",
    logo: "image2.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    id: 4,
    img: "image3.png",
    logo: "image4.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
];
export const past = [
  {
    id: 1,
    img: "image6.png",
    logo: "image5.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    id: 2,
    img: "image2.jpg",
    logo: "image1.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
];
export default function Launchpad() {
  const [read, setRead] = useState();

  const { address } = useAccount();
  const {
    data: reads,
    isError,
    isLoading,
  } = useContractRead({
    address: launchpadFactory.address,
    abi: launchpadFactory.abi,
    functionName: "totalLaunchPads",
  });

  useEffect(() => {
    setRead(reads);
    console.log(read);
  }, [read]);

  const Reads = Number(reads);

  console.log(Reads);

  const arr = [];

  const Params = () => {
    for (let i = 1; i < Reads; i++) {
      arr.push(i);
      console.log(i);
    }
  };

  console.log(arr);

  console.log(Params());
  return (
    <div className="">
      <header className="flex items-center flex-col">
        <h1>Discover Investment Worthy LaunchPads</h1>
      </header>
      <main className="w-[80%] mx-auto">
        <Tab.Group>
          <Tab.List>
            <div className="flex justify-evenly bg-[#3c3c3c] py-4 rounded-xl">
              <Tab className="outline-none">HOME</Tab>
              <Tab className="outline-none">ONGOING</Tab>
              <Tab className="outline-none">UPCOMING</Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="grid grid-cols-1 md:grid-cols-2 md:gap-10 py-10">
              {arr.map((pad) => {
                return <LaunchPads arg={pad} />;
              })}
            </Tab.Panel>
            <Tab.Panel className="grid grid-cols-2 gap-10 py-10">
              {upcoming.map((data1) => {
                return (
                  <Link
                    href={`/upcoming/${data1.id}`}
                    key={data1.id}
                    className="rounded-lg shadow-2xl bg-[#3a3a3a] p-5"
                  >
                    <div className="flex justify-center py-2">
                      <Image
                        src={`/${data1.img}`}
                        alt="image"
                        width={500}
                        height={100}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="flex gap-3 p-2 border-b-2">
                        <div>
                          <Image
                            src={`/${data1.logo}`}
                            alt="image"
                            width={150}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-3xl">{data1.topic}</h1>
                          <h6>{data1.description}</h6>
                        </div>
                      </div>
                      <div className="flex justify-evenly w-full p-4">
                        <div className="flex flex-col items-center">
                          <p className="text-center text-2xl text-bold">
                            {" "}
                            Don't Miss This ...
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center p-4">
                        <Link href="www.sepolia.etherscan.io" passHref={true}>
                          View on Etherscan
                        </Link>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Tab.Panel>
            <Tab.Panel className="grid grid-cols-2 gap-10 py-10">
              {past.map((data2) => {
                return (
                  <Link
                    href={`/upcoming/${data2.id}`}
                    key={data2.id}
                    className="rounded-lg shadow-2xl bg-[#3a3a3a] p-5"
                  >
                    <div className="flex justify-center py-2">
                      <Image
                        src={`/${data2.img}`}
                        alt="image"
                        width={500}
                        height={100}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="flex gap-3 p-2 border-b-2">
                        <div>
                          <Image
                            src={`/${data2.logo}`}
                            alt="image"
                            width={150}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-3xl">{data2.topic}</h1>
                          <h6>{data2.description}</h6>
                        </div>
                      </div>
                      <div className="py-4 px-2">
                        <div className="flex justify-between ">
                          <h4>Total Raised:</h4>
                          <h4>$500,000</h4>
                        </div>
                        <div>
                          <hr />
                        </div>
                      </div>
                      <div className="flex justify-evenly w-full p-4">
                        <div className="flex flex-col items-center">
                          <p className="text-2xl text-bold">Coming Soon...</p>
                        </div>
                      </div>
                      <div className="flex justify-center p-4">
                        <Link href="www.sepolia.etherscan.io" passHref={true}>
                          View on Etherscan
                        </Link>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div className="mt-3 rounded-lg shadow-xl bg-[#3a3a3a] flex justify-center gap-10 items-center p-6">
          <div className="flex-1">
            <h1 className="text-2xl px-8">
              Want to raise funding for your favorite NFT, Create your LaunchPad
              Now 👉🏼
            </h1>
          </div>
          <div className="flex-1 flex flex-col gap-4 items-center">
            <Image
              src="/image1.jpg"
              alt="icon"
              width={250}
              height={200}
              className="rounded-md"
            />
            <Link
              href="/createlaunchpad"
              className="w-full flex justify-center"
            >
              <button className="bg-green-700 shadow-xl w-[50%] rounded-md py-4">
                Create LaunchPad Now
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
