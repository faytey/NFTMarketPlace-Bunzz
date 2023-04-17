import Link from "next/link";
import { memo } from "react";
import { erc721ABI, useContractReads } from "wagmi";
import NFTMetadataTemplate from "./NFTMetadataTemplate";
import ImageInfoTemplate from "./ImageInfoTemplate";
import ButtonTemplate from "./ButtonTemplate";
import { marketplaceContract } from "@/utils/contractInfo";
import { ethers } from "ethers";

const NFTDetailsTemplate1 = memo(
  ({
    contractAddress,
    tokenID,
  }) => {

    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                address: contractAddress,
                abi: erc721ABI,
                functionName: "name"
            },
            {
                address: contractAddress,
                abi: erc721ABI,
                functionName: "tokenURI",
                args: [tokenID]
            },
            {
                ...marketplaceContract,
                functionName: "marketItems",
                args: [tokenID]
            },
        ]
    })
    return (
      <div >

        <div
          className="flex-1 rounded-xl bg-[#1C1C1C] h-[469px] flex flex-col items-center justify-start cursor-pointer">
          <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start">
            {<ImageInfoTemplate tokenURI={data?.[1]} /> ?? <p>Loading...</p>}
          </div>
          <div className="self-stretch flex flex-col pt-5 px-[30px] pb-[25px] items-start justify-start gap-[25px]">
            <div className="flex justify-between w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
                <div className="self-stretch relative leading-[140%] capitalize font-semibold">
                  {data?.[0]}
                </div>
                <div className="self-stretch flex flex-row items-start justify-start gap-[12px] text-base font-h5-space-mono">
                  <div className="flex flex-row items-start justify-start">
                    <div className="relative w-6 h-6 shrink-0">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-101xl max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="assets/Avatar.png"
                      />
                    </div>
                  </div>
                  <div className="flex-1 relative leading-[140%]">Token ID: {tokenID}</div>
                </div>
              </div>
              <Link href={`/marketplace/${tokenID}`} className="border m-0 p-5 rounded-lg">Buy</Link>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start text-xs text-caption-label-text font-h5-space-mono">
              <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
                <div className="self-stretch relative leading-[110%]">
                  Price
                </div>
                <div className="self-stretch relative text-base leading-[140%] text-text">
                  {data?.[2].price.toString() / ethers.utils.parseEther("1")} ETH
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
);

export default NFTDetailsTemplate1;
