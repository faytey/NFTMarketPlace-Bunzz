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
      className="self-stretch mt-[2rem] md:mx-[1%] bg-background-secondary flex flex-col py-10 px-[195px] items-center justify-start gap-[30px] text-3xl font-h5-space-mono"
      style={{
        boxShadow: "2px -2px 5px 1px #ccc",
      }}
    >
      <div className="flex flex-col md:flex-row pl-[4rem] gap-4 items-start justify-between">
        <div className="w-[327.41px] shrink-0 flex flex-col py-0 pr-[84px] pl-0 md:box-border items-start justify-start gap-[30px] text-base text-lightgray font-caption-work-sans">
          <Link href={"/"}>BUNZZ</Link>
          <div className="flex flex-col items-start justify-start gap-[20px]">
            <div className="relative leading-[140%] inline-block w-[238px]">
              NFT marketplace
            </div>
            <div className="flex flex-col items-start justify-start gap-[15px]">
              <div className="relative leading-[140%] inline-block w-[238px] h-[18px] shrink-0">
                Join our community
              </div>
              <div className="flex flex-row items-start justify-start gap-[10px]">
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
        <div className="w-60 shrink-0 flex flex-col items-start justify-start gap-[25px]">
          <b className="relative leading-[160%] capitalize">Explore</b>
          <div className="flex flex-col items-start justify-start gap-[20px] text-base text-lightgray font-caption-work-sans">
            <div
              className="relative leading-[140%] cursor-pointer"
              onClick={onMarketplaceTextClick}
            >
              Marketplace
            </div>
            <div
              className="relative leading-[140%] cursor-pointer"
              //onClick={onRankingsTextClick}
            >
              Rankings
            </div>
            <div
              className="relative leading-[140%] cursor-pointer"
              //onClick={onConnectAWallet1Click}
            >
              Connect a wallet
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col items-start justify-start gap-[25px]">
          <b className="relative leading-[160%] capitalize">
            Join our weekly digest
          </b>
          <div className="flex flex-col items-start justify-start gap-[20px] text-base text-lightgray font-caption-work-sans">
            <div className="relative leading-[140%] inline-block w-[330px]">{`Get exclusive promotions & updates straight to your inbox.`}</div>
            <div className="rounded-xl bg-text w-[420px] h-[60px] shrink-0 flex flex-row py-4 pr-0 pl-5 box-border items-center justify-start gap-[12px] text-background">
              <div className="flex-1 relative leading-[140%]">
                Enter your email here
              </div>
              <div
                className="rounded-xl bg-call-to-action h-[60px] flex flex-row py-0 px-[50px] box-border items-center justify-end gap-[12px] cursor-pointer text-center text-text"
                //onClick={onButtonContainer5Click}
              >
                <img
                  className="relative w-5 h-5 shrink-0 hidden"
                  alt=""
                  src="/envelopesimple1.svg"
                />
                <div className="relative leading-[140%] font-semibold">
                  Subscribe
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
<<<<<<< HEAD
      <div className=" flex flex-col items-start justify-start gap-[20px] text-xs text-lightgray font-caption-work-sans">
=======
      <div className="flex flex-col items-start justify-start gap-[20px] text-xs text-lightgray font-caption-work-sans">
>>>>>>> 3415548c8b9f2d13dcfa7d5a081c3f220aadbdff
        <div className="self-stretch relative box-border h-px shrink-0 border-solid border-caption-label-text" />
        <div className="self-stretch relative leading-[110%]">
          Ⓒ Web3Bridge.
        </div>
      </div>
    </div>
  );
}
