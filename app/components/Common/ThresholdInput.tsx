import { WeatherData } from '@/app/types/weather';
import React, { useEffect, useState } from 'react';

interface WeatherMonitoringProps {
  weatherData: WeatherData[];
  unit: 'metric' | 'standard';
  setAlerts: (alerts: string[]) => void; // Function to set alerts in parent
}

const WeatherMonitoring: React.FC<WeatherMonitoringProps> = ({
  weatherData,
  unit,
  setAlerts,
}) => {
  const [inputThreshold, setInputThreshold] = useState<number | null>(null);

  const checkThresholdAlerts = () => {
    if (inputThreshold !== null) {
      const newAlerts: string[] = [];

      weatherData.forEach((cityWeather) => {
        // Determine the current temperature based on unit
        const currentTemp = cityWeather.main.temp; // Adjust for units

        // Check if the current temperature exceeds the threshold
        if (currentTemp > inputThreshold) {
          newAlerts.push(`${cityWeather.name} temperature exceeded threshold (${currentTemp.toFixed(1)}°${unit === 'metric' ? 'C' : 'K'})`);
        }
      });

      // Pass new alerts to the parent component
      setAlerts(newAlerts);
    }
  };

  // Clears alerts when called
  const clearAlerts = () => {
    setAlerts([]); // Clear alerts
  };

  return (
    <div className="weather-monitoring">
      <h1 className="text-2xl font-bold text-center mb-4">Weather Monitoring</h1>
      <div className="mt-5 flex items-center justify-center space-x-4">
        <label className="text-lg font-semibold text-gray-300 whitespace-nowrap">
          Set Temperature Threshold ({unit === 'metric' ? '°C' : 'K'}):
        </label>
        <input
          type="number"
          value={inputThreshold !== null ? inputThreshold : ''}
          onChange={(e) => setInputThreshold(Number(e.target.value))}
          placeholder={`Enter threshold in ${unit === 'metric' ? 'Celsius' : 'Kelvin'}`}
          className="bg-gray-800 rounded-md text-white pl-2 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <button
          onClick={checkThresholdAlerts}
          className="px-4 py-2 whitespace-nowrap bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Set Threshold
        </button>
        <button
          onClick={clearAlerts}
          className="px-3 py-2 whitespace-nowrap bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Clear Alerts
        </button>
      </div>
    </div>
  );
};

export default WeatherMonitoring;
