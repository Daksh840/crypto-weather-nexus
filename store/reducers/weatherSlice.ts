import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  condition: string;
  icon: string;
  timestamp: number;
}

interface WeatherState {
  current: WeatherData[];
  historical: {
    [city: string]: WeatherData[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  current: [],
  historical: {},
  loading: false,
  error: null
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchData',
  async (cities: string[], { rejectWithValue }) => {
    try {
      const requests = cities.map(city => 
        axios.get(
          'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}'
        )
      );
      
      const responses = await Promise.all(requests);
      return responses.map(res => ({
        city: res.data.name,
        temp: res.data.main.temp,
        humidity: res.data.main.humidity,
        condition: res.data.weather[0].main,
        icon: res.data.weather[0].icon,
        timestamp: Date.now()
      }));
    } catch (error) {
      return rejectWithValue('Failed to fetch weather data');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateWeatherData: (state, action: PayloadAction<WeatherData>) => {
      const cityIndex = state.current.findIndex(w => w.city === action.payload.city);
      if (cityIndex > -1) {
        state.current[cityIndex] = action.payload;
      }
      
      // Store historical data
      if (!state.historical[action.payload.city]) {
        state.historical[action.payload.city] = [];
      }
      state.historical[action.payload.city].push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { updateWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;