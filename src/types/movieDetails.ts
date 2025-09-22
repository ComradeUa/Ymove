import { type MediaItem } from "./mediaItems";
export type MovieDetails = {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  runtime: number;
} & MediaItem;