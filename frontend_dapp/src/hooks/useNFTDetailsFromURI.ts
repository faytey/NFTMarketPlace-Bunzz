import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useNFTDetailsFromURI({ item }: { item: string }) {

    const [fetchData, setFetchData] = useState<string>();
    const [keu, jfo] = useState("");

    useEffect(() => {
        const fetchURIData = async (item: string) => {
            const hello = item.split("/");
            const keu_ = 'https://ipfs.filebase.io/ipfs/' + hello[hello.length - 1];
            jfo(keu_)
            try {
                const fetchData_: any = await axios('https://ipfs.filebase.io/ipfs/' + hello[hello.length - 1]);
                const fetch = fetchData_.data.image
                setFetchData(fetch)
            } catch (error) {
                console.error(error)
            }
        }
        fetchURIData(item);

    }, [item])
    return { fetchData, keu };
}

