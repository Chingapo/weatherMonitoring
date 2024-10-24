import React from 'react';

interface UnitSelectorProps {
  unit: 'metric' | 'standard';
  setUnit: (unit: 'metric' | 'standard') => void;
  setTemperatureThreshold: (threshold: number | undefined) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ unit, setUnit, setTemperatureThreshold }) => {
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value as 'metric' | 'standard');
    setTemperatureThreshold(undefined);
  };

  return (
    <div className="rounded-full">
      <select
        id="unit"
        value={unit}
        onChange={handleUnitChange}
        className="block w-full bg-gray-800 rounded-full px-4 py-3 text-sm"
      >
        <option value="metric">Celsius</option>
        <option value="standard">Kelvin</option>
      </select>
    </div>
  );
};

export default UnitSelector;
