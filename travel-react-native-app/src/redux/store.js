import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducer/searchReducer';
import contextReducer from './reducer/contextReducer';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    context: contextReducer
  },
})