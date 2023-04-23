import { Suspense, memo, useEffect, useState } from "react";

const NFTImageTemplate = memo(({ imageURL }) => {
  const [nftImageURL, setNftImageURL] = useState();

  const baseIpfs = "https://ipfs.io/ipfs/";

  async function getImageURL(imageURL) {
    var url = `${baseIpfs}${imageURL?.slice(7)}`;
    setNftImageURL(url);
  }

  useEffect(() => {
    getImageURL(imageURL);
    console.log(nftImageURL);
  }, [nftImageURL]);

  return (
    <div>
      <div>
        {<img src={nftImageURL ?? "assets/DistantGalaxy.png"} /> ?? (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
});

export default NFTImageTemplate;
NFTImageTemplate.displayName = "NFTImageTemplate";
