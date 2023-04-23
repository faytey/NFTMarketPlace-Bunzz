import ArtistInfo from "../components/profile/ArtistInfo";
import NFTContainer from "../components/profile/NFTContainer";
import {Tab} from '@headlessui/react'
import { useAccount, useContractReads, useContractRead } from 'wagmi'
import { marketplaceContract } from '@/utils/contractInfo'
import { useEffect, useState } from 'react'




const ArtistPage = () => {

  const [itemListed, setItemListed] = useState();
  const [marketItems, setMarketItems] = useState();
  const [myMarketItem, setMyMarketItem] = useState();
  const [ownedAsset, setOwnedAsset] = useState();
  const [listedAsset, setListedAsset] = useState();



  const { data: marketplaceData, isError: marketplaceDataError, isLoading: marketplaceDataIsLoading } = useContractReads({
    contracts: [
      {
        ...marketplaceContract,
        functionName: 'fetchItemListed',
      },
      {
        ...marketplaceContract,
        functionName: "fetchMarketItems",
      },
      {
        ...marketplaceContract,
        functionName: 'fetchMyNfts',
        
      },
  ]})

  const {address} = useAccount({
    onConnect({ address }) {
      console.log(address)
    },
  })

  const { data: listed } = useContractRead({
        ...marketplaceContract,
        functionName: 'fetchItemListed',
        overrides: {
          from: address
        }
  })
  const [active, setActive] = useState()

  const { data: owned } = useContractRead({
    ...marketplaceContract,
    functionName: 'fetchMyNfts',
    overrides: {
      from: address
    }
})

let Attribute = [
  {id: 1, type: "Owned", value: ownedAsset},
  {id: 2, type: "Listed Item", value: listedAsset},
];

function handleClick(attri) {
  // console.log(attri)
  //  let internal = attri;
  //  console.log(internal)
  //  return internal;
   //internal.classList.add("text-[#A259FF] border-b-2 border-[#A259FF]")
  setActive(attri)
   
}



  useEffect(() => {
    setItemListed(marketplaceData?.[0]);
    setMarketItems(marketplaceData?.[1]);
    setMyMarketItem(marketplaceData?.[2]);
    setOwnedAsset(owned);
    setListedAsset(listed);
  },
  [marketplaceData, myMarketItem, itemListed]
  )



  

  return (
    <div className="relative bg-[#2B2B2B] w-full items-start justify-start text-center text-3xl max-w-full m-auto font-sans">
    
    <div className="self-stretch flex flex-col items-center justify-start">
        <img
          className="self-stretch relative max-w-full overflow-hidden h-80 shrink-0 object-cover"
          alt=""
          src="assets/ImagePlaceHolder.png"
        />
        <div className="w-[1050px] flex flex-row items-start justify-start mt-[-70px]">
        <div className="rounded-xl flex flex-row items-start justify-start border-[2px] border-solid border-[#2B2B2B]">
          <div className="relative w-[120px] h-[120px] shrink-0">
              <img
                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                alt=""
                src="assets/Avatar.png"
              />
            </div>
          </div>
        </div>
      </div>

      <ArtistInfo address={address} />

      <Tab.Group>
        <Tab.List>
        <div className="self-stretch bg-[#2B2B2B] flex flex-col items-center justify-start gap-3">
        <div className="self-stretch relative box-border h-px shrink-0 border-t-[1px] border-solid border-background-secondary" />
        <div className="flex flex-row items-start justify-start">
          <div className="flex-1 flex flex-row items-start justify-start">
              <div className="flex flex-row py-0 px-4 items-center justify-center gap-2">
                  {
                    Attribute.map((attribute) => (
                      <Tab id={attribute.id} key={attribute.id} onClick={() => handleClick(attribute.id)} className= {` ${ active == attribute.id ? 'text-[#A259FF] border-b-2 border-[#A259FF]' : ''} flex flex-row py-0 px-3 items-center justify-center gap-2`}>
                        <div className="relative leading-[140%] capitalize font-semibold">
                          {attribute.type}
                        </div>
                        <div className="rounded-xl bg-[#1C1C1C] flex flex-row py-[5px] px-2.5 items-center justify-start text-left text-base font-h5-space-mono">
                          <div className="relative leading-[140%]">{attribute.value?.length ?? "0"}</div>
                        </div>
                      </Tab>
                    ))
                  }
                </div>
              
          </div>
        </div>
        </div>
        </Tab.List>
        <div className="self-stretch bg-[#2B2B2B] py-20 px-0 items-center justify-start gap-[30px]">
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-3 m-0 p-16 gap-8">
              { ownedAsset?.map((item) => {
                return (
                    <div>
                      {<NFTContainer 
                        marketItem={item}
                      />}
                    </div>
                    )
                  })}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-3 m-0 p-16 gap-8">
            { listedAsset?.map((item) => {
              return (
                  <div>
                    {<NFTContainer 
                      marketItem={item}
                    />}
                  </div>
                  )
                })}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
      </Tab.Group>

    </div>
  );
};

export default ArtistPage;

 


