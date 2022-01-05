import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import songsReducer from '../features/songSlice';
import artistReducer from '../features/artistSlice'
import albumReducer from '../features/albumSlice'

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    artist: artistReducer,
    album: albumReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
