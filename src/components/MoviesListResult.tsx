import { type MediaItem } from '@/types/mediaItems';
import React, { type FC } from 'react';
import MovieSearchCard from './MoviesSearchCard';
type MoviesListResultProps = {
  movies: MediaItem[];
};

const MoviesListResult: FC<MoviesListResultProps> = ({ movies }) => {
  if (!movies.length) {
    return <p className="text-gray-500">No movies found.</p>;
  }
  return (
    <div className="flex flex-col  gap-4 items-center ">
      {movies.map((movie) => (
        <MovieSearchCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesListResult;
