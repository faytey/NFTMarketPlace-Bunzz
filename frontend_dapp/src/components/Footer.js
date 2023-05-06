import { Inter } from "next/font/google";
import { useCallback } from "react";
import {
  BsGlobe2,
  BsDiscord,
  BsYoutube,
  BsTwitter,
  BsInstagram,
  BsPlus,
} from "react-icons/bs";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Footer() {
  const onDiscordLogoIconClick = useCallback(() => {
    window.open("https://www.discord.com");
  }, []);

  const onYoutubeLogoIconClick = useCallback(() => {
    window.open("https://www.youtube.com");
  }, []);

  const onTwitterLogoIconClick = useCallback(() => {
    window.open("https://www.twitter.com");
  }, []);

  const onMarketplaceTextClick = useCallback(() => {
    window.open("https://www.twitter.com");
  }, []);

  const onInstagramLogoIconClick = useCallback(() => {
    window.open("https://www.instagram.com");
  }, []);

  return (
    <div
      className="self-stretch mt-[2rem] md:mx-[1%] bg-background-secondary flex flex-col py-10 px-3 items-center justify-start gap-2 text-3xl font-h5-space-mono"
      style={{
        boxShadow: "2px -2px 5px 1px #ccc",
      }}
    >
      <div className="flex flex-col md:flex-row pl-[4rem] gap-4 items-start justify-between">
        <div className="w-full shrink-0 flex flex-col py-0 pr-3 pl-0 md:box-border items-start justify-start gap-2 text-base text-lightgray font-caption-work-sans">
          <Link href={"/"}>NIFT</Link>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="relative leading-[140%] inline-block w-full">
              NFT marketplace
            </div>
            <div className="flex flex-col items-start justify-start gap-[15px]">
              <div className="relative leading-[140%] inline-block w-full h-[18px] shrink-0">
                Join our community
              </div>
              <div className="flex flex-row items-start justify-start gap-1">
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
              </div>
            </div>
          </div>
        </div>
        <div className="w-full shrink-0 flex flex-col items-start justify-start gap-2">
          <b className="relative">Explore</b>
          <div className="flex flex-col items-start justify-start gap-2 text-base text-lightgray font-caption-work-sans">
            <div
              className="relative leading-[140%] cursor-pointer"
              onClick={onMarketplaceTextClick}
            >
              Marketplace
            </div>
            <div className="relative leading-[140%] cursor-pointer">
              Rankings
            </div>
            <div className="relative leading-[140%] cursor-pointer">
              Connect a wallet
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 text-xs text-lightgray font-caption-work-sans">
        <div className="self-stretch relative box-border h-px shrink-0 border-solid border-caption-label-text" />
        <div className="self-stretch relative leading-[110%]">
          Ⓒ Web3Bridge.
        </div>
      </div>
    </div>
  );
}
