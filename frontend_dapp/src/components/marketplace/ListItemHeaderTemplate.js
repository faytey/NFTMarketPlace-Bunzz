import { memo, useCallback } from "react";
import {
  BsGlobe2,
  BsDiscord,
  BsYoutube,
  BsTwitter,
  BsInstagram,
  BsPlus,
} from "react-icons/bs";
import { BiCopy } from "react-icons/bi";

const ListItemHeaderTemplate = memo(({}) => {
  return (
    <div className="flex flex-col p-5 items-center font-h5-space-mono">
      <div className="shrink-0 flex flex-col  gap-3">
        <div className="rounded-xl flex flex-col items-start text-5xl">
          <b className="relative capitalize">
            The Best NFT Experience
          </b>
        </div>
        <div className="flex flex-col items-start justify-start gap-1 text-caption-label-text">
          <div className="relative capitalize font-caption-work-sans text-text">
            Reach millions of users around the world and display your NFT
          </div>
        </div>
      </div>
    </div>
  );
});

export default ListItemHeaderTemplate;
ListItemHeaderTemplate.displayName = "ListItemHeaderTemplate";
