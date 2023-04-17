import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { upcoming } from "../launchpad";

const Upcoming = () => {
  const { query } = useRouter();
  const id = Number(query.id - 1);
  const info = upcoming[id];

  return (
    <div className="flex flex-col gap-8 items-center h-auto">
      <h1>Upcoming Launchpad</h1>
      <span className="bg-[rgba(0,0,0,0.4)] border-2 border-black rounded-md shadow-xl p-8">
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
          <Link href={`/startLaunchPad/${id}`}>
            <button type="submit">START</button>
          </Link>
        </div>
      </span>
    </div>
  );
};

export default Upcoming;
