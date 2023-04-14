import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { past } from "../launchpad";

const Past = () => {
  const { query } = useRouter();
  const id = Number(query.id - 1);
  const info = past[id];

  return (
    <div className="flex flex-col gap-8 items-center h-auto">
      <h1>Previous Launchpad</h1>
      <span className="bg-[#3a3a3a] rounded-md shadow-xl p-8">
        <Image
          className="shadow-lg mb-4"
          src={`/${info?.img}`}
          alt="image"
          width={400}
          height={200}
        />
        <div className="flex flex-col gap-2 items-center">
          <p>Name: {info?.topic}</p>
          <p>Description: {info?.description}</p>
          <p>Access: {info?.access}</p>
          <p className="text-xl italic font-bold">...LAUNCHPAD ENDED...</p>
        </div>
      </span>
    </div>
  );
};

export default Past;
