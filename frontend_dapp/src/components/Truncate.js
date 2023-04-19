import React from "react";
import CopyButton from "./CopyButton";

export const Truncate = ({ string }) => {
  const firstPart = string?.slice(0, 6);
  const lastPart = string?.slice(-6);
  const joined = `${firstPart}.....${lastPart}`;
  if (string.length > 10) {
    return (
      <div>
        <span>{joined}</span>
      </div>
    );
  } else {
    return (
      <div>
        <span>{string}</span>
      </div>
    );
  }
};
