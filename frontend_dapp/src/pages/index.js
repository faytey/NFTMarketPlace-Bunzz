import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  //In order to pull NFTs to the homepage, we need to use the settings, though these can only give us information on the NFTs.
  const { ethers } = require("ethers");
  const BunzzContractAddress = "0xC97576B9a68EDb00A1F4E03AE94E9C12cbAbD4E1";
  const BunzzABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "delegator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "fromDelegate",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "toDelegate",
          type: "address",
        },
      ],
      name: "DelegateChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "delegate",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "previousBalance",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newBalance",
          type: "uint256",
        },
      ],
      name: "DelegateVotesChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "delegatee",
          type: "address",
        },
      ],
      name: "delegate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "delegatee",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "nonce",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "expiry",
          type: "uint256",
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8",
        },
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32",
        },
      ],
      name: "delegateBySig",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "delegates",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "blockNumber",
          type: "uint256",
        },
      ],
      name: "getPastTotalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "blockNumber",
          type: "uint256",
        },
      ],
      name: "getPastVotes",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "getVotes",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "nonces",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "string",
          name: "uri",
          type: "string",
        },
      ],
      name: "safeMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const mywalletaddress = "0x5b133baD621F9cE287E00Ad4967fF44801713981";
  const GoerliRPCprovider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/1cKgSVpJw0WpbpesrGWzVE9nMLu4JNYt"
  );
  const BunzzNFTsettings = new ethers.Contract(
    BunzzContractAddress,
    BunzzABI,
    GoerliRPCprovider
  );
  //<img src="https://ipfs.filebase.io/ipfs/QmazoJtbpuoPgUwYiMFd4mj9HuXKSpsvm3LcQkPdc1XbpM" />
  //Then we can read from the contract using the settings and view code
  async function letsviewNFTs() {}
  letsviewNFTs();

  return (
    <main className="mt-6 mb-6" style={{ transition: "3s ease-in-out" }}>
      <div
        className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2"
        id="firstHomeSection"
        style={{ paddingLeft: "12%", paddingRight: "12%" }}
      >
        <div
          className="grid-cols-1"
          style={{
            // backgroundColor: "",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
        >
          <h1 style={{ fontSize: "350%", fontWeight: "bold" }}>
            Discover Digital Art & Collect Nfts
          </h1>
          <div style={{ fontSize: "120%" }}>
            Nft Marketplace Ui Created With Anima For Figma. Collect, Buy And
            Sell Art From More Than 20k Nft Artists.
          </div>
          <button
            className="mt-8 font-bold py-4 px-8 rounded-full"
            style={{ transition: "1s ease-in-out", background: "#0044ee" }}
            id="homeButton"
          >
            <Link href={"/marketplace"}>Get Started</Link>
          </button>
          <div className="grid grid-cols-3 mt-8" style={{ fontSize: "120%" }}>
            <div className="grid-cols-1">
              <span style={{ fontSize: "120%", fontWeight: "bold" }}>
                240k+
              </span>
              <br></br>
              Total Sale
            </div>
            <div className="grid-cols-1">
              <span style={{ fontSize: "120%", fontWeight: "bold" }}>
                100k+
              </span>
              <br></br>
              Auctions
            </div>
            <div className="grid-cols-1">
              <span style={{ fontSize: "120%", fontWeight: "bold" }}>
                240k+
              </span>
              <br></br>
              Artists
            </div>
          </div>
        </div>

        <div
          className="grid-cols-1"
          style={{
            // backgroundColor: "",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
        >
          <img
            src="././assets/benz.jpg"
            className=""
            id="homepagefirstPic"
            style={{
              transition: "5s ease-in-out",
              boxShadow: "15px 15px 10px 2px rgba(20,20,20,0.9)",
              animation: "homepicanimation2 3s alternate infinite",
              // borderRadius: "",
            }}
          />
          <div id="viewBUNZZ1"></div>
        </div>
      </div>

      <div
        className="mt-4" 
        id="secondHomeSection"
        style={{ paddingLeft: "12%", paddingRight: "12%", fontSize: "120%", marginBottom:"", paddingBottom:"5%" }}
      >
        <h1 style={{ fontSize: "160%", fontWeight: "bold" }}>
          Trending Collection
        </h1>
        <div>Checkout Our Weekly Updated Trending Collection.</div>

        <div className="mt-10 grid md:grid-cols-3 sm:grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="grid-cols-1">
            <img
              src="https://ipfs.filebase.io/ipfs/QmdYkAq8CFB2rqtswWyJWr5s7MWdQuHcg1zVBArpaB2nNn"
              id="firstpicset"
            />
            <div className="grid grid-cols-3 mt-5 gap-5">
              <div className="grid-cols-1">
                <img
                  src="././assets/firstsetimagesub1.png"
                  id="firstpicsetsub"
                />
              </div>
              <div className="grid-cols-1">
                <img
                  src="././assets/firstsetimagesub2.png"
                  id="firstpicsetsub"
                />
              </div>
              <div
                className="grid-cols-1 text-center bg-purple"
                id="firstpicsetsubtext"
              >
                1025+
              </div>
            </div>
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              Dsgn Animals
            </div>
            <div className="grid grid-cols-5">
              <div className="grid-col-1">
                <img
                  src="././assets/finegirl.png"
                  className="rounded-full"
                  id="smallestpics"
                />
              </div>
              <div className="=grid-cols-4" style={{ marginLeft: "-30%" }}>
                MrFox
              </div>
            </div>
          </div>
          <div className="grid-col-1">
            <img src="././assets/standup.png" id="firstpicset" />
            <div className="grid grid-cols-3 mt-5 gap-5">
              <div className="grid-cols-1">
                <img
                  src="././assets/firstsetimagesub1.png"
                  id="firstpicsetsub"
                />
              </div>
              <div className="grid-cols-1">
                <img
                  src="././assets/firstsetimagesub2.png"
                  id="firstpicsetsub"
                />
              </div>
              <div className="grid-cols-1" id="firstpicsetsubtext">
                1025+
              </div>
            </div>
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              Magic Mushrooms
            </div>
            <div className="grid grid-cols-5">
              <div className="grid-col-1">
                <img
                  src="././assets/finegirl.png"
                  className="rounded-full"
                  id="smallestpics"
                />
              </div>
              <div className="=grid-cols-4" style={{ marginLeft: "-30%" }}>
                Shroomie
              </div>
            </div>
          </div>
          <div className="grid-col-1">
            <img src="././assets/mushroom.png" id="firstpicset" />
            <div className="grid grid-cols-3 mt-5 gap-5">
              <div className="grid-cols-1">
                <img
                  src="././assets/firstsetimagesub1.png"
                  id="firstpicsetsub"
                />
              </div>
              <div className="grid-cols-1">
                <img
                  src="././assets/firstsetimagesub2.png"
                  id="firstpicsetsub"
                />
              </div>
              <div className="grid-cols-1" id="firstpicsetsubtext">
                1025+
              </div>
            </div>
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              Disco Machines
            </div>
            <div className="grid grid-cols-5">
              <div className="grid-col-1">
                <img
                  src="././assets/finegirl.png"
                  className="rounded-full"
                  id="smallestpics"
                />
              </div>
              <div className="=grid-cols-4" style={{ marginLeft: "-30%" }}>
                BeKind2Robots
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className=""
        id="thirdhomesection"
        style={{ paddingLeft: "12%", paddingRight: "12%", marginTop: "5%" }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 mb-10 ">
          <div className="grid-cols-1" style={{ fontSize: "120%" }}>
            <div style={{ fontSize: "160%", fontWeight: "bold" }}>
              Top Creators
            </div>
            <div>Checkout Top Rated Creators On The Nft Marketplace</div>
          </div>
          <div className="grid-cols-1" style={{}}>
            <button
              className="btn md:float-right lg:float-right py-3 mt-3 rounded-full px-8 font-bold"
              type="submit"
              id="homeButton"
              style={{
                border: "2px solid #a244ff",
                transition: "1s ease-in-out",
              }}
            >
              View Rankings
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-1 gap-8 mb-8">
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%", marginLeft:"5%", marginRight:"5%"
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-1 gap-8 mb-8">
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-1 gap-8 mb-8">
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
          <div
            className="grid-cols-1 text-center"
            id="thirdsectiontopcreators"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "6%",
            }}
          >
            <img
              src="././assets/firstsetimagesub1.png"
              className="rounded-full sm:ml-4"
              style={{ transform: "scale3d(0.6,0.6,0.6)", marginTop: "-7%" }}
            />
            <div
              className="font-bold"
              style={{ fontSize: "130%", marginTop: "-10%" }}
            >
              keepitreal
            </div>
            <div>Total Sales: 34.53 ETH</div>
          </div>
        </div>
      </div>

      <div
        className=""
        id="fourthhomesection"
        style={{ paddingLeft: "12%", paddingRight: "12%", marginTop: "6%" }}
      >
        <div className="" style={{ fontSize: "180%", fontWeight: "bold" }}>
          Browse Categories
        </div>
        <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-1 gap-8 mb-4">
          <div
            className="grid-cols-1"
            id="fourthsectioncategories"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/DistantGalaxy.png" />
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Art
            </div>
          </div>
          <div
            className="grid-cols-1"
            id="fourthsectioncategories"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/DistantGalaxy.png" />
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Collectibles
            </div>
          </div>
          <div
            className="grid-cols-1"
            id="fourthsectioncategories"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/DistantGalaxy.png" />
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Music
            </div>
          </div>
          <div
            className="grid-cols-1"
            id="fourthsectioncategories"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/DistantGalaxy.png" />
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Photography
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-1 gap-8 mb-4">
          <div
            className="grid-cols-1"
            id="fourthsectioncategories"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/DistantGalaxy.png" />
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Art
            </div>
          </div>
          <div
            className="grid-cols-1"
            id="fourthsectioncategories"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/DistantGalaxy.png" />
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Collectibles
            </div>
          </div>
          <div
            className="grid-cols-1"
            id="fourthsectioncategories"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/DistantGalaxy.png" />
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Music
            </div>
          </div>
          <div
            className="grid-cols-1"
            id="fourthsectioncategories"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/DistantGalaxy.png" />
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Photography
            </div>
          </div>
        </div>
      </div>

      <div
        className=""
        id="fifthhomesection"
        style={{ paddingLeft: "12%", paddingRight: "12%", marginTop: "6%" }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 mb-10">
          <div className="grid-cols-1" style={{ fontSize: "120%" }}>
            <div style={{ fontSize: "160%", fontWeight: "bold" }}>
              Discover More Nfts
            </div>
            <div>Explore New Trending Nfts</div>
          </div>
          <div className="grid-cols-1" style={{}}>
            <button
              className="btn md:float-right lg:float-right py-3 mt-3 rounded-full px-8 font-bold"
              type="submit"
              id="homeButton"
              style={{
                border: "2px solid #a244ff",
                transition: "1s ease-in-out",
              }}
            >
              See All
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 gap-8 mb-4">
          <div
            className="grid-cols-1"
            id="fifthsectioncontainers"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/finegirl.png" style={{width:"100%"}} />
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Distant Galaxy
            </div>
            <div
              className="grid grid-cols-4"
              style={{ marginTop: "2%", paddingLeft: "10%" }}
            >
              <div className="grid-cols-1">
                <img
                  src="././assets/Avatar.png"
                  className="rounded-full"
                  style={{ height: "100%", width: "50%", transform: "" }}
                />
              </div>
              <div
                className="grid-cols-3"
                style={{ marginLeft: "-25%", marginTop: "10%" }}
              >
                MoonDancer
              </div>
            </div>
            <div
              className="grid grid-cols-2"
              style={{
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%",
              }}
            >
              <div className="grid-cols-1">
                <div
                  style={{
                    fontSize: "80%",
                    color: "#bbbbbb",
                    fontFamily: "georgia",
                  }}
                >
                  Price
                </div>
                <div>1.63 ETH</div>
              </div>
              <div className="grid-cols-1">
                <div
                  style={{
                    float: "right",
                    fontSize: "80%",
                    color: "#aaaaaa",
                    fontFamily: "georgia",
                  }}
                >
                  Highest Bid
                </div>
                <br></br>
                <div style={{ float: "right" }}>0.33 wETH</div>
              </div>
            </div>
          </div>
          <div
            className="grid-cols-1"
            id="fifthsectioncontainers"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/SpaceTales.png" style={{width:"100%"}}/>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Economy
            </div>
            <div
              className="grid grid-cols-4"
              style={{ marginTop: "2%", paddingLeft: "10%" }}
            >
              <div className="grid-cols-1">
                <img
                  src="././assets/Avatar.png"
                  className="rounded-full"
                  style={{ height: "100%", width: "50%", transform: "" }}
                />
              </div>
              <div
                className="grid-cols-3"
                style={{ marginLeft: "-25%", marginTop: "10%" }}
              >
                Spaceone
              </div>
            </div>
            <div
              className="grid grid-cols-2"
              style={{
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%",
              }}
            >
              <div className="grid-cols-1">
                <div
                  style={{
                    fontSize: "80%",
                    color: "#bbbbbb",
                    fontFamily: "georgia",
                  }}
                >
                  Price
                </div>
                <div>1.63 ETH</div>
              </div>
              <div className="grid-cols-1">
                <div
                  style={{
                    float: "right",
                    fontSize: "80%",
                    color: "#aaaaaa",
                    fontFamily: "georgia",
                  }}
                >
                  Highest Bid
                </div>
                <br></br>
                <div style={{ float: "right" }}>0.33 wETH</div>
              </div>
            </div>
          </div>
          <div
            className="grid-cols-1"
            id="fifthsectioncontainers"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "10%",
              marginTop: "10%",
              transition: "1s ease-in-out",
            }}
          >
            <img src="././assets/CherryGirl.png" style={{width:"100%"}}/>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Astrofiction
            </div>
            <div
              className="grid grid-cols-4"
              style={{ marginTop: "2%", paddingLeft: "10%" }}
            >
              <div className="grid-cols-1">
                <img
                  src="././assets/Avatar.png"
                  className="rounded-full"
                  style={{ height: "100%", width: "50%", transform: "" }}
                />
              </div>
              <div
                className="grid-cols-3"
                style={{ marginLeft: "-25%", marginTop: "10%" }}
              >
                Fantasy
              </div>
            </div>
            <div
              className="grid grid-cols-2"
              style={{
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%",
              }}
            >
              <div className="grid-cols-1">
                <div
                  style={{
                    fontSize: "80%",
                    color: "#bbbbbb",
                    fontFamily: "georgia",
                  }}
                >
                  Price
                </div>
                <div>1.63 ETH</div>
              </div>
              <div className="grid-cols-1">
                <div
                  style={{
                    float: "right",
                    fontSize: "80%",
                    color: "#aaaaaa",
                    fontFamily: "georgia",
                  }}
                >
                  Highest Bid
                </div>
                <br></br>
                <div style={{ float: "right" }}>0.33 wETH</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className=""
        id="sixthhomesection"
        style={{
          marginTop: "5%",
          backgroundImage: "url(././assets/mushroom2.png)",
          paddingTop: "20%",
          paddingBottom: "5%",
          backgroundSize: "120%",
        }}
      >
        <div
          className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1"
          style={{ paddingRight: "12%", paddingLeft: "12%" }}
        >
          <div className="grid-cols-1">
            <button
              className="btn py-3 mt-3 px-10 rounded-full font-bold"
              type="submit"
              style={{
                transition: "1s ease-in-out",
                color: "white",
                background: "#444444",
              }}
            >
              David
            </button>
            <div
              className="mt-3"
              style={{ fontSize: "300%", fontWeight: "bold" }}
            >
              Magic Mashrooms Auction
            </div>
            <button
              className="btn py-3 mt-3 px-12 rounded-full font-bold"
              type="submit"
              id="homeButton"
              style={{
                transition: "1s ease-in-out",
                color: "black",
                background: "white",
              }}
            >
              See NFT
            </button>
          </div>
          <div className="grid-cols-1">
            <div className="md:float-right lg:float-right" style={{fontSize:"250%"}} id="timerparagraph">
              <div id="countdown">1 day 24 hours</div>
            </div>
          </div>
        </div>
      </div>

      <div
        className=""
        id="seventhhomesection"
        style={{
          paddingLeft: "12%",
          paddingRight: "12%",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <div className="" style={{ fontSize: "120%" }}>
          <div style={{ fontSize: "160%", fontWeight: "bold" }}>
            How It Works
          </div>
          <div>Find Out How To Get Started</div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 gap-8" style={{ marginTop: "4%" }}>
          <div
            className="grid-cols-1"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "9%",
              paddingTop: "3%",
              textAlign: "center",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <img
              src="././assets/icon.svg"
              className="rounded-full"
              style={{ transform: "scale3D(0.9,0.9,0.9)" }}
            />
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              Setup Your Wallet
            </div>
            <div style={{ paddingTop: "3%" }}>
              Set up your wallet of choice. Connect it to the Animarket by
              clicking the wallet icon in the top right corner.
            </div>
          </div>
          <div
            className="grid-cols-1"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "9%",
              paddingTop: "3%",
              textAlign: "center",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <img
              src="././assets/icon.svg"
              className="rounded-full"
              style={{ transform: "scale3D(0.9,0.9,0.9)" }}
            />
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              Create Collection
            </div>
            <div style={{ paddingTop: "3%" }}>
              Upload your work and setup your collection. Add a description,
              social links and floor price.
            </div>
          </div>
          <div
            className="grid-cols-1"
            style={{
              backgroundColor: "#444444",
              borderRadius: "8%",
              paddingBottom: "9%",
              paddingTop: "3%",
              textAlign: "center",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <img
              src="././assets/icon.svg"
              className="rounded-full"
              style={{ transform: "scale3D(0.9,0.9,0.9)" }}
            />
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              Start Earning
            </div>
            <div style={{ paddingTop: "3%" }}>
              Choose between auctions and fixed-price listings. Start earning by
              selling your NFTs or trading others.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
