'use client';
import { useGetFavoritesQuery } from '@/store/api/favorite';
import React, { type FC } from 'react';
import FavoriteItem from './FavoriteItem';
import { useSession } from '@/lib/auth-client';
import { skipToken } from '@reduxjs/toolkit/query';

const FavoritesList: FC = () => {
  const { data: session } = useSession();
  const user_id = session?.user?.id;

  const {
    data: favorites,
    isLoading,
    isError,
  } = useGetFavoritesQuery(user_id ? { user_id } : skipToken);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error loading favorites</p>;
  if (!session) return <p className="text-center mt-10">You need to sign in to see favorites!</p>;
  if (!favorites || favorites.length === 0)
    return <p className="text-center mt-10">You don&apost have any favorites</p>;

  return (
    <div className="mt-10 px-4">
      <h1 className="text-3xl font-bold text-center">My Favorites</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.map((f) => (
          <FavoriteItem key={f.id} movie={f} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
