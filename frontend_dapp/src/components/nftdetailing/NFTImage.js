import React, { memo, useState } from 'react'

const NFTImage = memo(
  ({
    imageURI,
  }) => {

    const [nftImgUrl, setNftImgUrl] = useState();

    const baseIpfs = "https://ipfs.io/ipfs/";

    async function getImgUrl(imageURI) {
        var url = `${baseIpfs}${imageURI?.slice(7)}`
        setNftImgUrl(url)
    }

    useState(
      () => {
        getImgUrl(imageURI);
      },
      [nftImgUrl]
    )


  return (
    <div>
        <img
        className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover rounded-lg"
        alt=""
        src={ nftImgUrl ?? "assets/CherryGirl.png"}
         />
    </div>
  )
})

export default NFTImage
