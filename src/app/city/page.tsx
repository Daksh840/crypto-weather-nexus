// app/city/[id]/page.tsx
import { fetchWeatherHistory } from '../../../lib/api/weather';
import Chart from '../../../components/WeatherChart';
import CurrentWeather from '../../../components/CurrentWeather';
import { notFound } from 'next/navigation';

interface WeatherData {
  dt: number;
  temp: number;
  humidity: number;
  weather: {
    description: string;
    icon: string;
  }[];
}

export async function generateStaticParams() {
  return [
    { id: 'new-york' },
    { id: 'london' },
    { id: 'tokyo' }
  ];
}

export default async function CityPage({ params }: { params: { id: string } }) {
  const cityName = decodeURIComponent(params.id);
  const { current, historical } = await fetchWeatherHistory(cityName);

  if (!current) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{cityName.replace(/-/g, ' ')} Weather</h1>
      
      <CurrentWeather 
        temp={current.temp}
        humidity={current.humidity}
        description={current.weather[0].description}
        icon={current.weather[0].icon}
      />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Temperature History</h2>
          <Chart 
            data={historical.map((h: WeatherData) => h.temp)}
            labels={historical.map((h: WeatherData) => 
              new Date(h.dt * 1000).toLocaleDateString()
            )}
            color="#f59e0b"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Humidity History</h2>
          <Chart 
            data={historical.map((h: WeatherData) => h.humidity)}
            labels={historical.map((h: WeatherData) => 
              new Date(h.dt * 1000).toLocaleDateString()
            )}
            color="#3b82f6"
          />
        </div>
      </div>
    </div>
  );
}