'use client';
import { useState, useEffect } from "react";
import { fetchData, fetchTv } from "@/services/api";
import { MediaItem } from "@/types/mediaItems";

export const useMediaFetch = () => {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [serials, setSerials] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [moviesData, serialsData] = await Promise.all([fetchData(), fetchTv()]);
        setMovies(moviesData);
        setSerials(serialsData);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { movies, serials, loading, error };
};
