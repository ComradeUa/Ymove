export type MediaItem = {
  id: number;
  title: string;         // для фильмов
  name: string;          // для сериалов
  overview: string;
  poster_path: string;
  backdrop_path: string
  release_date: string;   // для фильмов
  first_air_date: string; // для сериалов
  vote_average: number;
  vote_count: number;
}
