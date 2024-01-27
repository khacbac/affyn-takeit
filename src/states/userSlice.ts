import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './stores';
import {LatLng, User} from '../types';

// Define a type for the slice state
interface UserState {
  user: User;
  location?: LatLng;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {email: '', id: ''},
};

export const userSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{email: string; id: string}>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {...state.user, ...action.payload};
    },
    setUserLocation: (state, action: PayloadAction<LatLng>) => {
      state.location = action.payload;
    },
    removeUser: state => {
      state.user = {email: '', id: ''};
    },
  },
});

export const {setUser, setUserLocation, removeUser, updateUser} =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLocation = (state: RootState) => state.user.location;

export default userSlice.reducer;
