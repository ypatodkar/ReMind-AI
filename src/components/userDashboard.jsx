import React, { useState } from 'react';
import Navbar from './navBar';
const UserDashboard = () => {
  const [checkedInDays, setCheckedInDays] = useState([]);

  const handleCheckIn = (day) => {
    setCheckedInDays((prev) => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  // Get last 7 days
  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayName = date.toLocaleString('en-US', { weekday: 'short' }); 
      const dayDate = date.toLocaleDateString('en-US'); 
      days.push({ dayName, dayDate, day: i + 1 });
    }
    return days;
  };

  const last7Days = getLast7Days();

  return (
    <>
    <Navbar />
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Your Dashboard</h1>
      
      <div className="flex space-x-4 justify-center">
        {last7Days.map(({ dayName, dayDate, day }) => (
          <div key={day} className="flex flex-col items-center">
            <button
              className={`w-24 h-24 flex flex-col items-center justify-center rounded-full text-white font-semibold ${checkedInDays.includes(day) ? 'bg-green-500' : 'bg-gray-500'}`}
              onClick={() => handleCheckIn(day)}
            >
              <span className="text-sm">{dayName}</span> 
              <span className="text-xl">{dayDate.slice(5, 10)}</span> {/* Show only MM/DD */}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default UserDashboard;
