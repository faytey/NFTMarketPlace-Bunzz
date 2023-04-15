import Link from "next/link";
import { memo } from "react";
import { erc721ABI, useContractReads } from "wagmi";
import ImageInfoTemplate from "./ImageInfoTemplate";

const NFTCollectionTemplate1 = memo(
  ({
    contractAddress
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
                functionName: "symbol"
            },
            {
                address: contractAddress,
                abi: erc721ABI,
                functionName: "totalSupply"
            },
            {
                address: contractAddress,
                abi: erc721ABI,
                functionName: "tokenURI",
                args: [1],
            },
        ]
    })
    return (
      // <div className="w-[1050px] flex flex-row items-start justify-start gap-[30px] text-left text-3xl text-text font-sans">
      <div >

        <Link
          className="flex-1 rounded-xl bg-[#1C1C1C] h-[469px] flex flex-col items-center justify-start cursor-pointer"
          href={`/marketplace/${contractAddress}`}
        >
          <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start">
            {<ImageInfoTemplate tokenURI={data?.[3]} /> ?? <p>Loading...</p>}
          </div>
          <div className="self-stretch flex flex-col pt-5 px-[30px] pb-[25px] items-start justify-start gap-[25px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
              <div className="self-stretch relative leading-[140%] capitalize font-semibold">
                {data?.[0] ?? <p>Loading...</p>}
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
                <div className="flex-1 relative leading-[140%]">Token Supply: {data?.[2]?.toString() ?? <p></p>}</div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start text-xs text-caption-label-text font-h5-space-mono">
              <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
                <div className="self-stretch relative leading-[110%]">
                  Price
                </div>
                <div className="self-stretch relative text-base leading-[140%] text-text">
                  {"..."} ETH
                </div>
              </div>
              <div className="flex-1 flex flex-col items-end justify-center gap-[8px] text-right">
                <div className="self-stretch relative leading-[110%]">
                  Highest Bid
                </div>
                <div className="self-stretch relative text-base leading-[140%] text-text">
                  {"..."} wETH
                </div>
              </div>
            </div>
          </div>
        </Link>

      </div>
    );
  }
);

export default NFTCollectionTemplate1;
