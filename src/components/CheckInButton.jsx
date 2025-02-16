// CheckInButton.js
import React from 'react';

const CheckInButton = ({ dayName, dayDate, day, isChecked, onCheckIn }) => {
    return (
        <div className="flex flex-col items-center">
            <button
                className={`w-16 h-16 flex flex-col items-center justify-center rounded-full text-white font-semibold ${isChecked ? 'bg-green-500' : 'bg-gray-500'}`}
                onClick={() => onCheckIn(day)}
            >
                <span className="text-sm">{dayName}</span>
                <span className="text-lg">{dayDate.slice(5, 10)}</span>
            </button>
        </div>
    );
};

export default CheckInButton;
