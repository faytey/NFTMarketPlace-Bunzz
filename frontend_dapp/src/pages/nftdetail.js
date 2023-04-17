import { useCallback } from "react";
import { useRouter } from "next/router";
import NFTSpecs from "@/components/nftdetailing/NFTSpecs";
import NFTImage from "@/components/nftdetailing/NFTImage";
import { erc721ABI, useContractRead } from "wagmi";

const NFTDetail = () => {
  const router = useRouter();
  const { object, item, id } = router.query;

  const { data: tokenURI, isError: tokenUriError, isLoading: tokenUriIsLoading } = useContractRead({
    address: item,
    abi: erc721ABI,
    functionName: 'tokenURI',
    args: [id]
  })


  const onNavLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);


  const onButtonContainer1Click = useCallback(() => {
    window.open(
      "https://www.animaapp.com/?utm_source=figma-samples&utm_campaign=figma-nftmarket&utm_medium=figma-samples"
    );
  }, []);

  return (
    <div className="relative w-full h-[1125px] flex flex-col items-start justify-start text-left text-base font-sans">
      <div className="self-stretch flex flex-row items-center justify-start space-x-20 text-32xl pl-14">

        <NFTSpecs tokenURI ={tokenURI} object={object} />
      </div>
    </div>
  );
};

export default NFTDetail;
