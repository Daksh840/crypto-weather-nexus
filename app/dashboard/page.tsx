// app/(dashboard)/page.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCryptoDetails as fetchCryptoData } from '../../lib/api/crypto';
import { fetchNews } from '../../lib/api/news';
import { connectToCryptoWS } from '../../lib/websocket';
import WeatherWidget from '../../components/WeatherWidget';
import CryptoChart from '../../components/CryptoChart';
import NewsFeed from '../../components/NewsFeed';
import { RootState } from '../../store/reducers/store';


interface CryptoAsset {
  id: string;
  historical?: Array<{
    price: number;
    timestamp: number;
  }>;
  price: number;
  change24h: number;
  marketCap: number;
}

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { crypto, news } = useAppSelector((state: RootState) => ({
    crypto: state.crypto,
    news: state.news
  }));

  const getChartData = (cryptoId: string) => {
    const asset = crypto.data.find((c: CryptoAsset) => c.id === cryptoId);
    if (!asset?.historical) return { prices: [] as number[], dates: [] as string[] };
    
    return {
      prices: asset.historical.map((h: { price: number; timestamp: number }) => h.price),
      dates: asset.historical.map((h: { price: number; timestamp: number }) => 
      new Date(h.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
      )
    };
  };

  useEffect(() => {
    dispatch(fetchCryptoData());
    dispatch(fetchNews());
    connectToCryptoWS(dispatch);

    const interval = setInterval(() => {
      dispatch(fetchCryptoData());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WeatherWidget cities={['London', 'New York', 'Tokyo']} />
      
      <div className="space-y-6 md:col-span-2 lg:col-span-1">
        {crypto.data.map((asset: CryptoAsset) => {
          const { prices, dates } = getChartData(asset.id);
          return (
            <CryptoChart
              key={asset.id}
              data={prices}
              labels={dates}
              color={
                asset.id === 'bitcoin' ? '#f59e0b' :
                asset.id === 'ethereum' ? '#4f46e5' :
                '#10b981'
              }
            />
          );
        })}
      </div>

      <NewsFeed articles={news.data} />
    </div>
  );
}

