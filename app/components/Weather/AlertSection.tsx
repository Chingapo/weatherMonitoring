import React from 'react';

interface AlertSectionProps {
  alerts: string[];
}

const AlertSection: React.FC<AlertSectionProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="bg-red-500 text-white p-4 max-w-lg mx-auto rounded-lg mt-4 shadow-md">
      {alerts.map((alert, index) => (
        <p key={index} className="text-sm font-medium text-center m-2">
          {alert}
        </p>
      ))}
    </div>
  );
};

export default AlertSection;
