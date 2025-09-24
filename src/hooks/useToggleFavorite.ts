import { useState, useEffect } from 'react'
import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from '@/store/api/favorite'

export const useToggleFavorite = (movie_id:number) => {
    const { data: favorites } = useGetFavoritesQuery()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()

  useEffect(() => {
    if (favorites) {
      const found = favorites.some((f) => f.id === movie_id)
      setIsFavorite(found)
    }
  }, [favorites, movie_id])

  const toggleFavoriteClick = async () => {
    setIsFavorite((prev) => !prev) 

    try {
      if (!isFavorite) {
        await addFavorite({ movie_id }).unwrap()
      } else {
        const favorite = favorites?.find((f) => f.id === movie_id)
        if (favorite) {
          await deleteFavorite(favorite.id).unwrap()
        }
      }
    } catch (e) {
      console.error('Ошибка при переключении избранного', e)
      setIsFavorite((prev) => !prev) 
    }
  }

  return { isFavorite, toggleFavoriteClick }
}
