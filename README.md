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
```

## Requirements
- **Node.js (version 14.x or higher)**
- **Firebase account for data storage**
- **Git for cloning the repository**
- **OpenWeatherMap API key**


## Setup Instructions
### Step 1: Clone the Repository
```
git clone https://github.com/Chingapo/weatherMonitoring
cd weatherMonitoring
```
### Step 2: Firebase Configuration

- Create a Firebase project at the Firebase Console.
- Add Firebase Firestore and create a database.
- Download the Firebase configuration JSON and replace the firebase.ts in the utils/ directory.

### Step 3: Environment Variables
- Create a .env.local file and add your OpenWeatherMap API key:
```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_WEATHER_UPDATE_INTERVAL=300000 # 5 minutes in milliseconds
```

Step 4: Start the Application
Install the necessary dependencies:

```
npm install
```
Then, start the application:

```
npm run dev
```
The application will run locally on http://localhost:3000.

## Database Schema

The project stores daily summaries for each city in Firestore:

### Daily Summary Document
- **avgTemp**: Average temperature for the day.
- **maxTemp**: Maximum temperature recorded.
- **minTemp**: Minimum temperature recorded.
- **dominantWeather**: Most frequently observed weather condition.
- **date**: Date of the summary.

### Example Document:
```
{
  "avgTemp": 23.5,
  "maxTemp": 30.0,
  "minTemp": 18.3,
  "dominantWeather": "Cloudy",
  "date": "2023-10-24"
}
```
Key Components and Functions
1. Weather Data Fetching
fetchWeatherData(): Fetches data from OpenWeatherMap API for each city, storing the result in dailyData.
API Endpoint: OpenWeatherMap current weather endpoint, with units specified by the user (metric or standard).
2. Daily Summary Calculation
calculateDailySummary(): Aggregates data at midnight to calculate average, max, and min temperatures, and the most frequent weather condition, saving the result in Firebase Firestore.
3. Temperature-Based Alerts
Alert Logic: Compares each city’s temperature to the user-defined threshold. If exceeded, an alert is added to the alerts state.
Dynamic Unit Display: Alerts show temperature in Celsius or Kelvin, depending on user preference.
Example Alert
plaintext
Copy code
"Alert: New York temperature exceeds 35°C!"
Future Extensions
Historical Data Visualization: Graph daily summaries to visualize trends.
Notification System: Implement push notifications for real-time alerting.
Testing and Verification
The following tests are recommended for system validation:

Real-Time Fetching: Verify that the system fetches weather data every five minutes.
Alert System: Set a temperature threshold and confirm alerts trigger correctly.
Data Aggregation: Ensure that daily summaries are calculated and stored accurately at midnight.
Error Handling: Confirm error messages display when API requests fail.
Dependencies
React
Firebase Admin SDK
OpenWeatherMap API
Bonus Features
User-Defined Alert Thresholds: Dynamic alerting based on customizable temperature limits.
Daily Aggregation and Analysis: Analyzes daily trends and stores data for historical tracking.
Real-Time Updates: Ensures constant weather updates and midnight resets for daily summaries.


                   
