import { WeatherData } from '@/app/types/weather';
import React from 'react';

interface WeatherItemProps {
  data: WeatherData;
  unit: 'metric' | 'standard';
  dominantWeather: string; // New prop for dominant weather
}

const convertUnixToDateTime = (unixTime: number) => {
  return new Date(unixTime * 1000).toLocaleString();
};

// Convert Kelvin to Celsius if needed
const convertTemperature = (temp: number, unit: 'metric' | 'standard') => {
  if (unit === 'standard') {
    return (temp + 273.15).toFixed(2); // Convert Kelvin to Celsius
  }
  return temp.toFixed(2); // Keep Kelvin as it is
};

const WeatherItem: React.FC<WeatherItemProps> = ({ data, unit, dominantWeather }) => {
  return (
    <div className="bg-black rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-2">
        {data.name}, <span className="text-gray-500">{data.sys.country}</span>
      </h2>
      <p className="text-lg">
        Temperature: <strong>{convertTemperature(data.main.temp, unit)}{unit === 'metric' ? '°C' : 'K'}</strong>
      </p>
      <p className="text-lg">
        Feels Like: <strong>{convertTemperature(data.main.feels_like, unit)}{unit === 'metric' ? '°C' : 'K'}</strong>
      </p>
      <p className="text-lg">
        Weather: <strong>{data.weather[0].description}</strong>
      </p>
      <p className="text-lg">
        Dominant Weather Today: <strong>{dominantWeather}</strong> {/* New dominant weather display */}
      </p>
      <p className="text-lg">
        Humidity: <strong>{data.main.humidity}%</strong>
      </p>
      <p className="text-lg">
        Wind Speed: <strong>{data.wind.speed} m/s</strong>
      </p>
      <p className="text-lg">
        Pressure: <strong>{data.main.pressure} hPa</strong>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Weather updated at: <strong>{convertUnixToDateTime(data.dt)}</strong>
      </p>
    </div>
  );
};

export default WeatherItem;
