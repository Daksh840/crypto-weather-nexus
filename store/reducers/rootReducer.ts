import { combineReducers } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';
import weatherReducer from './weatherSlice';
import newsReducer from './newsSlice';
import notificationsReducer from './notificationSlice';
import preferencesReducer from './preferencesSlice';

export const rootReducer = combineReducers({
  crypto: cryptoReducer,
  weather: weatherReducer,
  news: newsReducer,
  notifications: notificationsReducer,
  preferences: preferencesReducer
});

export type RootState = ReturnType<typeof rootReducer>;