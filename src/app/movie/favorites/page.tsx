'use client';

import { useGetFavoritesQuery } from '@/store/api/favorite';
import Image from 'next/image';

export default function FavoritesPage() {
  const { data: favorites, isLoading } = useGetFavoritesQuery();
  if (isLoading) return <p>Загрузка...</p>;
  return (
    <>
      <h2>Избранные фильмы</h2>
      {favorites?.map((f) => (
        <div key={f.id}>
          <h1>{f.title}</h1>
        </div>
      ))}
    </>
  );
}
