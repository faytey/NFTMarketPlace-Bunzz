import { memo, useState, useEffect } from "react";
import { erc721ABI, useContractRead } from "wagmi";
import axios from "axios";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const NFTContainer = memo(({ marketItem }) => {
  const [tokenMetadata, setTokenMetadata] = useState();
  const [nftImgUrl, setNftImgUrl] = useState();

  const {
    data: tokenURI,
    isError: tokenUriError,
    isLoading: tokenUriIsLoading,
  } = useContractRead({
    address: marketItem.nftContract,
    abi: erc721ABI,
    functionName: "tokenURI",
    args: [marketItem.tokenId],
  });

  const { data: name } = useContractRead({
    address: marketItem.nftContract,
    abi: erc721ABI,
    functionName: "name",
  });

  const baseIpfs = "https://ipfs.io/ipfs/";

  async function getMetadata(tokenURI) {
    var metadataurl = `${baseIpfs}${tokenURI?.slice(7)}`;
    var res = await axios
      .get(metadataurl)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setTokenMetadata(res);
    var imgURI = tokenMetadata?.image;
    var imgurl = `${baseIpfs}${imgURI?.slice(7)}`;
    setNftImgUrl(imgurl);
  }

  useEffect(() => {
    getMetadata(tokenURI);
    console.log(tokenMetadata);
    console.log(nftImgUrl);
    console.log(tokenURI);
  }, [tokenMetadata, tokenURI]);

  console.log("token:", tokenMetadata);

  const router = useRouter();

  const onNFTCardContainerClick = useCallback(() => {
    router.push({
      pathname: `/marketplace/${marketItem.itemId.toString()}`,
    });
  }, [router]);

  return (
    <div className="items-start justify-start max-w-full m-auto gap-3 text-left text-3xl font-sans">
      <div
        className="flex-1 rounded-xl bg-[#1C1C1C] h-[469px] flex flex-col items-center justify-start cursor-pointer"
        onClick={onNFTCardContainerClick}
      >
        <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start">
          <img
            className="self-stretch relative rounded-t-xl rounded-b-none max-w-full overflow-hidden h-[295px] shrink-0 object-cover"
            alt=""
            src={nftImgUrl ?? "assets/Avatar.png"}
          />
        </div>
        <div className="self-stretch flex flex-col pt-5 px-[30px] pb-[25px] items-start justify-start gap-[25px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
            <div className="self-stretch relative leading-[140%] capitalize font-semibold">
              {name ?? <p>Loading...</p>}
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[12px] text-base font-h5-space-mono">
              <div className="flex flex-row items-start justify-start">
                <div className="relative w-6 h-6 shrink-0">
                  <img
                    className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-101xl max-w-full overflow-hidden max-h-full object-cover"
                    alt=""
                    src="assets/Avatar.png"
                  />
                </div>
              </div>
              <div className="flex-1 relative leading-[140%]">Animakid</div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start text-xs text-caption-label-text font-h5-space-mono">
            <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
              <div className="self-stretch relative text-gray-400 leading-[110%]">
                Price
              </div>
              <div className="self-stretch relative text-xl leading-[140%]">
                {marketItem?.price.toString() /
                  ethers.utils.parseEther("1") ?? <p>Loading...</p>}{" "}
                ETH
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NFTContainer;
NFTContainer.displayName = "NFTContainer";
