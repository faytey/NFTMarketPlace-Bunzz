import { memo, useEffect, useState } from "react";
import axios from "axios";

const NFTMetadataTemplate = memo(({ tokenURI }) => {
  const [tokenMetadata, setTokenMetadata] = useState();
  const [nftImgUrl, setNftImgUrl] = useState();

  const baseIpfs = "https://ipfs.io/ipfs/";

  async function getMetadata(tokenURI) {
    var metadataurl = `${baseIpfs}${tokenURI?.slice(7)}`;
    var res = await axios.get(metadataurl).then((res) => {
      return res.data;
    });
    setTokenMetadata(res);
    var imgURI = tokenMetadata?.image;
    var imgurl = `${baseIpfs}${imgURI?.slice(7)}`;
    setNftImgUrl(imgurl);
  }

  useEffect(() => {
    getMetadata(tokenURI);
  }, [tokenMetadata, tokenURI]);

  return (
    <div className="relative bg-background w-full h-[1125px] flex flex-col items-start justify-start text-left text-base text-text font-h3-work-sans">
      <div className="self-stretch bg-background flex items-center justify-start gap-[60px] text-32xl pl-14">
        <div>{<img src={nftImgUrl} /> ?? <p>Loading...</p>}</div>
        <div>
          {tokenMetadata?.attributes.map((item) => {
            return (
              <div
                key={item}
                className="flex w-full justify-between gap-16 m-0 p-3 place-items-center"
              >
                <div className="text-2xl font-bold text-right">
                  {item.trait_type ?? <p>Loading...</p>}:
                </div>
                <div className="text-left font-bold">
                  {item.value ?? <p>Loading...</p>}
                </div>
              </div>
            );
          })}
          <button
            className="font-2xl text-center w-full border rounded-lg m-0 p-2"
            onClick={() => {
              e.preventDefault();
              write?.();
            }}
          >
            Buy
          </button>
        </div>
      </div>
      <div className="self-stretch bg-background-secondary flex flex-col py-10 px-[195px] items-center justify-start gap-[30px] text-3xl font-caption-space-mono"></div>
    </div>
  );
});

export default NFTMetadataTemplate;
NFTMetadataTemplate.displayName = "NFTMetadataTemplate";
