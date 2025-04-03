import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['preferences']
};

const rootReducer = combineReducers({
  weather: weatherReducer,
  crypto: cryptoReducer,
  news: newsReducer,
  notifications: notificationsReducer,
  preferences: preferencesReducer
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);