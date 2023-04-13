import { Suspense, memo, useEffect, useState } from "react";


const NFTImageTemplate = memo(
  ({
    imageURL,
  }) => {


    const [nftImageURL, setNftImageURL] = useState();

    const baseIpfs = "https://ipfs.io/ipfs/";


    async function getImageURL(imageURL) {
        var url = `${baseIpfs}${imageURL?.slice(7)}`
        setNftImageURL(url)
    }

    useEffect(
        () => {

            setTimeout(
                () => {
                    getImageURL(imageURL)
                    console.log(nftImageURL)
                },
                (8000)
            )
        },
        [nftImageURL]
    )

    return (
      <div >
        <Suspense fallback={<p>Loading...</p>}>
        <img src={nftImageURL ?? 'assets/DistantGalaxy.png'} />
        </Suspense>
      </div>
    );
  }
);

export default NFTImageTemplate;
