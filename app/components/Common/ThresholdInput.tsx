import React, { useState } from 'react';

interface ThresholdInputProps {
  unit: 'metric' | 'standard';
  setTemperatureThreshold: (threshold: number) => void;
  setAlerts: (alerts: string[]) => void;
}

const ThresholdInput: React.FC<ThresholdInputProps> = ({ unit, setTemperatureThreshold, setAlerts }) => {
  const [inputThreshold, setInputThreshold] = useState<number | null>(null);

  const handleSetThreshold = () => {
    if (inputThreshold !== null) {
      setAlerts([]);
      setTemperatureThreshold(inputThreshold);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center justify-center space-x-4 ">
        <label className="text-lg font-semibold text-gray-300 whitespace-nowrap">
          Set Temperature Threshold ({unit === 'metric' ? '°C' : 'K'}):
        </label>
        <input
          type="number"
          value={inputThreshold !== null ? inputThreshold : ''}
          onChange={(e) => setInputThreshold(Number(e.target.value))}
          placeholder={`Enter threshold in ${unit === 'metric' ? 'Celsius' : 'Kelvin'}`}
          className=" bg-gray-800 rounded-md text-white pl-2 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm "
        />
        <button
          onClick={handleSetThreshold}
          className="px-4 py-2 whitespace-nowrap bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Set Threshold
        </button>
      </div>
    </div>
  );
};

export default ThresholdInput;
