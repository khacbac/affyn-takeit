import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './stores';
import {FBPhoto} from '../types';

// Define a type for the slice state
interface GalleryState {
  photos: FBPhoto[];
}

// Define the initial state using that type
const initialState: GalleryState = {
  photos: [],
};

export const gallerySlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<FBPhoto[]>) => {
      state.photos = action.payload;
    },
  },
});

export const {setPhotos} = gallerySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPhotos = (state: RootState) => state.gallery.photos;

export default gallerySlice.reducer;
