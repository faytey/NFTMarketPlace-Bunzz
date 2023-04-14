import { useCallback } from "react";
import { useRouter } from "next/router";
import NFTSpecs from "@/components/nftdetailing/NFTSpecs";
import NFTImage from "@/components/nftdetailing/NFTImage";

const NFTDetail = () => {
  const router = useRouter();
  const { imageIds, imageTitles } = router.query;

  const onNavLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);


  const onButtonContainer1Click = useCallback(() => {
    window.open(
      "https://www.animaapp.com/?utm_source=figma-samples&utm_campaign=figma-nftmarket&utm_medium=figma-samples"
    );
  }, []);

  return (
    <div className="relative bg-background w-full h-[1125px] flex flex-col items-start justify-start text-left text-base text-text font-h3-work-sans">
      <div className="self-stretch bg-background flex flex-row items-center justify-start gap-[60px] text-32xl pl-14">
        <NFTImage />
        <NFTSpecs />
      </div>
      <div className="self-stretch bg-background-secondary flex flex-col py-10 px-[195px] items-center justify-start gap-[30px] text-3xl font-caption-space-mono">
      </div>
    </div>
  );
};

export default NFTDetail;
