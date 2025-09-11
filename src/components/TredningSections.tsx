import React, { FC, useState } from 'react';
import MoviesCard from './MoviesCard';
import { useTrending } from '@/hooks/useTrending';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const TrendingSection: FC = () => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');
  const { data, loading, error } = useTrending(timeWindow);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-6 mb-4 ml-10">
        <h1 className={`${poppins.className} text-2xl`}>Trending Movies</h1>
        <div className="flex rounded-full border border-slate-800 overflow-hidden">
          <button
            onClick={() => setTimeWindow('day')}
            className={`px-5 py-2 text-sm font-medium transition-colors ${
              timeWindow === 'day'
                ? 'bg-slate-800 text-emerald-400'
                : 'bg-white text-slate-800 hover:bg-slate-100'
            }`}>
            Today
          </button>

          <button
            onClick={() => setTimeWindow('week')}
            className={`px-5 py-2 text-sm font-medium transition-colors ${
              timeWindow === 'week'
                ? 'bg-slate-800 text-emerald-400'
                : 'bg-white text-slate-800 hover:bg-slate-100'
            }`}>
            This Week
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <MoviesCard movies={data} loading={loading} />
    </div>
  );
};

export default TrendingSection;
