export const fetchWeatherHistory = async (city: string) => {
    try {
      const currentRes = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}'
      );
      
      const historicalRes = await fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}'
      );
  
      if (!currentRes.ok || !historicalRes.ok) throw new Error('Weather data unavailable');
  
      const currentData = await currentRes.json();
      const historicalData = await historicalRes.json();
  
      return {
        current: {
          temp: currentData.main.temp,
          humidity: currentData.main.humidity,
          weather: currentData.weather
        },
        historical: historicalData.list.slice(0, 5).map((item: any) => ({
          dt: item.dt,
          temp: item.main.temp,
          humidity: item.main.humidity,
          weather: item.weather
        }))
      };
    } catch {
      return { current: null, historical: [] };
    }
  };