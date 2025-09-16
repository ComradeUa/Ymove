import { MediaItem } from "@/types/mediaItems";
import { MovieDetails } from "@/types/movieDetails";
export const fetchData = async(): Promise<MediaItem[]> => {
    try{
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=137772c7c1451abb30832465cd2bca39`,{
            next: {
                revalidate: 3600
            }
        })
        const data = await res.json();
        console.log(data.results);
        return data.results;
    }catch(e){
        throw e;
        console.log('Error');
    }
}
export const fetchTv = async () : Promise<MediaItem[]> => {
    try{
        const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=137772c7c1451abb30832465cd2bca39`, {
            next: {
                revalidate: 3600
            }
        })
        const data = await res.json();
        return data.results;
    }catch(e){
        throw e;
    }
}
export const getUrlByCategory = (category: string): string | null => {
  switch (category) {
    case "Streaming":
      return `https://api.themoviedb.org/3/discover/movie?api_key=137772c7c1451abb30832465cd2bca39&with_watch_providers=8&watch_region=US&language=en-US`;

    case "On Tv":
      return `https://api.themoviedb.org/3/tv/on_the_air?api_key=137772c7c1451abb30832465cd2bca39`;

    case "For Rent":
      return `https://api.themoviedb.org/3/discover/movie?api_key=137772c7c1451abb30832465cd2bca39&with_watch_monetization_types=rent&watch_region=US&sort_by=popularity.desc&language=en-US&page=1`;

    case "In Theaters":
      return `https://api.themoviedb.org/3/movie/now_playing?api_key=137772c7c1451abb30832465cd2bca39&language=en-US&page=1`;

    default:
      return null;
  }
};
export const fetchSearch = async (search_term: string): Promise<MediaItem[]> => {
    try{
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=137772c7c1451abb30832465cd2bca39&query=${search_term}`)
        const data = await res.json();
        return data.results;
    }catch(e){
        throw e;
    }

}
export const getMovieById = async (id:number):Promise<MovieDetails> =>{
    try{
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=137772c7c1451abb30832465cd2bca39&language=en-US`)
        const data = await res.json();
        return data;
    }catch(e){
        throw e;
    }
} 