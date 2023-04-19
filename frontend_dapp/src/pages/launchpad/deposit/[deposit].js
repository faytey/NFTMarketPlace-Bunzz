import { launchpadContract, launchpadFactory } from "@/utils/contractInfo";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const Deposit = () => {
  const { deposit } = useRouter().query;
  const id = Number(deposit);

  const { address } = useAccount();

  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const {
    data: reads,
    isError,
    isLoading: loading,
  } = useContractRead({
    address: launchpadFactory.address,
    abi: launchpadFactory.abi,
    functionName: "LaunchPads",
    args: [id],
  });

  const {
    data: prices,
    isError: errors,
    isLoading: loads,
  } = useContractRead({
    address: reads?.[3],
    abi: launchpadContract.abi,
    functionName: "price",
  });

  const tryouts = () => {
    const string = prices / ethers.utils.parseEther("1");
    const total = string * amount;
    const totals = total * 10 ** 18 ?? "0";
    console.log(string);
    console.log(total);
    console.log(totals);
    return totals;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    write?.();
    console.log("Successful");
  };

  const { config } = usePrepareContractWrite({
    address: reads?.[3],
    abi: launchpadContract.abi,
    functionName: "depositETH",
    args: [amount],
    overrides: { value: tryouts() },
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
    <div className="w-[40%] mx-auto p-[2rem] bg-[rgba(0,0,0,0.4)] rounded-lg border border-black">
      <p>Hello I'm the deposit page</p>
      <h1>Support this Awesome LaunchPad</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2 width-[40%]"
      >
        <label htmlFor="amount">Amount of NFTs: </label>
        <input
          className="text-black w-[60%]"
          type="text"
          id="amount"
          value={amount}
          placeholder="Enter Amount of NFTs to Purchase"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">
          {isLoading || loadWaitData ? "Submitting" : "SUBMIT"}
        </button>
      </form>
    </div>
  );
};

export default Deposit;
