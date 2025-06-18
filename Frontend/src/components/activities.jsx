import React, { useState } from 'react';
import activitiesData from '../resources/activities.json';

const Activities = ({ onNext }) => {
  const [selectedActivities, setSelectedActivities] = useState([]);

  const handleActivityClick = (activityName) => {
    setSelectedActivities((prevSelected) => {
      if (prevSelected.includes(activityName)) {
        return prevSelected.filter((activity) => activity !== activityName);
      } else {
        return [...prevSelected, activityName];
      }
    });
  };

  const handleNextClick = () => {
    if (selectedActivities.length > 0) {
      onNext(selectedActivities);
    }
  };

  return (
    <div className="bg-lavender p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center">What have you been up to?</h2>

      <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-48 w-full">
        {activitiesData.activities.map((activity, index) => {
          const [activityName, icon] = Object.entries(activity)[0];
          return (
            <div key={index} className="flex flex-col items-center">
              <button
                className={`text-4xl p-3 rounded-lg hover:bg-gray-200 focus:outline-none ${selectedActivities.includes(activityName) ? 'bg-yellow-300' : ''}`}
                onClick={() => handleActivityClick(activityName)}
              >
                {icon}
              </button>
              <span className="text-sm mt-1">{activityName}</span>
            </div>
          );
        })}
      </div>

      {selectedActivities.length > 0 && (
        <button
          onClick={handleNextClick}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full focus:outline-none"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Activities;