import { configureStore } from '@reduxjs/toolkit';
import { favoriteSlice } from './features/favoriteSlice';

export const store = configureStore({
    reducer: {
        favorite: favoriteSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;