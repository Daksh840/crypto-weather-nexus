import axios from 'axios';

export const fetchCryptoData = async () => {
  const { data } = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin'
  );
  return data.map((coin: any) => ({
    id: coin.id,
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h,
    marketCap: coin.market_cap
  }));
};