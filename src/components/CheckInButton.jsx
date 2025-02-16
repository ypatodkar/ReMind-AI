import React from 'react';

const CheckInButton = ({ dayName, dayDate, day, isChecked, onCheckIn }) => {
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <button
        onClick={() => onCheckIn(day)}
        className={`w-24 h-16 flex flex-col items-center justify-center rounded-xl shadow-lg transition-all duration-300 ${
          isChecked
            ? 'bg-gradient-to-r from-green-400 to-teal-400'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <span className="text-xs font-medium text-gray-800">{dayName}</span>
        <span className="text-lg font-bold text-gray-800">{dayDate.slice(5, 10)}</span>
      </button>
    </div>
  );
};

export default CheckInButton;
