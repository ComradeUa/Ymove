import { getMovieById } from "@/services/api";
import { type MovieDetails } from "@/types/movieDetails";
import { useEffect, useState } from "react";

export const useMovieById = (id: number) => {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieById(id);
        if (!res) {
          setError("Can't find film");
        } else {
          setData(res);
        }
      } catch (e) {
        setError("Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { data, loading, error };
};
