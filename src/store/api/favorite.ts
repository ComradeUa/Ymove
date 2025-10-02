import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MediaItem } from '@/types/mediaItems'

export const favoriteApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    getFavorites: builder.query<MediaItem[], { user_id: string }>({
      query: ({ user_id }) => `/favorites?user_id=${user_id}`,
      providesTags: ['Favorites'],
    }),
    addFavorite: builder.mutation<{ success: boolean }, { movie_id: number; user_id: string }>({
      query: (body) => ({
        url: '/favorites',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Favorites'],
    }),
    deleteFavorite: builder.mutation<{ success: boolean }, { movie_id: number; user_id: string }>({
      query: ({ movie_id, user_id }) => ({
        url: `/favorites?id=${movie_id}&user_id=${user_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
})

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoriteApi
