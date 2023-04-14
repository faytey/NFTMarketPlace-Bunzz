import { launchpadFactory } from "@/utils/contractInfo";
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

  return <div>{info?.description}</div>;
};

export default Deposit;
