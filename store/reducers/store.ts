import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import cryptoReducer from '../reducers/cryptoSlice';
import weatherReducer from '../reducers/weatherSlice';
import newsReducer from '../reducers/newsSlice';
import notificationReducer from '../reducers/notificationSlice';
import preferencesReducer from '../reducers/preferencesSlice';

const rootReducer = combineReducers({
  crypto: cryptoReducer,
  weather: weatherReducer,
  news: newsReducer,
  notifications: notificationReducer,
  preferences: preferencesReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['preferences'],
  version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
