import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducer/searchReducer';
import contextReducer from './reducer/contextReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

export const store = configureStore({
  reducer: {
    search: persistReducer(persistConfig, searchReducer),
    context: persistReducer(persistConfig, contextReducer)
  },
})