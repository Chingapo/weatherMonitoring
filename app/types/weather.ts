export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  
  export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
  }
  
  export interface Sys {
    country: string;
  }
  
  export interface WeatherData {
    name: string;
    weather: Weather[];
    main: Main;
    wind: Wind;
    sys: Sys;
    dt: number;
  }
  
  export interface DailySummary {
    avgTemp: number;
    maxTemp: number;
    minTemp: number;
    dominantWeather: string;
  }
  