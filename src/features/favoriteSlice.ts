import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { MediaItem } from "@/types/mediaItems";
import { FavoriteItem } from "@/types/favoriteItem";

export const fetchFavorite = createAsyncThunk<MediaItem[]>('/api/favorites', async() => {
    const res = await fetch('/api/favorites', {
        method: "GET"
    })
    const data: FavoriteItem[] = await res.json();
    const moviesData = await Promise.all(data.map(async (f) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${f.move_id}?api_key=137772c7c1451abb30832465cd2bca39`)
        return res.json();
    }))
    return moviesData;
})
export const addFavorite = createAsyncThunk<MediaItem, number>(
  "favorites/add",
  async (movie_id) => {
    // Сначала POST в базу через API
    await fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ movie_id }),
      headers: { "Content-Type": "application/json" },
    });

    // Потом получаем полные данные фильма с TMDB
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=$137772c7c1451abb30832465cd2bca39`
    );
    const movie: MediaItem = await res.json();
    return movie; // возвращаем объект фильма для slice
  }
);

// Удаляем фильм из favorites
export const removeFavorite = createAsyncThunk<number, number>(
  "favorites/remove",
  async (movie_id) => {
    await fetch("/api/favorites", {
      method: "DELETE",
      body: JSON.stringify({ movie_id }),
      headers: { "Content-Type": "application/json" },
    });
    return movie_id; // возвращаем id для удаления из slice
  }
);
const InitialStateFavorite = {
    items: [] as MediaItem[]
}
export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: InitialStateFavorite,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchFavorite.fulfilled, (state, action) => {
                state.items = action.payload
            })
            .addCase(addFavorite.fulfilled, (state, action: PayloadAction<MediaItem>) => {
        state.items.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((m) => m.id !== action.payload);
      });
    }
})