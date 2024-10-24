"use client"
import { useEffect, useState } from "react";
import UnitSelector from "./components/Common/UnitSelector";
import AlertSection from "./components/Weather/AlertSection";
import WeatherComponent from "./components/Weather/WeatherComponent";
import useWeather from "./hooks/useWeather";
import WeatherMonitoring from "./components/Common/ThresholdInput";



export default function Page() {

  const { weatherData, loading, unit, setUnit, alerts, setAlerts, setTemperatureThreshold } = useWeather();
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && weatherData.length > 0) {
      const currentTime = new Date().toLocaleString();
      setLastFetched(currentTime);
    }
  }, [loading, weatherData]);

    return (
      <div className="p-9 bg[#121212]">
        <div className="relative flex justify-center items-center mb-6">
          <h1 className="text-4xl font-extrabold text-white">Weather Dashboard</h1>
          <div className="absolute right-0">
            <UnitSelector unit={unit} setUnit={setUnit} setTemperatureThreshold={setTemperatureThreshold} />
          </div>
        </div>
        {lastFetched && (
          <div className="text-center text-gray-500 text-sm">
            <span className="font-medium">Last Updated:</span> {lastFetched}
          </div>
        )}

        

        {/* <ThresholdInput unit={unit} setAlerts={setAlerts} setTemperatureThreshold={setTemperatureThreshold} /> */}
        <WeatherMonitoring weatherData={weatherData} unit={unit} setAlerts={setAlerts} />
        <AlertSection alerts={alerts} />

        <WeatherComponent unit={unit}/>
      </div>
    );
}
