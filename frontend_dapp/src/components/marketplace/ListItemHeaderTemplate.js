import { memo, useCallback } from "react";
import { BsGlobe2, BsDiscord, BsYoutube, BsTwitter, BsInstagram, BsPlus } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";

const ListItemHeaderTemplate = memo((
  {

  }
) => {
  

  return (
    <div className="self-stretch bg-background flex flex-col py-10 px-0 items-center text-2xl font-h5-space-mono">
      <div className="flex flex-row gap-[100px]">
        <div className="shrink-0 flex flex-col  gap-[30px]">
            <div className="flex-1 rounded-xl flex flex-col items-start text-7xl">
              <b className="self-stretch relative leading-[140%] capitalize">
                The Best NFT Experience
              </b>
            </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-caption-label-text">
            <div className="self-stretch relative leading-[100%] capitalize font-caption-work-sans text-text">
              Reach millions of users around the world and display your NFT
            </div>
          </div>
        </div>
      </div>
   </div>
  );
});

export default ListItemHeaderTemplate;
