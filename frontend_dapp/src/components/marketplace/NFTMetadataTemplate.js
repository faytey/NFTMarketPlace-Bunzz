import { memo, useEffect, useState } from "react";
import axios from "axios";
import NFTImageTemplate from "./NFTImageTemplate";


const NFTMetadataTemplate = memo(
  ({
    tokenURI,
  }) => {


    const [nftMetadata, setNftMetadata] = useState();

    const baseIpfs = "https://ipfs.io/ipfs/";


    async function getMetadata(uri) {
        var url = `${baseIpfs}${tokenURI?.slice(7)}`
        var res = await axios.get(url).then((res) => {return(res.data)})
        setNftMetadata(res)
    }

    useEffect(
        () => {
            getMetadata(tokenURI)
            console.log(nftMetadata)
        },
        [nftMetadata]
    )

    return (
      <div >
        <div >
          <NFTImageTemplate imageURL={nftMetadata?.image}/>
        </div>
        <div>
          {nftMetadata?.name}
        </div>
        <div>
          {
            nftMetadata?.attributes.map((item) => {
              return (
                <div>
                  <div>{item.trait_type}</div>
                  <div>{item.value}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
);

export default NFTMetadataTemplate;
