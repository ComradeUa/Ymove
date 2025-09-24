import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MediaItem } from '@/types/mediaItems'

export const favoriteApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    getFavorites: builder.query<MediaItem[], void>({
      query: () => '/favorites',
      providesTags: ['Favorites'],
    }),
    addFavorite: builder.mutation<{ success: boolean }, { movie_id: number }>({
      query: (body) => ({
        url: '/favorites',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Favorites'],
    }),
    deleteFavorite: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/favorites?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
})
export const { useGetFavoritesQuery, useAddFavoriteMutation, useDeleteFavoriteMutation} = favoriteApi
