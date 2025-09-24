'use client';

import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
} from '@/store/api/favorite';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

export default function FavoritesPage() {
  const { data: favorites, isLoading } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
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
