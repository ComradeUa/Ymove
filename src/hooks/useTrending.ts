import { useState, useEffect } from "react";
import { type MediaItem } from "@/types/mediaItems";
import next from "next";

const BASE_URL = 'https://api.themoviedb.org/3';

export const useTrending = (timeWindow: 'day' | 'week') => {
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/trending/movie/${timeWindow}?api_key=137772c7c1451abb30832465cd2bca39`,
            {
                next: {
                revalidate: 86400
            }
            }
        );
        const json = await res.json();
        setData(json.results || []);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [timeWindow]);

  return { data, loading, error };
};