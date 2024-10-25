import { cities } from '@/app/data/cities';
import { db } from '@/utils/firebase';
import { WeatherData } from '@/app/types/weather';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useWeather = () => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<'metric' | 'standard'>('metric'); // metric for metric, standard for Kelvin
    const [dailyData, setDailyData] = useState<Record<string, WeatherData[]>>({}); // to store data accross a day
    const [temperatureThreshold, setTemperatureThreshold] = useState<number | undefined>(undefined); // Alert threshold
    const [alerts, setAlerts] = useState<string[]>([]); // Array to hold alerts

    const calculateDailySummary = async () => {
        for (const city of cities) {
            const cityData = dailyData[city.name];
            if (cityData) {
                const temperatures = cityData.map((data) => data.main.temp);
                const dominantWeather = calculateDominantWeather(cityData);

                const dailySummary = {
                    avgTemp: (temperatures.reduce((a, b) => a + b, 0) / temperatures.length).toFixed(2),
                    maxTemp: Math.max(...temperatures),
                    minTemp: Math.min(...temperatures),
                    dominantWeather,
                    date: new Date().toISOString(),
                };

                // Save to Firebase
                const cityDocRef = doc(db, "dailyWeatherSummaries", city.name);
                await setDoc(cityDocRef, { [new Date().toISOString().split('T')[0]]: dailySummary }, { merge: true });
            }
        }
    };

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            const responses = await Promise.all(
                cities.map(async (city) => {
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.countryCode}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=${unit}`
                    );
                    if (!res.ok) {
                        throw new Error(`Error fetching weather data for ${city.name}`);
                    }
                    const data = await res.json();
                    setDailyData((prevData) => ({
                        ...prevData,
                        [city.name]: [...(prevData[city.name] || []), data],
                    }));
                    return data;
                })
            );


            const newAlerts: string[] = [];
            if (temperatureThreshold !== null) {
                responses.forEach(data => {
                    console.log(unit)
                    const temp = data.main.temp; // Convert Kelvin to metric if unit is metric
                    
                    console.log(temp);
                    console.log(temperatureThreshold)
                    // Check if the temperature exceeds the threshold
                    if (temperatureThreshold !== undefined && temp > temperatureThreshold) {
                        newAlerts.push(`Alert: ${data.name} temperature exceeds ${temperatureThreshold}°${unit === 'metric' ? 'C' : 'K'}!`);
                    }
                });
            }

            // Update the state
            setAlerts(newAlerts);
            setWeatherData(responses);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const calculateDominantWeather = (cityData: WeatherData[]) => {
        const weatherCounts: Record<string, number> = {};
        cityData.forEach(data => {
            const weather = data.weather[0].main;
            weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
        });
        return Object.keys(weatherCounts).reduce((a, b) => (weatherCounts[a] > weatherCounts[b] ? a : b));
    };

    useEffect(() => {
        fetchWeatherData();
        const interval = setInterval(fetchWeatherData, Number(process.env.NEXT_PUBLIC_WEATHER_UPDATE_INTERVAL)); // Fetch every 5 minutes
        const now = new Date();
        const timeUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
        const midnightTimeout = setTimeout(() => {
            calculateDailySummary();
        }, timeUntilMidnight);

        return () => {
            clearInterval(interval);
            clearTimeout(midnightTimeout);
        };
    }, [unit, temperatureThreshold]);

    return { weatherData, loading, error, unit, setUnit, alerts, setAlerts, setTemperatureThreshold, calculateDominantWeather };
};

export default useWeather;