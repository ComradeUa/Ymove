'use client';
import React, { type FC } from 'react';
import { useParams } from 'next/navigation';
import { useMovieById } from '@/hooks/useMovieById';
import Image from 'next/image';
import MoviePoster from './MoviePoster';
import MovieInfo from './MovieInfo';

const MovieDetailsCard: FC = () => {
  const params = useParams();
  const { id } = params;
  const { data: movie, loading, error } = useMovieById(Number(id));

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !movie)
    return <p className="text-red-500 text-center mt-10">{error ?? 'Movie not found'}</p>;

  return (
    <div className="relative w-full">
      {movie.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || 'Background'}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 p-5 sm:p-10 justify-center">
        <MoviePoster
          posterPath={movie.poster_path}
          title={movie.title}
          className="w-52 sm:w-64 flex-shrink-0"
        />
        <MovieInfo
          id={movie.id}
          title={movie.title}
          releaseDate={movie.release_date}
          genres={movie.genres}
          runtime={movie.runtime}
          overview={movie.overview}
          voteAverage={movie.vote_average}
        />
      </div>
    </div>
  );
};

export default MovieDetailsCard;
