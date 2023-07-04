import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactReducer } from './contactSlice';

const persistConfig = {
  key: 'contacts',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

const rootReducer = {
  contacts: persistReducer(persistConfig, contactReducer),
  auth: persistReducer(authPersistConfig, authReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
