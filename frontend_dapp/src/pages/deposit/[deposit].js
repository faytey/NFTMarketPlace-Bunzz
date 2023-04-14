import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ongoing } from "../launchpad";

const Deposit = () => {
  const { deposit } = useRouter().query;
  console.log(useRouter().query);
  const id = Number(deposit - 1);
  const info = ongoing[id];
  return <div>{info?.description}</div>;
};

export default Deposit;
