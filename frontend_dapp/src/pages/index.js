import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { erc721ABI, useContractRead, useContractReads } from "wagmi";
import { marketplaceContract } from "@/utils/contractInfo";

export default function Home() {



  const [marketItems, setMarketItems] = useState([]);




  const { data: marketplaceData, isError: marketplaceDataError, isLoading: marketplaceDataIsLoading } = useContractReads({
    contracts: [
      {
        ...marketplaceContract,
        functionName: "fetchMarketItems",
      },
  ]})



  useEffect(() => {
    setMarketItems(marketplaceData?.[0])
  },
  [marketplaceData, marketItems]
  )


  const { data: tokenURI, isError: tokenUriError, isLoading: tokenUriIsLoading } = useContractRead({
    address: marketItems?.[9]?.nftContract ?? "0x0",
    abi: erc721ABI,
    functionName: 'tokenURI',
    args: [marketItems?.[9]?.tokenId ?? 9]
})

const { data: tokenURI1, isError: tokenUri1Error, isLoading: tokenUri1IsLoading } = useContractRead({
  address: marketItems?.[10]?.nftContract ?? "0x0",
  abi: erc721ABI,
  functionName: 'tokenURI',
  args: [marketItems?.[10]?.tokenId ?? 10]
})

 const { data: tokenURI2, isError: tokenUri2Error, isLoading: tokenUri2IsLoading } = useContractRead({
  address: marketItems?.[8]?.nftContract ?? "0x0",
  abi: erc721ABI,
  functionName: 'tokenURI',
  args: [marketItems?.[8]?.tokenId ?? 3]
})




  const [tokenMetadata, setTokenMetadata] = useState();
  const [nftImgUrl, setNftImgUrl] = useState();

  const [tokenMetadata1, setTokenMetadata1] = useState();
  const [nftImgUrl1, setNftImgUrl1] = useState();

  const [tokenMetadata2, setTokenMetadata2] = useState();
  const [nftImgUrl2, setNftImgUrl2] = useState();

  const baseIpfs = "https://ipfs.io/ipfs/";

  async function getMetadata(tokenURI) {
      var metadataurl = `${baseIpfs}${tokenURI?.slice(7)}`
      var res = await axios.get(metadataurl).then((res) => {return(res.data)}).catch((err) => {console.log(err)})
      setTokenMetadata(res)
      var imgURI = tokenMetadata?.image
      var imgurl = `${baseIpfs}${imgURI?.slice(7)}`
      setNftImgUrl(imgurl)
  }

  async function getMetadata1(tokenURI1) {
    var metadataurl = `${baseIpfs}${tokenURI1?.slice(7)}`
    var res = await axios.get(metadataurl).then((res) => {return(res.data)}).catch((err) => {console.log(err)})
    setTokenMetadata1(res)
    var imgURI = tokenMetadata1?.image
    var imgurl = `${baseIpfs}${imgURI?.slice(7)}`
    setNftImgUrl1(imgurl)
}

async function getMetadata2(tokenURI2) {
  var metadataurl = `${baseIpfs}${tokenURI2?.slice(7)}`
  var res = await axios.get(metadataurl).then((res) => {return(res.data)}).catch((err) => {console.log(err)})
  setTokenMetadata2(res)
  var imgURI = tokenMetadata2?.image
  var imgurl = `${baseIpfs}${imgURI?.slice(7)}`
  setNftImgUrl2(imgurl)
}

  useEffect(
    () => {
      getMetadata(tokenURI);
      getMetadata1(tokenURI1);
      getMetadata2(tokenURI2);
    },
    [tokenMetadata, tokenURI, tokenMetadata1, tokenURI1, tokenMetadata2, tokenURI2]
  )





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
  const GoerliRPCprovider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/1cKgSVpJw0WpbpesrGWzVE9nMLu4JNYt");
  const BunzzNFTsettings = new ethers.Contract(BunzzContractAddress, BunzzABI, GoerliRPCprovider);
  //<img src="https://ipfs.filebase.io/ipfs/QmazoJtbpuoPgUwYiMFd4mj9HuXKSpsvm3LcQkPdc1XbpM" />
  //Then we can read from the contract using the settings and view code
  async function letsviewNFTs() {

  }
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
            paddingBottom: "5%",paddingRight:"5%"
          }}
        >
          <h1 style={{ fontSize: "350%", fontWeight: "bold" }}>
          Explore Digital Art and Gather Nfts
          </h1>
          <div style={{ fontSize: "120%" }}>
            Nextjs Was Used To Create The Nft Marketplace frontend for NiFT. 
            Assemble, purchase, and market artwork from over 20,000 Nft artists.
          </div>
          <button
            className="mt-8 font-bold py-4 px-8 rounded-full"
            style={{ transition: "1s ease-in-out", background: "purple" }}
            id="homeButton"
          >
            <Link href={"/marketplace"}>Explore</Link>
          </button>
          <div className="grid grid-cols-3 mt-8" style={{ fontSize: "120%" }}>
            <div className="grid-cols-1">
              <span style={{ fontSize: "120%", fontWeight: "bold" }}>
                250k+
              </span>
              <br></br>
              Total Sale
            </div>
            <div className="grid-cols-1">
              <span style={{ fontSize: "120%", fontWeight: "bold" }}>
                120k+
              </span>
              <br></br>
              Auctions
            </div>
            <div className="grid-cols-1">
              <span style={{ fontSize: "120%", fontWeight: "bold" }}>
                250k+
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
            paddingBottom: "5%", paddingLeft:"5%",borderRadius: "3%"
          }}
        >
          {/* <a href="http://marketplace/14"> */}
          <a href={"/marketplace"}>
          {/* img src={nftImgUrl} */}
         <img src="././assets/dog1.png" className=""id="homepagefirstPic" 
            style={{transition: "5s ease-in-out",
            boxShadow: "15px 15px 10px 2px rgba(20,20,20,0.9)",
            animation: "homepicanimation2 3s alternate infinite",
             borderRadius: "3%",
          }} /> </a>
          <div id="viewBUNZZ1"></div>
        </div>
      </div>

      <div
        className="mt-4" 
        id="secondHomeSection"
        style={{ paddingLeft: "12%", paddingRight: "12%", fontSize: "120%", marginBottom:"3%", paddingBottom:"5%" }}
      >
        <h1 style={{ fontSize: "160%", fontWeight: "bold" }}>
          Trending Collection
        </h1>
       <div>Checkout Our Weekly Updated Trending Collection.</div>

        <div className="mt-10 grid md:grid-cols-3 sm:grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="grid-cols-1" style={{marginTop:"5%"}}>
          {/* href="http://marketplace/15" */}
            <a href={"/marketplace"}><img
            //  src={nftImgUrl1} 
             src="././assets/ape.png"
              id="firstpicset"
            /></a>
            <div className="grid grid-cols-2 mt-5 gap-5">
              <div className="grid-cols-1">
              <Link href={"/marketplace"}> <img
                  // src={nftImgUrl1}
                  src="././assets/ape.png"
                  id="firstpicsetsub"
                /></Link>
              </div>
              <div
                className="grid-cols-1 text-center bg-purple"
                id="firstpicsetsubtext"
              >
                1000+
              </div>
            </div>
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              Bored Ape
            </div>
          </div>

          <div className="grid-col-1" style={{marginTop:"5%"}}>
          {/* <a href="http://marketplace/13">  */}
          <a href={"/marketplace"}> 
          {/* <img  src={nftImgUrl2} id="firstpicset" /> */}
          <img  src="././assets/ape2.png" id="firstpicset" />
          </a>
            <div className="grid grid-cols-2 mt-5 gap-5">
              <div className="grid-cols-1">
              <Link href={"/marketplace"}><img
                  // src={nftImgUrl2}
                  src="././assets/ape2.png"
                  id="firstpicsetsub"
                /></Link>
              </div>
              <div className="grid-cols-1" id="firstpicsetsubtext">
                2150+
              </div>
            </div>
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              Bored Yacht Club
            </div>
          </div>

          <div className="grid-col-1" style={{marginTop:"5%"}}>
           {/* <a href="marketplace/14"> */}
           <a href={"/marketplace"}> 
           <img 
          //  src={nftImgUrl} 
          src="././assets/ape3.png"
           id="firstpicset" /></a>
            <div className="grid grid-cols-2 mt-5 gap-5">
              <div className="grid-cols-1" >
              <Link href={"/marketplace"}><img
                // src={nftImgUrl}
                src="././assets/ape3.png"
                  id="firstpicsetsub"
                /></Link>
              </div>
              <div className="grid-cols-1" id="firstpicsetsubtext">
                896+
              </div>
            </div>
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              Magic Ape
            </div>
          </div>
        </div>
      </div>

      <div
        className=""
        id="thirdhomesection"
        style={{ paddingLeft: "12%", paddingRight: "12%", marginTop: "7%" }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 mb-10 ">
          <div className="grid-cols-1" style={{ fontSize: "120%" }}>
            <div style={{ fontSize: "160%", fontWeight: "bold" }}>
              Top Creators
            </div>
            <div>Take a look at the NFT Marketplace's top creators.</div>
          </div>
          <div className="grid-cols-1" style={{}}>
           <Link href={"/marketplace"}> <button
              className="btn md:float-right lg:float-right py-3 mt-3 rounded-full px-8 font-bold"
              type="submit"
              id="homeButton"
              style={{
                border: "2px solid #a244ff",
                transition: "1s ease-in-out",
              }}
            >
              View Rankings
            </button></Link>
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
            <Link href={"/profile"}> <img src="././assets/ape.png" style={{height:"70%", width:"100%", borderRadius: "8%",}}/></Link>
            <div
              style={{
                fontSize: "120%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Joe
            </div>
            <p style={{paddingLeft:"10%"}}>Total sales: 4.5 ETH</p>
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
           <Link href={"/profile"}>  <img src="././assets/4.png" style={{height:"70%", width:"100%", borderRadius: "8%",}}/></Link>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Bayley
            </div>
             <p style={{paddingLeft:"10%"}}>Total sales: 3.5 ETH</p>
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
            <Link href={"/profile"}><img src="././assets/IceCreamApe.png" style={{width:"100%", borderRadius: "8%",}}/></Link>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Holmes
            </div>
             <p style={{paddingLeft:"10%"}}>Total sales: 7.0 ETH</p>
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
            <Link href={"/profile"}><img src="././assets/finegirl.png" style={{width:"100%", borderRadius: "8%",}}/></Link>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Becky
            </div>
             <p style={{paddingLeft:"10%"}}>Total sales: 3.1 ETH</p>
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
          ><Link href={"/marketplace"}> <img src="././assets/1.png" style={{borderRadius:"8%"}}/>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Art
            </div></Link>
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
           <Link href={"/marketplace"}> <img src="././assets/5.png" style={{borderRadius:"8%"}}/>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Collectibles
            </div></Link>
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
           <Link href={"/marketplace"}> <img src="././assets/standup.png" style={{borderRadius:"8%"}}/>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Music
            </div></Link>
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
           <Link href={"/marketplace"}> <img src="././assets/dog1.png" style={{borderRadius:"8%"}}/>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Photography
            </div></Link>
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
              Discover the NiFT Launchpad
            </div>
            <div>Explore our Launchpad to see ongoing and upcoming Launchpad sales.</div>
          </div>
          <div className="grid-cols-1" style={{}}>
          <Link href={"/launchpad"}> <button
              className="btn md:float-right lg:float-right py-3 mt-3 rounded-full px-8 font-bold"
              type="submit"
              id="homeButton"
              style={{
                border: "2px solid #a244ff",
                transition: "1s ease-in-out",
              }}
            >
             View Launchpads
            </button></Link>
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
           <Link href={"/launchpad"}> <img src="././assets/finegirl.png" style={{width:"100%"}} /></Link>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Astronomy
            </div>
            <Link href={"/profile"}> <div
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
            </div></Link>
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
                <div>1.5 ETH</div>
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
                  Sold
                </div>
                <br></br>
                <div style={{ float: "right" }}>43.5 ETH</div>
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
           <Link href={"/launchpad"}> <img src="././assets/SpaceTales.png" style={{width:"100%"}}/></Link>
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
            <Link href={"/profile"}> <div
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
            </div></Link>
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
                <div>1.1 ETH</div>
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
                  Ongoing
                </div>
                <br></br>
                <div style={{ float: "right" }}>22.0 ETH</div>
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
           <Link href={"/launchpad"}> <img src="././assets/CherryGirl.png" style={{width:"100%"}}/></Link>
            <div
              style={{
                fontSize: "130%",
                fontWeight: "bold",
                marginTop: "5%",
                paddingLeft: "10%",
              }}
            >
              Fantasage
            </div>
            <Link href={"/profile"}><div
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
            </div></Link>
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
                <div>0.7 ETH</div>
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
                  Upcoming
                </div>
                <br></br>
                <div style={{ float: "right" }}>0 ETH</div>
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
          <Link href={"/profile"}> <button
              className="btn py-3 mt-3 px-10 rounded-full font-bold"
              type="submit"
              style={{
                transition: "1s ease-in-out",
                color: "white",
                background: "#444444",
              }}
            >
              David
            </button></Link>
            <div
              className="mt-3"
              style={{ fontSize: "300%", fontWeight: "bold" }}
            >
              Lost Magic Auction
            </div>
            <Link href={"/launchpad"}><button
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
            </button></Link>
          </div>
          <div className="grid-cols-1">
            <div className="md:float-right lg:float-right" style={{fontSize:"250%"}} id="timerparagraph">
              <div id="countdown">5 days 24 hours</div>
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
          How It Functions
          </div>
          <div>Discover the starting point.</div>
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
              Setup your Wallet
            </div>
            <div style={{ paddingTop: "3%" }}>
            Set up your preferred wallet. 
            By selecting the wallet icon in the top right corner, you can link it to the NiFT marketplace and launchpad.
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
              Create a Collection
            </div>
            <div style={{ paddingTop: "3%" }}>
            Set up your collection and upload your work. 
            Include a floor price and a description.
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
              Begin to Earn
            </div>
            <div style={{ paddingTop: "3%" }}>
              From a plethora of launchpads and marketplace items, begin earning on NiFT by selling your listed NFTs or 
              NFTs created by other artists.
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
