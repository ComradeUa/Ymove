import React, { type FC } from 'react';
import { useParams } from 'next/navigation';
import { useVideo } from '@/hooks/useVideo';
const MovieTrailer: FC = () => {
  const params = useParams();
  const { id } = params;

  const { trailer, loading, error } = useVideo(Number(id));

  if (loading) return <div>Loading trailer...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col items-center w-full px-4 mt-10">
      <h1 className="text-center text-3xl font-bold mb-4">Trailer</h1>
      <div className="w-full sm:max-w-3xl lg:max-w-4xl aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailer?.key}`}
          title={trailer?.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default MovieTrailer;
