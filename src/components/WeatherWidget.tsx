// components/WeatherWidget.tsx
'use client';

import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/reducers/store';
import Image from 'next/image';

interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  condition: string;
  icon: string;
}

const WeatherWidget = ({ cities }: { cities: string[] }) => {
  const { current } = useAppSelector((state: RootState) => state.weather);

  const getCityData = (cityName: string): WeatherData | undefined => {
    return current.find((data) => data.city.toLowerCase() === cityName.toLowerCase());
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Weather</h2>
      <div className="space-y-3">
        {cities.map((city) => {
          const cityData = getCityData(city);
          
          return (
            <div 
              key={city} 
              className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium min-w-[100px]">{city}</span>
                {cityData && (
                  <Image
                    src={`https://openweathermap.org/img/wn/${cityData.icon}.png`}
                    alt={cityData.condition}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                    unoptimized // Weather API icons are already optimized
                  />
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {cityData ? (
                  <>
                    <span className="text-lg font-semibold">
                      {Math.round(cityData.temp)}°C
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {cityData.humidity}% Humidity
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500 text-sm">Loading...</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherWidget;