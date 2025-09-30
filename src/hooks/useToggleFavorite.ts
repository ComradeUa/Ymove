import { useState, useEffect, useCallback } from 'react';
import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from '@/store/api/favorite';

export const useToggleFavorite = (movie_id: number) => {
  const { data: favorites } = useGetFavoritesQuery();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  useEffect(() => {
    if (favorites) {
      const found = favorites.some((f) => f.id === movie_id);
      setIsFavorite(found);
    }
  }, [favorites, movie_id]);

  const toggleFavoriteClick = useCallback(async () => {
    const nextState = !isFavorite;
    setIsFavorite(nextState);

    try {
      if (nextState) {
        await addFavorite({ movie_id }).unwrap();
      } else {
        const favorite = favorites?.find((f) => f.id === movie_id);
        if (favorite) {
          await deleteFavorite(favorite.id).unwrap();
        }
      }
    } catch (e) {
      console.error('Error ', e);
      setIsFavorite((prev) => !prev); 
    }
  }, [isFavorite, favorites, addFavorite, deleteFavorite, movie_id]);

  return { isFavorite, toggleFavoriteClick };
};
