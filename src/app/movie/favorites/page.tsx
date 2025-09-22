'use client';

import { fetchFavorite } from '@/features/favoriteSlice';
import { AppDispatch, RootState } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FavoritesPage() {
  const favorite = useSelector((state: RootState) => state.favorite.items);
  const dispatch = useDispatch<AppDispatch>();
  console.log(favorite);
  useEffect(() => {
    dispatch(fetchFavorite());
  }, [dispatch]);
  return (
    <div>
      {favorite.map((f) => (
        <div key={f.id}>{f.title}</div>
      ))}
    </div>
  );
}
