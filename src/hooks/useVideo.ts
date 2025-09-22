import { useEffect, useState } from 'react';
import { getVideoById } from '@/services/api';
import { type Video } from '@/types/video';

export const useVideo = (movieId: number)  => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);

        const results = await getVideoById(movieId);
        setVideos(results || []);
      } catch (err) {
        setError('Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [movieId]);

  const trailer =
  videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ||
  videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
  videos.find((v) => v.site === 'YouTube');

  return { videos, trailer, loading, error };
}
