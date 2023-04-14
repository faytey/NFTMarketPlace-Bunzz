import { launchpadContract, launchpadFactory } from "@/utils/contractInfo";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const Deposit = () => {
  const { deposit } = useRouter().query;
  console.log(useRouter().query);
  const id = Number(deposit - 1);

  const { address } = useAccount();

  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    write?.();
    alert("Successful");
  };
  const { config } = usePrepareContractWrite({
    address: launchpadContract.address,
    abi: launchpadContract.abi,
    functionName: "depositETH",
    args: [amount],
    overrides: { value: ethers.utils.parseEther(price) * amount },
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
