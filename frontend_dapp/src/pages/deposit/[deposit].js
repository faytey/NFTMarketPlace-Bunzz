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
  // console.log(useRouter().query);
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

  console.log(reads);

  const tryouts = () => {
    const string = prices / ethers.utils.parseEther("1");
    const total = string * amount;
    const totals = ethers.utils.parseEther(total) ?? "0";
    console.log(string);
    console.log(total);
    console.log(totals);
    return totals;
  };

  useEffect(() => {
    setPrice(string);
    console.log(price);
  }, [price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    write?.();
    alert("Successful");
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
    <div>
      <p>Hello I'm the deposit page</p>
      <h1>Support this Awesome LaunchPad</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount: </label>
        <input
          className="text-black"
          type="number"
          id="amount"
          value={amount}
          placeholder="Enter Amount to Deposit"
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
