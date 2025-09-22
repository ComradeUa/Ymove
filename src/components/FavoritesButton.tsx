import { addFavorite, removeFavorite } from '@/features/favoriteSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { FC } from 'react';

type FavoritesButtonProps = {
  movie_id: number;
};

const FavoritesButton: FC<FavoritesButtonProps> = ({ movie_id }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorite.items);
  const isFavorite = favorites.some((f) => f.id === movie_id);
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie_id));
    } else {
      dispatch(addFavorite(movie_id));
    }
  };
  return (
    <button onClick={toggleFavorite}>{isFavorite ? '💖 В избранном' : '🤍 В избранное'}</button>
  );
};

export default FavoritesButton;
