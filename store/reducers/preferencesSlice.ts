import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  favoriteCryptos: string[];
  favoriteCities: string[];
  darkMode: boolean;
}

const initialState: PreferencesState = {
  favoriteCryptos: [],
  favoriteCities: [],
  darkMode: false
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const index = state.favoriteCryptos.indexOf(action.payload);
      if (index === -1) {
        state.favoriteCryptos.push(action.payload);
      } else {
        state.favoriteCryptos.splice(index, 1);
      }
    },
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const index = state.favoriteCities.indexOf(action.payload);
      if (index === -1) {
        state.favoriteCities.push(action.payload);
      } else {
        state.favoriteCities.splice(index, 1);
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    }
  }
});

export const { toggleFavoriteCrypto, toggleFavoriteCity, toggleDarkMode } = preferencesSlice.actions;
export default preferencesSlice.reducer;