import React, { type FC } from 'react';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';
const MovieListSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="flex w-1/2 rounded-xl shadow-md overflow-hidden bg-white">
          <div className="flex w-full">
            <Skeleton className="w-40 h-50 rounded-md" />
            <div className="m-5 w-full">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default MovieListSkeleton;
