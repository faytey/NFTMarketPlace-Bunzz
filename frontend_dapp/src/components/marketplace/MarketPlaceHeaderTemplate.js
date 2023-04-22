import { memo } from "react";
import ButtonTemplate from "./ButtonTemplate";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

const MarketPlaceHeaderTemplate = memo(() => {
  return (
    <div className="m-0 p-8">
      <div className=" shrink-0 flex flex-col items-start justify-start gap-[30px]">
        <div className="rounded-xl flex flex-row items-start justify-start gap-[30px] text-4xl md:text-8xl">
          <div className="flex-1 rounded-xl flex flex-col items-start justify-start">
            <b className="md:self-stretch relative leading-[140%]">
              Browse <span className="text-[#A259FF]">Marketplace</span>
            </b>
            <div className="self-stretch relative text-lg leading-[140%] font-caption-work-sans">
              Browse through more than 50k NFTs on the NFT Marketplace.
            </div>
          </div>
        </div>
        <div className="flex">
          <BiSearch className="absolute place-self-center pl-3" size={30} />
          <input
            placeholder="Search your favourite NFTs"
            className="border relative rounded-full p-3 pl-8 placeholder:text-white bg-[#A259FF] bg-opacity-30 w-full"
          />
        </div>

        <div className="flex w-full items-center justify-center text-3xl gap-16">
          <Link
            className="relative font-semibold border-b-2 border-[#A259FF]"
            href={"/marketplace/listitem"}
          >
            List Item
          </Link>
          <Link
            className="relative font-semibold border-b-2 border-[#A259FF]"
            href={"/launchpad"}
          >
            Create LauchPad
          </Link>
        </div>
      </div>
    </div>
  );
});

export default MarketPlaceHeaderTemplate;
MarketPlaceHeaderTemplate.displayName = "MarketPlaceHeaderTemplate";
