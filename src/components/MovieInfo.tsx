import React, { FC } from 'react';
import UserScore from './UserScore';
type MovieInfoProps = {
  id: number;
  title: string;
  releaseDate: string;
  genres: { name: string }[];
  runtime: number;
  overview: string;
  voteAverage: number;
};

const MovieInfo: FC<MovieInfoProps> = ({
  id,
  title,
  releaseDate,
  genres,
  runtime,
  overview,
  voteAverage,
}) => {
  return (
    <div className="text-white max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">
        {title} ({new Date(releaseDate).getFullYear()})
      </h1>
      <div className="space-y-2 space-x-2 flex">
        <p className="text-lg opacity-80">{genres.map((g) => g.name).join(', ')}</p>
        <p className="text-lg opacity-80">
          {Math.floor(runtime / 60)} h {runtime % 60} min
        </p>
      </div>
      <UserScore score={voteAverage} movie_id={id} />
      <p className="text-lg opacity-90 mt-4">{overview}</p>
    </div>
  );
};

export default MovieInfo;
