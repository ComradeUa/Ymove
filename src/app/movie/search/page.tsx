'use client';

import { useSearchMovie } from '@/hooks/useSearchMovie';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const { data, loading } = useSearchMovie(query);
  return (
    <>
      {data.map((movieSearch) => (
        <div key={movieSearch.id} className="w-20rem">
          <h1>{movieSearch.title}</h1>
          <Link href={`/movie/${movieSearch.id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movieSearch.poster_path}`}
              alt={movieSearch.title}
              width={150}
              height={225}
              className="object-cover rounded-lg"
            />
          </Link>
        </div>
      ))}
    </>
  );
}
