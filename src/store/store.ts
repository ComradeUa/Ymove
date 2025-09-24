import { configureStore } from '@reduxjs/toolkit';
import { favoriteApi } from './api/favorite';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        [favoriteApi.reducerPath]: favoriteApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoriteApi.middleware),
})
setupListeners(store.dispatch);