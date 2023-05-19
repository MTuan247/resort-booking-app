import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducer/searchReducer';

export const store = configureStore({
  reducer: {
    search: searchReducer
  }
})