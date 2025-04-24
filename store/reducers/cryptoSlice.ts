// store/reducers/cryptoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface HistoricalData {
  price: number;
  timestamp: number;
}

interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface CoinGeckoMarketChartResponse {
  prices: Array<[number, number]>;
}

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  historical: HistoricalData[];
}

interface CryptoState {
  data: CryptoData[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null
};

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const { data: marketData } = await axios.get<CoinGeckoMarketData[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin'
      );

      const cryptoList = await Promise.all(
        marketData.map(async (coin) => {
          const { data: detailData } = await axios.get<CoinGeckoMarketChartResponse>(
            `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`
          );

          return {
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
            marketCap: coin.market_cap,
            historical: detailData.prices.map(([timestamp, price]) => ({
              price,
              timestamp
            }))
          };
        })
      );

      return cryptoList;
    } catch {
      return rejectWithValue('Failed to fetch cryptocurrency data');
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const asset = state.data.find(coin => coin.id === action.payload.id);
      if (asset) {
        const previousPrice = asset.price;
        const newPrice = action.payload.price;
        
        asset.historical.push({
          price: newPrice,
          timestamp: Date.now()
        });

        if (asset.historical.length > 168) {
          asset.historical = asset.historical.slice(-168);
        }

        asset.change24h = ((newPrice - previousPrice) / previousPrice) * 100;
        asset.price = newPrice;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { updateCryptoPrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;