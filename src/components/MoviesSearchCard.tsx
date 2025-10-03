import { type MediaItem } from '@/types/mediaItems';
import React, { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardTitle, CardDescription } from './ui/card';

type MoviesResultCardProps = { movie: MediaItem; className?: string };

const MovieSearchCard: FC<MoviesResultCardProps> = ({ movie, className }) => {
  return (
    <Card
      className={`flex flex-col sm:flex-row rounded-xl shadow-md overflow-hidden bg-white ${
        className ?? 'w-full'
      }`}>
      {/* Постер */}
      <div className="relative w-full h-60 sm:w-40 sm:h-60 flex-shrink-0">
        <Link href={`/movie/${movie.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title || 'Movie poster'}
            fill
            className="object-cover"
          />
        </Link>
      </div>

      {/* Контент */}
      <div className="p-5 w-full">
        <CardTitle>{movie.title}</CardTitle>
        <CardDescription>
          {new Date(movie.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
        <p className="text-sm pt-3 line-clamp-3">{movie.overview}</p>
      </div>
    </Card>
  );
};

export default MovieSearchCard;
