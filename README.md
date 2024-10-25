# Real-Time Weather Monitoring and Alert System

## Overview
This Weather Monitoring and Alert System continuously tracks real-time weather conditions for multiple cities, storing and analyzing data for daily summaries and issuing temperature alerts based on user-defined thresholds. It integrates the OpenWeatherMap API to fetch current weather data and uses Firebase Firestore for storing daily summaries, making it an efficient, reliable tool for ongoing weather insights.

The project follows a modern architecture with core functionalities:
- **Frontend**: Developed with React.
- **Backend and Database**: Firebase Firestore is utilized to handle backend storage needs.

### Features
- **Real-Time Weather Monitoring**: Fetches and updates weather data for a predefined list of cities every five minutes.
- **Customizable Alerts**: Issues alerts when the temperature exceeds user-defined thresholds, supporting both metric (Celsius) and standard (Kelvin) units.
- **Daily Data Summarization**: Calculates and saves daily weather summaries, including average temperature, maximum and minimum temperatures, and the most frequent weather condition.
- **Firebase Storage**: Daily summaries are saved to Firebase Firestore for historical tracking and easy access.

## Project Structure
```bash
weatherMonitoring/
├── app/
│   ├── components/
│   │   ├── Common/
│   │   │   ├── ThresholdInput.tsx        # Component for setting and updating temperature thresholds for alerts.
│   │   │   └── UnitSelector.tsx          # Dropdown component for selecting temperature unit (Celsius/Kelvin).
│   │   ├── Weather/
│   │   │   ├── AlertSection.tsx          # Displays active alerts when temperature exceeds user-defined thresholds.
│   │   │   ├── WeatherCharts.tsx         # Visual representation of weather data trends (temperature, humidity, etc.).
│   │   │   ├── WeatherComponent.tsx      # Main component to display all weather information and controls.
│   │   │   └── WeatherItem.tsx           # Renders individual weather details for a specific city.
│   ├── data/
│   │   └── cities.ts                     # List of cities with their names and country codes for weather data retrieval.
│   ├── hooks/
│   │   └── useWeather.ts                 # Custom hook to fetch and manage weather data, handle alerts, and manage unit selection.
│   ├── types/
│   │   └── weather.ts                    # TypeScript interfaces defining the structure of weather data.
│   ├── favicon.ico                       # Icon displayed in the browser tab.
│   ├── globals.css                       # Global CSS styles applied across the application.
│   ├── layout.tsx                        # Main layout component that structures the overall page, including header and footer.
│   └── page.tsx                          # Root page component.
│   
├── utils/
│   └── firebase.ts                       # Firebase setup for storing and retrieving daily weather summaries.
├── .env.local                            # Local environment variables file (API keys for weather and Firebase).
├── package.json                          # Lists project dependencies..
└── tsconfig.json and other config files  # Configuration files.

                   
