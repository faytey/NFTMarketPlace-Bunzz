import Link from "next/link";
import { memo } from "react";

const NFTDetailsTemplate = memo(
  ({ NFTImage, NFTName, NFTAuthor, NFTPrice, HighestBid, ButtonLink }) => {
    return (
      // <div className="w-[1050px] flex flex-row items-start justify-start gap-[30px] text-left text-3xl text-text font-caption-work-sans">
      <div>
        <Link
          className="flex-1 rounded-xl bg-[#1C1C1C] h-[469px] flex flex-col items-center justify-start cursor-pointer"
          href={ButtonLink}
        >
          <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start">
            <img
              className="self-stretch relative rounded-t-xl rounded-b-none max-w-full overflow-hidden h-[295px] shrink-0 object-cover"
              alt=""
              src={NFTImage}
            />
          </div>
          <div className="self-stretch flex flex-col pt-5 px-[30px] pb-[25px] items-start justify-start gap-[25px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
              <div className="self-stretch relative leading-[140%] capitalize font-semibold">
                {NFTName}
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
                <div className="flex-1 relative leading-[140%]">
                  {NFTAuthor}
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start text-xs text-caption-label-text font-h5-space-mono">
              <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
                <div className="self-stretch relative leading-[110%]">
                  Price
                </div>
                <div className="self-stretch relative text-base leading-[140%] text-text">
                  {NFTPrice} ETH
                </div>
              </div>
              <div className="flex-1 flex flex-col items-end justify-center gap-[8px] text-right">
                <div className="self-stretch relative leading-[110%]">
                  Highest Bid
                </div>
                <div className="self-stretch relative text-base leading-[140%] text-text">
                  {HighestBid} wETH
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
);

export default NFTDetailsTemplate;
NFTDetailsTemplate.displayName = "NFTDetailsTemplate";
