'use client';

import React, { FC, useState } from 'react';
import { Input } from './ui/input';
import MoviesCard from './MoviesCard';
import { Poppins } from 'next/font/google';
import SearchButton from './SearchButton';
import CategoryTabs from './CategoryTabs';
import { useTrendingByCategory } from '@/hooks/useTrendingByCategory';
import { useRouter } from 'next/navigation';
const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const DiscoverMovies: FC = () => {
  const [text, setText] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('Streaming');
  const router = useRouter();
  const { data, loading, error } = useTrendingByCategory(activeCategory);

  const handleSearch = (): void => {
    if (text.trim() !== '') {
      router.push(`/movie/search?query=${encodeURIComponent(text)}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };
  return (
    <div className="w-full m-auto mt-5">
      <div className="flex justify-center gap-4 mb-5">
        <Input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Search movies..."
          className="w-[50%]"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <SearchButton onClickHandle={handleSearch} />
      </div>
      <div className="mt-10">
        <div className="flex items-center gap-6 mb-4 ml-10">
          <h1 className={`${poppins.className} text-2xl`}>What's popular</h1>
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        </div>
        <MoviesCard movies={data} loading={loading} />
      </div>
    </div>
  );
};

export default DiscoverMovies;
