'use client';
import MovieDetailsCard from '@/components/MovieDetailsCard';
import MovieTrailer from '@/components/MovieTrailer';
import TopBilledCast from '@/components/TopBilledCast';
export default function MoviePage() {
  return (
    <div>
      <MovieDetailsCard />
      <TopBilledCast />
      <MovieTrailer />
    </div>
  );
}
