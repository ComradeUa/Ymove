import { useState, useEffect, useCallback } from 'react';
import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from '@/store/api/favorite';
import { useSession } from '@/lib/auth-client';
import { skipToken } from '@reduxjs/toolkit/query';
export const useToggleFavorite = (movie_id: number) => {
  const { data: session } = useSession();
  const user_id = session?.user?.id; // оставляем строкой

  const { data: favorites } = useGetFavoritesQuery(
    user_id ? { user_id } : skipToken // пропускаем запрос, если user_id нет
  );

  const [isFavorite, setIsFavorite] = useState(false);
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  useEffect(() => {
    if (favorites) {
      const found = favorites.some(f => f.id === movie_id);
      setIsFavorite(found);
    }
  }, [favorites, movie_id]);

  const toggleFavoriteClick = useCallback(async () => {
    if (!user_id) return; 
    const nextState = !isFavorite;
    setIsFavorite(nextState);

    try {
      if (nextState) {
        await addFavorite({ movie_id, user_id }).unwrap(); 
      } else {
        await deleteFavorite({ movie_id, user_id }).unwrap();
      }
    } catch (e) {
      console.error('Error toggling favorite', e);
      setIsFavorite(prev => !prev); 
    }
  }, [isFavorite, addFavorite, deleteFavorite, movie_id, user_id]);

  return { isFavorite, toggleFavoriteClick };
};
