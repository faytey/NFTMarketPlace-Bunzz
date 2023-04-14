import { useCallback } from "react";
import ArtistInfo from "../components/profile/ArtistInfo";
import NFTContainer from "../components/profile/NFTContainer";
import { useRouter } from "next/router";

import {Tab} from '@headlessui/react'
import { useContractReads } from 'wagmi'
import { azukiContract, baycContract, marketplaceContract } from '@/utils/contractInfo'
import { Suspense, useEffect, useState } from 'react'
import MarketPlaceHeaderTemplate from '@/components/marketplace/MarketPlaceHeaderTemplate'
import NFTCollectionTemplate1 from '@/components/marketplace/NFTCollectionTemplate1'
import NFTDetailsTemplate1 from '@/components/marketplace/NFTDetailsTemplate1'




const ArtistPage = () => {


  const [artistInfo, setArtistInfo] = useState();

  const nftCollectionsAddress = ["0x85E302Eb913125C9c053257B0A2b878B89388013", "0xdcFe1dBeFE3d795176785a0c7cf0518AD7908429", "0x9c2f220a005a22C38AFc073eBa3390fbF579A0A5"];
  const nftTokenDetails = [{address: '0x85E302Eb913125C9c053257B0A2b878B89388013', tokenID: 5}, {address: '0xdcFe1dBeFE3d795176785a0c7cf0518AD7908429', tokenID: 8}, {address: "0x9c2f220a005a22C38AFc073eBa3390fbF579A0A5", tokenID: 1}];


  const onNFTCardContainerClick = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/DistantGalaxy.png", imageTitles:"Distant Galaxy" }
    });
  }, [router]);

  const onNFTCardContainer1Click = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/LifeEdena.png", imageTitles:"Life On Edena" }
    });
  }, [router]);

  const onNFTCardContainer2Click = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/AstroFiction.png", imageTitles: "AstroFiction"}
    });
  }, [router]);

  const onNFTCardContainer3Click = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/CryptoCity.png", imageTitles: "CryptoCity" }
    });
  }, [router]);

  const onNFTCardContainer4Click = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/ColorfulDog.png", imageTitles:"ColorfulDog" }
    });
  }, [router]);

  const onNFTCardContainer5Click = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/DistantGalaxy.png", imageTitles:"Distant Galaxy" }
    });
  }, [router]);

  const onNFTCardContainer6Click = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/DistantGalaxy.png", imageTitles:"Distant Galaxy" }
    });
  }, [router]);

  const onNFTCardContainer7Click = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/DistantGalaxy.png", imageTitles:"Distant Galaxy" }
    });
  }, [router]);

  const onNFTCardContainer8Click = useCallback(() => {
    router.push({
      pathname: "/nftdetail",
      query: { imageIds: "assets/DistantGalaxy.png", imageTitles:"Distant Galaxy" }
    });
  }, [router]);

  return (
    <div className="relative bg-background w-full flex flex-col items-start justify-start text-center text-3xl text-caption-label-text font-caption-work-sans">

      <div className="self-stretch flex flex-col items-center justify-start">
        <img
          className="self-stretch relative max-w-full overflow-hidden h-80 shrink-0 object-cover"
          alt=""
          src="assets/ImagePlaceHolder.png"
        />
        <div className="w-[1050px] flex flex-row items-start justify-start mt-[-70px]">
          <div className="rounded-xl flex flex-row items-start justify-start border-[2px] border-solid border-[#1C1C1C]">
            <div className="relative w-[120px] h-[120px] shrink-0">
              <img
                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                alt=""
                src="assets/Avatar.png"
              />
            </div>
          </div>
        </div>
      </div>
      <ArtistInfo />
      <div className="self-stretch bg-background flex flex-col items-center justify-start gap-[10px]">
        <div className="self-stretch relative box-border h-px shrink-0 border-t-[1px] border-solid border-background-secondary" />
        <div className="w-[1050px] flex flex-row items-start justify-start">
          <div className="flex-1 flex flex-row items-start justify-start">
            <div className="flex-1 box-border h-[60px] flex flex-row py-0 px-[30px] items-center justify-center gap-[16px] text-text border-b-[2px] border-solid border-caption-label-text">
              <div className="relative leading-[140%] capitalize font-semibold">
                Created
              </div>
              <div className="rounded-xl bg-caption-label-text flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base font-h5-space-mono">
                <div className="relative leading-[140%]">302</div>
              </div>
            </div>
            <div className="flex-1 h-[60px] flex flex-row py-0 px-[30px] box-border items-center justify-center gap-[16px]">
              <div className="relative leading-[140%] capitalize font-semibold">
                owned
              </div>
              <div className="rounded-xl bg-background-secondary flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base text-text font-h5-space-mono">
                <div className="relative leading-[140%]">67</div>
              </div>
            </div>
            <div className="flex-1 h-[60px] flex flex-row py-0 px-[30px] box-border items-center justify-center gap-[16px]">
              <div className="relative leading-[140%] capitalize font-semibold">
                Collection
              </div>
              <div className="rounded-xl bg-background-secondary flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base text-text font-h5-space-mono">
                <div className="relative leading-[140%]">4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch bg-background-secondary flex flex-col py-20 px-0 items-center justify-start gap-[30px]">
        <NFTContainer
          // imageIds="../../public/assets/DistantGalaxy.png"
          imageIds="assets/DistantGalaxy.png"
          imageIds2="assets/LifeEdena.png"
          imageIds3="assets/AstroFiction.png"
          imageTitles="Distant Galaxy"
          imageTitles2="Life On Edena"
          imageTitles3="AstroFiction"
          onNFTCardContainerClick={onNFTCardContainerClick}
          onNFTCardContainer1Click={onNFTCardContainer1Click}
          onNFTCardContainer2Click={onNFTCardContainer2Click}
        />
        <NFTContainer
          imageIds="assets/CryptoCity.png"
          imageIds2="assets/ColorfulDog.png"
          imageIds3="assets/SpaceTales.png"
          imageTitles="CryptoCity"
          imageTitles2="ColorfulDog 0524"
          imageTitles3="Space Tales"
          onNFTCardContainerClick={onNFTCardContainer3Click}
          onNFTCardContainer1Click={onNFTCardContainer4Click}
          onNFTCardContainer2Click={onNFTCardContainer5Click}
        />
        <NFTContainer
          imageIds="assets/CherryGirl.png"
          imageIds2="assets/DancingRobot.png"
          imageIds3="assets/IceCreamApe.png"
          imageTitles="Cherry Blossom Girl 037"
          imageTitles2="Dancing Robots 0987"
          imageTitles3="IceCream Ape "
          onNFTCardContainerClick={onNFTCardContainer6Click}
          onNFTCardContainer1Click={onNFTCardContainer7Click}
          onNFTCardContainer2Click={onNFTCardContainer8Click}
        />
      </div>

    </div>
  );
};

export default ArtistPage;
