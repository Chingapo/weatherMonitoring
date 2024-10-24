import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';
import useWeather from '@/app/hooks/useWeather';
import { cities } from '@/app/data/cities';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
SwiperCore.use([Navigation, Pagination]);

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, BarElement, Tooltip, Legend);

interface ChartData {
  temperature: {
    high: number[];
    low: number[];
    labels: string[];
  };
  precipitation: {
    values: number[];
    labels: string[];
  };
  humidity: {
    values: number[];
    labels: string[];
  };
}
interface WeatherChartsProps {
    unit: 'metric' | 'standard';
  }
  
  const WeatherCharts: React.FC<WeatherChartsProps> = ({ unit }) => {
    const { weatherData, loading, error } = useWeather();
    const [chartData, setChartData] = useState<ChartData>({
      temperature: { high: [], low: [], labels: [] },
      precipitation: { values: [], labels: [] },
      humidity: { values: [], labels: [] },
    });
  
    useEffect(() => {
      if (weatherData.length > 0) {
        processData(weatherData);
      }
    }, [weatherData, unit]); // Include `unit` in the dependencies to trigger re-render
  
    const processData = (weatherData: any) => {
      const tempHigh: number[] = [];
      const tempLow: number[] = [];
      const precip: number[] = [];
      const hum: number[] = [];
      const labels: string[] = cities.map((city) => city.name);
  
      for (const city of labels) {
        const cityWeather = weatherData.find((data: any) => data.name === city);
        if (cityWeather) {
          let highTemp = cityWeather.main.temp_max;
          let lowTemp = cityWeather.main.temp_min;
  
          // Convert temperatures based on unit
          if (unit === 'standard') {
            highTemp += 273.15; // Kelvin to Celsius conversion
            lowTemp += 273.15; // Kelvin to Celsius conversion
          }
  
          tempHigh.push(highTemp);
          tempLow.push(lowTemp);
          precip.push(cityWeather.rain?.['1h'] ?? 0);
          hum.push(cityWeather.main.humidity);
        }
      }
  
      setChartData({
        temperature: { high: tempHigh, low: tempLow, labels },
        precipitation: { values: precip, labels },
        humidity: { values: hum, labels },
      });
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-full mx-auto p-6">
      <Swiper spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }} navigation>
        <SwiperSlide>
          <div className="bg-black p-4 rounded-lg shadow w-full flex-shrink-0">
            <h2 className="text-center text-xl font-semibold mb-4">Temperature Trends</h2>
            <div className="chart-container">
              <Line
                data={{
                  labels: chartData.temperature.labels,
                  datasets: [
                    {
                      label: 'Max Temperature',
                      data: chartData.temperature.high,
                      borderColor: 'red',
                      fill: false,
                    },
                    {
                      label: 'Min Temperature',
                      data: chartData.temperature.low,
                      borderColor: 'blue',
                      fill: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: {
                    x: {
                      title: { display: true, text: 'City' },
                      ticks: { padding: 10 },
                    },
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: unit === 'metric' ? 'Temperature (°C)' : 'Temperature (K)',
                      },
                      ticks: { padding: 10 },
                    },
                  },
                }}
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-black p-4 rounded-lg shadow w-full flex-shrink-0">
            <h2 className="text-center text-xl font-semibold mb-4">Precipitation Levels</h2>
            <div className="chart-container">
              <Bar
                data={{
                  labels: chartData.precipitation.labels,
                  datasets: [
                    {
                      label: 'Precipitation (mm)',
                      data: chartData.precipitation.values,
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: {
                    x: {
                      title: { display: true, text: 'City' },
                      ticks: { padding: 10 },
                    },
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Precipitation (mm)' },
                      ticks: {
                        padding: 10, // Add padding to Y-axis ticks
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-black p-4 rounded-lg shadow w-full flex-shrink-0">
            <h2 className="text-center text-xl font-semibold mb-4">Humidity Levels</h2>
            <div className="chart-container">
              <Line
                data={{
                  labels: chartData.humidity.labels,
                  datasets: [
                    {
                      label: 'Humidity (%)',
                      data: chartData.humidity.values,
                      borderColor: 'green',
                      fill: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: {
                    x: {
                      title: { display: true, text: 'City' },
                      ticks: { padding: 10 },
                    },
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Humidity (%)' },
                      ticks: {
                        padding: 10, // Add padding to Y-axis ticks
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default WeatherCharts;
