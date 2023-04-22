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
  // const onGlobeIconClick = useCallback(() => {
  //   window.open("https://www.google.com");
  // }, []);

  // const onDiscordLogoIconClick = useCallback(() => {
  //   window.open("https://www.discord.com");
  // }, []);

  // const onYoutubeLogoIconClick = useCallback(() => {
  //   window.open("https://www.youtube.com");
  // }, []);

  // const onTwitterLogoIconClick = useCallback(() => {
  //   window.open("https://www.twitter.com");
  // }, []);

  // const onInstagramLogoIconClick = useCallback(() => {
  //   window.open("https://www.instagram.com");
  // }, []);

  const handleClick = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="self-stretch bg-[#2B2B2B] w-3/4 flex flex-col py-10 px-0 items-center justify-start text-left text-3xl text-text font-h5 font-space-mono">
      <div className="w-screen flex flex-col items-start justify-start">
        <div className="flex flex-col md:flex-row items-start justify-start gap-2">
          <div className="w-screen shrink-0 flex flex-col items-start justify-start gap-6">
            <div className="relative text-2xl leading-[110%] capitalize font-semibold font-caption-work-sans flex items-center w-auto">
              Animakid
            </div>
            <div className="rounded-xl flex flex-row items-start justify-start gap-4 text-5xl px-4">
              <div className="flex-1 rounded-xl flex flex-col items-start justify-start">
                <b className="self-stretch relative leading-[140%] capitalize">
                  250k+
                </b>
                <div className="self-stretch relative text-3xl leading-[160%] capitalize">
                  Volume
                </div>
              </div>
              <div className="flex-1 rounded-xl flex flex-col items-start justify-start">
                <b className="self-stretch relative leading-[140%] capitalize">
                  50+
                </b>
                <div className="self-stretch relative text-3xl leading-[160%] capitalize">
                  NFTs Sold
                </div>
              </div>
              <div className="flex-1 rounded-xl flex flex-col items-start justify-start">
                <b className="self-stretch relative leading-[140%] capitalize">
                  3000+
                </b>
                <div className="self-stretch relative text-3xl leading-[160%] capitalize">
                  Followers
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-2 text-caption-label-text">
              <b className="self-stretch relative leading-[160%] capitalize">
                Bio
              </b>
              <div className="self-stretch relative leading-[160%] capitalize font-caption-work-sans text-text">
                The internet&apos;s friendliest designer kid.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-2 text-caption-label-text">
              <b className="relative leading-[160%] capitalize">Links</b>
              {/* <div className="flex flex-row items-start justify-start gap-2">
                <BsGlobe2
                  className="relative w-8 h-8 shrink-0 cursor-pointer"
                  onClick={onGlobeIconClick}
                />
                <BsDiscord
                  className="relative w-8 h-8 shrink-0 cursor-pointer"
                  onClick={onDiscordLogoIconClick}
                />
                <BsYoutube
                  className="relative w-8 h-8 shrink-0 cursor-pointer"
                  onClick={onYoutubeLogoIconClick}
                />
                <BsTwitter
                  className="relative w-8 h-8 shrink-0 cursor-pointer"
                  onClick={onTwitterLogoIconClick}
                />
                <BsInstagram
                  className="relative w-8 h-8 shrink-0 cursor-pointer"
                  onClick={onInstagramLogoIconClick}
                />
              </div> */}
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
