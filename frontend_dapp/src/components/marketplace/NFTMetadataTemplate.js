import { memo, useEffect, useState } from "react";
import axios from "axios";
import NFTImageTemplate from "./NFTImageTemplate";


const NFTMetadataTemplate = memo(
  ({
    tokenURI,
  }) => {


    // const [nftMetadata, setNftMetadata] = useState();

    // const baseIpfs = "https://ipfs.io/ipfs/";


    // async function getMetadata(uri) {
    //     var url = `${baseIpfs}${tokenURI?.slice(7)}`
    //     var res = await axios.get(url).then((res) => {return(res.data)})
    //     setNftMetadata(res)
    // }

    // useEffect(
    //     () => {
    //         getMetadata(tokenURI)
    //         console.log(nftMetadata)
    //     },
    //     [nftMetadata]
    // )



    const [tokenMetadata, setTokenMetadata] = useState();
    const [nftImgUrl, setNftImgUrl] = useState();

    const baseIpfs = "https://ipfs.io/ipfs/";

    async function getMetadata(tokenURI) {
        var metadataurl = `${baseIpfs}${tokenURI?.slice(7)}`
        var res = await axios.get(metadataurl).then((res) => {return(res.data)})
        setTokenMetadata(res)
        var imgURI = tokenMetadata?.image
        var imgurl = `${baseIpfs}${imgURI?.slice(7)}`
        setNftImgUrl(imgurl)
    }

    useEffect(
      () => {
        getMetadata(tokenURI);
        console.log(tokenMetadata)
        console.log(nftImgUrl)
        console.log(tokenURI)
      },
      [tokenMetadata, tokenURI]
    )


    return (
      <div className="flex" >
        <div >
          {<img src={nftImgUrl} /> ?? <p>Loading...</p>}
        </div>
        <div>
          <div>
            {tokenMetadata?.name ?? <p>Loading...</p>}
          </div>
          <div>
            {
              tokenMetadata?.attributes.map((item) => {
                return (
                  <div>
                    <div>{item.trait_type ?? <p>Loading...</p>}</div>
                    <div>{item.value ?? <p>Loading...</p>}</div>
                    <p>1</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
);

export default NFTMetadataTemplate;
