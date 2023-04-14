import { launchpadFactory } from "@/utils/contractInfo";
import { ethers } from "ethers";
import React, { useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { launchpadFactoryAddr, launchpadFactoryAbi } from "../utils/utils";

export default function createlaunchpad() {
  const { address } = useAccount();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [uri, setUri] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    write?.();
    alert("Successful");
  };
  const { config } = usePrepareContractWrite({
    address: launchpadFactory.address,
    abi: launchpadFactory.abi,
    functionName: "createLaunchPad",
    args: [name, symbol, uri],
    overrides: { value: ethers.utils.parseEther("0.0006") },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const {
    data: sendWaitData,
    isError: errorWaitData,
    isLoading: loadWaitData,
  } = useWaitForTransaction({
    hash: data?.hash,

    onError(error) {
      console.log("Error Message: ", error);
    },

    onSuccess(data) {
      console.log("Success: ", data);
    },
  });

  if (sendWaitData) {
    console.log("Your wait data is ", sendWaitData);
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-[40%] mx-auto shadow-xl bg-[#2f2f2f] p-8 flex flex-col items-center gap-6"
      >
        <h1 className="text-center text-bold text-2xl">
          Enter Your LaunchPad Details
        </h1>
        <div>
          <label htmlFor="name" className="mb-4">
            Name:{" "}
          </label>
          <br />

          <input
            type="text"
            id="name"
            placeholder="Input your NFT Name"
            className="rounded-md p-3 text-[#2f2f2f]"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="symbol" className="mb-4">
            Symbol:{" "}
          </label>
          <br />
          <input
            type="text"
            id="symbol"
            placeholder="Input your NFT Symbol"
            className="rounded-md p-3 text-[#2f2f2f]"
            onChange={(e) => setSymbol(e.target.value)}
            value={symbol}
          />
        </div>
        <div>
          <label htmlFor="uri" className="mb-4">
            URI:{" "}
          </label>
          <br />
          <input
            type="text"
            id="uri"
            placeholder="Input your NFT URI"
            className="rounded-md p-3 text-[#2f2f2f]"
            onChange={(e) => setUri(e.target.value)}
            value={uri}
          />
        </div>
        <button type="submit" className="border rounded-md p-3 w-[53%]">
          {isLoading || loadWaitData ? "Creating" : "CREATE"}
        </button>
      </form>
    </div>
  );
}
