import { DailySummary } from '@/app/types/weather';
import React from 'react';

interface WeatherSummaryProps {
  dailySummary: DailySummary;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ dailySummary }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Daily Weather Summary</h2>
      <p>Average Temperature: {dailySummary.avgTemp}°C</p>
      <p>Max Temperature: {dailySummary.maxTemp}°C</p>
      <p>Min Temperature: {dailySummary.minTemp}°C</p>
      <p>Dominant Weather: {dailySummary.dominantWeather}</p>
    </div>
  );
};

export default WeatherSummary;
