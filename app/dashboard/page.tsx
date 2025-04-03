import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCryptoData } from '@/lib/api/crypto';
import { connectToCryptoWS } from '@/lib/websocket';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { cryptoData } = useSelector((state: RootState) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());
    connectToCryptoWS(dispatch);
    
    const weatherInterval = setInterval(() => {
      dispatch(fetchWeatherData());
    }, 60000);

    return () => clearInterval(weatherInterval);
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <WeatherWidget cities={['New York', 'London', 'Tokyo']} />
      <CryptoPriceTicker assets={cryptoData} />
      <NewsFeed />
      <NotificationCenter />
    </div>
  );
}