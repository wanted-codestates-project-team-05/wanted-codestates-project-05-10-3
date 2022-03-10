import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { recommendsApi } from './service/recomments';

export const store = configureStore({
  reducer: {
    [recommendsApi.reducerPath]: recommendsApi.reducer
  },
  middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(recommendsApi.middleware))
});

setupListeners(store.dispatch);
