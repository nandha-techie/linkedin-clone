import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice
  },
})