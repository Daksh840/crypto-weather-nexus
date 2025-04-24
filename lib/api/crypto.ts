// lib/api/crypto.ts
import axios from 'axios';

export interface CryptoDetails {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume: number;
  change24h: number;
  allTimeHigh: number;
  description: string;
  historical?: Array<{
    price: number;
    timestamp: number;
  }>;
}

export const fetchCryptoData = async (): Promise<Omit<CryptoDetails, 'historical'>[]> => {
  try {
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin'
    );
    
    return data.map((coin: { id: string; name: string; symbol: string; current_price: number; market_cap: number; total_volume: number; price_change_percentage_24h: number; ath: { usd: number } }) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      change24h: coin.price_change_percentage_24h,
      allTimeHigh: coin.ath.usd
    }));
  } catch {
    throw new Error('Failed to fetch cryptocurrency data');
  }
};

export const fetchCryptoDetails = async (id: string): Promise<CryptoDetails> => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );

    // Fetch historical data for charts
    const historicalRes = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
    );

    return {
      id: data.id,
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      price: data.market_data.current_price.usd,
      marketCap: data.market_data.market_cap.usd,
      volume: data.market_data.total_volume.usd,
      change24h: data.market_data.price_change_percentage_24h,
      allTimeHigh: data.market_data.ath.usd,
      description: data.description.en,
      historical: historicalRes.data.prices.map(([timestamp, price]: [number, number]) => ({
        price,
        timestamp
      }))
    };
  } catch {
    throw new Error('Failed to fetch cryptocurrency details');
  }
};