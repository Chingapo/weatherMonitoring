'use client';

import React from 'react';
import useWeather from '../../hooks/useWeather';
import WeatherItem from './WeatherItem';
import WeatherCharts from './WeatherCharts';

interface WeatherComponentProps {
  unit: 'metric' | 'standard';
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ unit }) => {
  const { weatherData, loading, error, calculateDominantWeather } = useWeather();

  if (loading) return <div className="text-center mt-10 text-xl text-gray-700">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>;

  return (
    <div className="rounded-lg duration-300 hover:shadow-2xl">
      <div className="max-w-6xl mx-auto">
        <WeatherCharts unit={unit} />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {weatherData.map((data, index) => (
          <li key={index} className="bg-black border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-95">
            <WeatherItem 
              data={data} 
              unit={unit} 
              dominantWeather={calculateDominantWeather(weatherData)} // Get dominant weather for each city
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherComponent;
