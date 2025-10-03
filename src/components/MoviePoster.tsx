import React, { type FC } from 'react';
import { Card } from './ui/card';
import Image from 'next/image';
type MoviePosterProps = {
  posterPath?: string;
  title?: string;
  className?: string;
};

const MoviePoster: FC<MoviePosterProps> = ({ posterPath, title }) => {
  return (
    <Card className="overflow-hidden rounded-xl shadow-lg">
      <Image
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title || 'Poster'}
        width={300}
        height={450}
        className="object-cover"
      />
    </Card>
  );
};

export default MoviePoster;
