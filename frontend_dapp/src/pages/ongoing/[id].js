import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ongoing } from "../launchpad";

const Ongoing = () => {
  const { query } = useRouter();
  const id = Number(query.id - 1);
  const info = ongoing[id];

  return (
    <div className="flex flex-col gap-8 items-center h-auto">
      <h1>Ongoing Launchpad</h1>
      <span className="bg-[#3a3a3a] rounded-md shadow-xl p-8">
        <Image
          className="shadow-lg mb-4 rounded-md"
          src={`/${info?.img}`}
          alt="image"
          width={400}
          height={200}
        />
        <div className="flex flex-col gap-2 items-center">
          <p>Name: {info?.topic}</p>
          <p>Description: {info?.description}</p>
          <p>Access: {info?.access}</p>
          <Link
            href={`../deposit/${info?.id}`}
            className="border px-4 py-2 rounded-md"
          >
            Deposit
          </Link>
          <Link href={`/${info?.scan}`} className="border px-4 py-2 rounded-md">
            View More
          </Link>
        </div>
      </span>
    </div>
  );
};

export default Ongoing;
