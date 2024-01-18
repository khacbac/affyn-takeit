import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import galleryReducer from './galerrySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    gallery: galleryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
