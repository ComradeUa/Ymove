'use client';
import type { MediaItem } from '@/types/mediaItems';
import React, { type FC } from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { useDeleteFavoriteMutation } from '@/store/api/favorite';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import MovieSearchCard from './MoviesSearchCard';
import { useSession } from '@/lib/auth-client';
type FavoriteItemProps = {
  movie: MediaItem;
};

const FavoriteItem: FC<FavoriteItemProps> = ({ movie }) => {
  const { data: session } = useSession();
  const user_id = session?.user?.id;
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const handleRemove = () => {
    if (!user_id) return;
    deleteFavorite({ movie_id: movie.id, user_id });
  };
  return (
    <div className="flex flex-col gap-4 items-center mt-5 max-w-full">
      <MovieSearchCard movie={movie} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleRemove} className=" ">
            <Heart color="#ff0e00" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mark as favorite</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FavoriteItem;
