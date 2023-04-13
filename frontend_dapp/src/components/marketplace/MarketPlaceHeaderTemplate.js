import { memo } from "react";
import ButtonTemplate from "./ButtonTemplate";

const MarketPlaceHeaderTemplate = memo(() => {

  return (
    <div>
          <div className=" shrink-0 flex flex-col items-start justify-start gap-[30px]">
            <div className="rounded-xl flex flex-row items-start justify-start gap-[30px] text-8xl">
              <div className="flex-1 rounded-xl flex flex-col items-start justify-start">
                <b className="self-stretch relative leading-[140%]">
                    Browse Marketplace
                </b>
                <div className="self-stretch relative text-lg leading-[140%] font-caption-work-sans">
                    Browse through more than 50k NFTs on the NFT Marketplace.
                </div>
              </div>
            </div>
            <input placeholder='Search your favourite NFTs' className='border rounded-lg p-2 text-black w-full' />
            <div className="flex justify-between w-full">
              <ButtonTemplate ButtonName="List Item" ButtonLink={"/marketplace/listitem"}/>
              <ButtonTemplate ButtonName="Create LauchPad" ButtonLink={"/launchpad"}/>
            </div>
          </div>
    </div>
  );
});

export default MarketPlaceHeaderTemplate;
