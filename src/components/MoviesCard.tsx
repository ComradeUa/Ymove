import 'swiper/css';
import 'swiper/css/navigation';
import React, { type FC } from 'react';
import Image from 'next/image';
import { type MediaItem } from '@/types/mediaItems';
import Link from 'next/link';
import SkeletonGrid from './SkeletonGrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

type MovieProps = {
  movies: MediaItem[];
  loading?: boolean;
};

const MoviesCard: FC<MovieProps> = ({ movies, loading }) => {
  if (loading) return <SkeletonGrid />;
  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return <h1>There are no movies that matched your query.</h1>;
  }

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}>
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="flex flex-col items-center m-auto">
            <Link href={`/movie/${movie.id}`}>
              <Image
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                width={200}
                height={300}
                className="rounded-xl"
              />
            </Link>
            <h2 className="text-sm text-center font-semibold truncate mt-2 w-40">
              {movie.name || movie.title}
            </h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MoviesCard;
