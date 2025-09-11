import { type MediaItem } from "@/types/mediaItems";
import { useEffect, useState } from "react";
import { getUrlByCategory } from "@/services/api"

export const useTrendingByCategory = (category: string) => {
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const url = getUrlByCategory(category);
      if (!url) {
        setData([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(url, {
          next: { revalidate: 86400 },
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const json = await res.json();
        setData(json.results || []);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return { data, loading, error };
};
