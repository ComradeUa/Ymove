'use client';
import React, { type FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearchMovie } from '@/hooks/useSearchMovie';
import { useRouter } from 'next/navigation';
import SearchInput from './SearchInput';
import MoviesListResult from './MoviesListResult';
import MovieListSkeleton from './MovieListSkeleton';
const MovieSearchResults: FC = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState<string>(initialQuery);
  const { data, loading } = useSearchMovie(query);
  const router = useRouter();

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    router.push(`/movie/search?query=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    if (initialQuery != query) {
      setQuery(query);
    }
  }, [initialQuery]);
  return (
    <div className="w-full mt-5">
      <SearchInput value={query} onChangeQuery={onChangeQuery} onHandleSearch={handleSearch} />
      <div className="flex flex-col  gap-4 items-center ">
        {loading ? <MovieListSkeleton /> : <MoviesListResult movies={data} />}
      </div>
    </div>
  );
};

export default MovieSearchResults;
