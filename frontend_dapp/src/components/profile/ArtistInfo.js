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

const ArtistInfo = memo(({ address }) => {

  const handleClick = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="self-stretch bg-[#2B2B2B] w-full flex flex-col p-5 items-center justify-between text-3xl text-text font-h5 font-space-mono">
      <div className="w-full flex flex-col items-start justify-start">
        <div className="flex flex-col md:flex-row items-start justify-between w-full gap-8">
          <div className="w-full flex flex-col justify-between">
            <div className="relative text-2xl m-0 p-5 leading-[110%] capitalize font-semibold font-caption-work-sans flex items-center">
              Animakid
            </div>
            <div className="rounded-xl flex flex-row w-full justify-between gap-5 text-4xl p-3">
              <div className="rounded-xl flex flex-col items-start justify-start">
                <b className="self-stretch relative leading-[140%] capitalize">
                  250k+
                </b>
                <div className="self-stretch relative text-3xl leading-[160%] capitalize">
                  Volume
                </div>
              </div>
              <div className="rounded-xl flex flex-col items-start justify-start">
                <b className="self-stretch relative leading-[140%] capitalize">
                  50+
                </b>
                <div className="self-stretch relative text-3xl leading-[160%] capitalize">
                  NFTs Sold
                </div>
              </div>
              <div className="rounded-xl flex flex-col items-start justify-start">
                <b className="self-stretch relative leading-[140%] capitalize">
                  3000+
                </b>
                <div className="self-stretch relative text-3xl leading-[160%] capitalize">
                  Followers
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col text-left m-0 p-5 items-start justify-start gap-2 text-caption-label-text">
              <b className="self-stretch relative leading-[160%] capitalize">
                Bio
              </b>
              <div className="self-stretch relative leading-[160%] capitalize font-caption-work-sans text-text">
                The internet&apos;s friendliest designer kid.
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start justify-end gap-4 text-center text-base">
            <div className="rounded-xl bg-[#A259FF] w-[186px] h-[60px] shrink-0 flex flex-row py-0 px-[50px] box-border items-center justify-center gap-[12px]">
              <BiCopy
                onClick={handleClick}
                className="relative w-5 h-5 shrink-0 hover:cursor-pointer active:translate-y-1"
              />
              <div className="relative leading-[140%] font-semibold">
                {address ? (
                  address?.slice(0, 6) + "..." + address?.slice(-6)
                ) : (
                  <p>Connect</p>
                )}
              </div>
            </div>
            <div className="rounded-xl box-border h-[60px] flex flex-row py-0 px-[30px] items-center justify-center gap-3 border-[2px] border-solid border-[#A259FF]">
              <BsPlus className="relative w-5 h-5 shrink-0" />
              <div className="relative leading-[140%] font-semibold">
                Follow
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ArtistInfo;
ArtistInfo.displayName = "ArtistInfo";
