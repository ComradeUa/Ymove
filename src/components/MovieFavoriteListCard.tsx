import type { MediaItem } from '@/types/mediaItems';
import React, { type FC } from 'react';
import Image from 'next/image';
import { Card, CardTitle, CardDescription } from './ui/card';
import Link from 'next/link';
type MovieFavoriteListProps = {
  movie: MediaItem;
};

const MovieFavoriteListCard: FC<MovieFavoriteListProps> = ({ movie }) => {
  return (
    <Card
      key={movie.id}
      className="flex w-full max-w-lg rounded-xl shadow-md overflow-hidden bg-white mx-auto">
      {/* Постер */}
      <div className="relative w-40 h-60 flex-shrink-0">
        <Link href={`/movie/${movie.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </Link>
      </div>

      {/* Контент */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <CardTitle className="text-xl font-semibold line-clamp-2">{movie.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-2">
          {new Date(movie.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </CardDescription>
        <p className="text-sm line-clamp-5">{movie.overview}</p>
      </div>
    </Card>
  );
};

export default MovieFavoriteListCard;
