import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <header>
      <div
        className="flex flex-col py-8 mx-auto text-white text-center roboto-regular max-w-7xl md:mx-5
      lg:mx-10 xl:mx-auto md:flex-row md:items-center md:justify-between"
      >
        <div className="flex flex-row items-center justify-between">
          <Link href="/">
            <div
              className="flex-shrink-0 justify-center"
              style={{ fontSize: "200%" }}
            >
              NiFTee
            </div>
          </Link>
          <button
            className="px-3 py-1 cursor-pointer bg-opacity-30 focus:outline-none md:hidden"
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        <div
          className={
            "mt-3 flex-grow items-start md:flex lg:mt-0" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className="flex-col pl-4 text-xl md:flex-grow md:pl-0">
            <ul className="flex flex-col items-center md:flex-row mr-2 justify-end flex-grow gap-2 pr-4 space-x-2 md:gap-6 md:space-x-6">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/launchpad"}>Launch Pad</Link>
              </li>
              <li>
                <Link href={"/marketplace"}>Market Place</Link>
              </li>
              <li>
                <Link href={"/profile"}>Profile</Link>
              </li>
              <li>
                <Link href={"/admin"}>Admin</Link>
              </li>
              <li>
                <ConnectButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
