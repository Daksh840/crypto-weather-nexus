"use client";
import React, { useEffect, useState } from "react";

const CurrentWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const city = "London"; // You can make this dynamic later
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch failed:", err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div>Loading Weather...</div>;
  if (!weather) return <div>Weather data not available</div>;

  return (
    <div className="p-4 border rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">Weather in {weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].main}</p>
    </div>
  );
};

export default CurrentWeather;
