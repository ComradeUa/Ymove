import type { MediaItem } from "@/types/mediaItems"
import { useEffect, useState } from "react"
import { fetchSearch } from "@/services/api";
export const useSearchMovie = (query: string) => {
    const [data,setData] = useState<MediaItem[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async() => {
            try{
            setLoading(false);
            setError(null);
            const searchFetch = await fetchSearch(query);
            setData(searchFetch)
            }catch(e){
                throw e;
            }
        }
        fetchData();
    },[query]);
    return {data, loading, error}
}