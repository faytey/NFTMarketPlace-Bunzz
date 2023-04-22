import { Suspense, memo, useEffect, useState } from "react";
import axios from "axios";
import NFTImageTemplate from "./NFTImageTemplate";

const ImageInfoTemplate = memo(({ tokenURI }) => {
  const [nftMetadata, setNftMetadata] = useState();

  const baseIpfs = "https://ipfs.io/ipfs/";

  async function getMetadata(uri) {
    var url = `${baseIpfs}${tokenURI?.slice(7)}`;
    var res = await axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setNftMetadata(res);
  }

  useEffect(() => {
    getMetadata(tokenURI);
  }, [nftMetadata]);

  return (
    <div>
      <div className="self-stretch relative rounded-t-xl rounded-b-none max-w-full overflow-hidden h-[295px] shrink-0 object-cover">
        {<NFTImageTemplate imageURL={nftMetadata?.image} /> ?? (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
});

export default ImageInfoTemplate;
ImageInfoTemplate.displayName = "ImageInfoTemplate";
