import { type MediaItem } from '@/types/mediaItems';
import React, { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardTitle, CardDescription } from './ui/card';
type MoviesResultCardProps = { movie: MediaItem };
const MovieSearchCard: FC<MoviesResultCardProps> = ({ movie }) => {
  return (
    <Card key={movie.id} className="flex w-1/2 rounded-xl shadow-md overflow-hidden bg-white">
      <div className="flex">
        <div className="relative w-40 h-50">
          <Link href={`/movie/${movie.id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="None photo"
              fill
              className="object-cover flex items-center justify-center"
            />
          </Link>
        </div>
        <div className="m-5 w-full">
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
      </div>
    </Card>
  );
};
export default MovieSearchCard;
