import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ipfsClient from "ipfs-http-client";

const ipfs = ipfsClient.create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const NFTDetail = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const getImageFromIPFS = async (cid) => {
      try {
        const imageBuffer = await ipfs.cat(cid);
        setImage(URL.createObjectURL(new Blob([imageBuffer], { type: "image/png" })));
      } catch (err) {
        console.log(err);
      }
    };

    const getMetadataFromIPFS = async (cid) => {
      try {
        const metadataBuffer = await ipfs.cat(cid);
        setMetadata(JSON.parse(metadataBuffer.toString()));
      } catch (err) {
        console.log(err);
      }
    };

    const imageCid = router.query.imageCid;
    const metadataCid = router.query.metadataCid;
    getImageFromIPFS(imageCid);
    getMetadataFromIPFS(metadataCid);
  }, [router]);

  if (!image || !metadata) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={image} alt={metadata.name} />
      <h2>{metadata.name}</h2>
      <p>{metadata.description}</p>
      <p>{metadata.attributes}</p>
    </div>
  );
};

export default NFTDetail;


