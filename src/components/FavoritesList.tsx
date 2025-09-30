'use client';
import { useGetFavoritesQuery } from '@/store/api/favorite';
import React, { type FC } from 'react';
import FavoriteItem from './FavoriteItem';
const FavoritesList: FC = () => {
  const { data: favorites, isLoading, isError } = useGetFavoritesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading favorites </p>;
  if (!favorites || favorites.length === 0) {
    return <p>You don't have any favorites</p>;
  }
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold">My favorites:</h1>
      <div className="mt-5">
        {favorites.map((f) => (
          <FavoriteItem key={f.id} movie={f} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
