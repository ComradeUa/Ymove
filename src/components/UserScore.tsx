import React, { type FC } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { useToggleFavorite } from '@/hooks/useToggleFavorite';
type UserScoreProps = {
  score: number;
  movie_id: number;
};

const UserScore: FC<UserScoreProps> = ({ score, movie_id }) => {
  const { isFavorite, toggleFavoriteClick } = useToggleFavorite(movie_id);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - score / 10);
  let strokeColor: string = 'green';
  if (score * 10 < 50) strokeColor = 'red';

  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
          {Math.round(score * 10)}%
        </div>
        <svg className="w-16 h-16">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={strokeColor}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>
      <span className="text-white text-lg opacity-80">User Score</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" onClick={toggleFavoriteClick}>
            {isFavorite ? <Heart color="#ff0e00" /> : <Heart />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mark as favorite</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default UserScore;
