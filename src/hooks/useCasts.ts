import { getCostsById } from "@/services/api";
import { Casts } from "@/types/casts";
import { useEffect, useState } from "react";

const cache: Record<number, Casts[]> = {};

export const useCasts = (movie_id: number) => {
  const [casts, setCasts] = useState<Casts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCasts = async () => {
      try {
        if (cache[movie_id]) {
          setCasts(cache[movie_id]);
          setLoading(false);
          return;
        }

        const res = await getCostsById(movie_id);
        const sorted = res.sort((a, b) => b.popularity - a.popularity);

        cache[movie_id] = sorted;

        setCasts(sorted);
      } catch (e) {
        setError("Failed to fetch casts");
      } finally {
        setLoading(false);
      }
    };

    fetchCasts();
  }, [movie_id]);

  return { casts, loading, error };
};
