'use client';
import { useGetFavoritesQuery } from '@/store/api/favorite';
import React, { type FC } from 'react';
import FavoriteItem from './FavoriteItem';
import { useSession } from '@/lib/auth-client';
import { skipToken } from '@reduxjs/toolkit/query';
const FavoritesList: FC = () => {
  const { data: session, isPending, error } = useSession();
  const user_id = session?.user?.id; // строка или undefined

  const {
    data: favorites,
    isLoading,
    isError,
  } = useGetFavoritesQuery(user_id ? { user_id } : skipToken);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading favorites </p>;
  if (!session) return <p>if you want to use the function then you have to sign in!</p>;
  if (!favorites || favorites.length === 0) {
    // eslint-disable-next-line react/no-unescaped-entities
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
