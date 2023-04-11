import { Tab } from "@headlessui/react";
import Image from "next/image.js";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout.js";

export const ongoing = [
  {
    img: "image1.jpg",
    logo: "image2.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image3.png",
    logo: "image4.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image5.png",
    logo: "image6.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image4.png",
    logo: "image3.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image6.png",
    logo: "image5.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image2.jpg",
    logo: "image1.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
];
export const ongoing1 = [
  {
    img: "image4.png",
    logo: "image3.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image6.png",
    logo: "image5.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image1.jpg",
    logo: "image2.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image3.png",
    logo: "image4.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image5.png",
    logo: "image6.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },

  {
    img: "image2.jpg",
    logo: "image1.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
];
export const ongoing2 = [
  {
    img: "image6.png",
    logo: "image5.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image2.jpg",
    logo: "image1.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image1.jpg",
    logo: "image2.jpg",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image3.png",
    logo: "image4.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Private Access",
    scan: "https://www.sepolia.etherscan.io",
  },

  {
    img: "image5.png",
    logo: "image6.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
  {
    img: "image4.png",
    logo: "image3.png",
    topic: "Awesome Launchpad",
    description: "lorem ipsum dolor sit amet",
    access: "Public Access",
    scan: "https://www.sepolia.etherscan.io",
  },
];
export default function Launchpad() {
  return (
    <div className="">
      <header className="flex items-center flex-col">
        <h1>Discover Investment Worthy LaunchPads</h1>
      </header>
      <main className="w-[80%] mx-auto">
        <Tab.Group>
          <Tab.List>
            <div className="flex justify-evenly bg-[#3c3c3c] py-4 rounded-xl">
              <Tab className="outline-none">ONGOING</Tab>
              <Tab className="outline-none">UPCOMING</Tab>
              <Tab className="outline-none">PAST</Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="grid grid-cols-2 gap-10 py-10">
              {ongoing.map((data) => {
                return (
                  <div
                    key={data}
                    className="rounded-lg shadow-2xl bg-[#3a3a3a] p-5"
                  >
                    <div className="flex justify-center py-2">
                      <Image
                        src={`/${data.img}`}
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
                            src={`/${data.logo}`}
                            alt="image"
                            width={150}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-3xl">{data.topic}</h1>
                          <h6>{data.description}</h6>
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
                          <h6>{data.access}</h6>
                        </div>
                        <div className="flex flex-col items-center">
                          <p>Base Allocation</p>
                          <h6>$0</h6>
                        </div>
                      </div>
                      <div className="flex justify-center p-4">
                        <Link href="www.sepolia.etherscan.io">
                          View on Etherscan
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Tab.Panel>
            <Tab.Panel className="grid grid-cols-2 gap-10 py-10">
              {ongoing1.map((data) => {
                return (
                  <div
                    key={data}
                    className="rounded-lg shadow-2xl bg-[#3a3a3a] p-5"
                  >
                    <div className="flex justify-center py-2">
                      <Image
                        src={`/${data.img}`}
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
                            src={`/${data.logo}`}
                            alt="image"
                            width={150}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-3xl">{data.topic}</h1>
                          <h6>{data.description}</h6>
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
                          <h6>{data.access}</h6>
                        </div>
                        <div className="flex flex-col items-center">
                          <p>Base Allocation</p>
                          <h6>$0</h6>
                        </div>
                      </div>
                      <div className="flex justify-center p-4">
                        <Link href="www.sepolia.etherscan.io">
                          View on Etherscan
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Tab.Panel>
            <Tab.Panel className="grid grid-cols-2 gap-10 py-10">
              {ongoing2.map((data) => {
                return (
                  <div
                    key={data}
                    className="rounded-lg shadow-2xl bg-[#3a3a3a] p-5"
                  >
                    <div className="flex justify-center py-2">
                      <Image
                        src={`/${data.img}`}
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
                            src={`/${data.logo}`}
                            alt="image"
                            width={150}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-3xl">{data.topic}</h1>
                          <h6>{data.description}</h6>
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
                          <h6>{data.access}</h6>
                        </div>
                        <div className="flex flex-col items-center">
                          <p>Base Allocation</p>
                          <h6>$0</h6>
                        </div>
                      </div>
                      <div className="flex justify-center p-4">
                        <Link href="www.sepolia.etherscan.io">
                          View on Etherscan
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </div>
  );
}
