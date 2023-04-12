import { useCallback } from "react";
import Header from "../components/header";
import AnimakidContainer from "../components/animakid-container";
import NFTContainer from "../components/n-f-t-container";
import FooterContainer from "../components/footer-container";

const ArtistPageDesktop = () => {
  const onNFTCardContainerClick = useCallback(() => {
    // Please sync "NFT Page (Desktop)" to the project
  }, []);

  const onNFTCardContainer1Click = useCallback(() => {
    // Please sync "NFT Page (Desktop)" to the project
  }, []);

  const onNFTCardContainer2Click = useCallback(() => {
    // Please sync "NFT Page (Desktop)" to the project
  }, []);

  const onNFTCardContainer3Click = useCallback(() => {
    // Please sync "NFT Page (Desktop)" to the project
  }, []);

  const onNFTCardContainer4Click = useCallback(() => {
    // Please sync "NFT Page (Desktop)" to the project
  }, []);

  const onNFTCardContainer5Click = useCallback(() => {
    // Please sync "NFT Page (Desktop)" to the project
  }, []);

  const onNFTCardContainer6Click = useCallback(() => {
    // Please sync "NFT Page (Desktop)" to the project
  }, []);

  const onNFTCardContainer7Click = useCallback(() => {
    // Please sync "NFT Page (Desktop)" to the project
  }, []);

  const onNFTCardContainer8Click = useCallback(() => {
    // Please sync "NFT Page (Desktop)" to the project
  }, []);

  return (
    <div className="relative bg-background w-full flex flex-col items-start justify-start text-center text-3xl text-caption-label-text font-caption-work-sans">
      <Header />
      <div className="self-stretch flex flex-col items-center justify-start">
        <img
          className="self-stretch relative max-w-full overflow-hidden h-80 shrink-0 object-cover"
          alt=""
          src="/image-placeholder@2x.png"
        />
        <div className="w-[1050px] flex flex-row items-start justify-start mt-[-70px]">
          <div className="rounded-xl flex flex-row items-start justify-start border-[2px] border-solid border-background">
            <div className="relative w-[120px] h-[120px] shrink-0">
              <img
                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                alt=""
                src="/avatar-placeholder@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
      <AnimakidContainer />
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
          imageIds="/image-placeholder1@2x.png"
          imageTitles="Distant Galaxy"
          imageDescriptions="/image-placeholder2@2x.png"
          imageTitles2="Life On Edena"
          imageIds2="/image-placeholder3@2x.png"
          imageGenres="AstroFiction"
          onNFTCardContainerClick={onNFTCardContainerClick}
          onNFTCardContainer1Click={onNFTCardContainer1Click}
          onNFTCardContainer2Click={onNFTCardContainer2Click}
        />
        <NFTContainer
          imageIds="/image-placeholder4@2x.png"
          imageTitles="CryptoCity"
          imageDescriptions="/image-placeholder5@2x.png"
          imageTitles2="ColorfulDog 0524"
          imageIds2="/image-placeholder6@2x.png"
          imageGenres="Space Tales"
          onNFTCardContainerClick={onNFTCardContainer3Click}
          onNFTCardContainer1Click={onNFTCardContainer4Click}
          onNFTCardContainer2Click={onNFTCardContainer5Click}
        />
        <NFTContainer
          imageIds="/image-placeholder7@2x.png"
          imageTitles="Cherry Blossom Girl 037"
          imageDescriptions="/image-placeholder8@2x.png"
          imageTitles2="Dancing Robots 0987"
          imageIds2="/image-placeholder9@2x.png"
          imageGenres="IceCream Ape "
          onNFTCardContainerClick={onNFTCardContainer6Click}
          onNFTCardContainer1Click={onNFTCardContainer7Click}
          onNFTCardContainer2Click={onNFTCardContainer8Click}
        />
      </div>
      <FooterContainer />
    </div>
  );
};

export default ArtistPageDesktop;
