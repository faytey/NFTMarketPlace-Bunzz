import React from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

const CopyButton = ({ arg }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(arg);
  };
  return (
    <span>
      <Image
        onClick={handleClick}
        src="/copy.svg"
        alt="copy image"
        width={24}
        height={24}
        className="hover:cursor-pointer active:translate-y-1 shadow-md shadow-slate-700"
      />
    </span>
  );
};

export default CopyButton;
