// Activities.jsx
import React, { useState } from 'react';
import activitiesData from '../resources/activities.json'; // Import activities data

const Activities = ({ onNext }) => { // Ensure onNext is being used
  const [selectedActivities, setSelectedActivities] = useState([]);

  const handleActivityClick = (activityName) => {
    setSelectedActivities((prevSelected) => {
      if (prevSelected.includes(activityName)) {
        // If already selected, remove it
        return prevSelected.filter((activity) => activity !== activityName);
      } else {
        // If not selected, add it
        return [...prevSelected, activityName];
      }
    });
  };

  const handleNextClick = () => {
    if (selectedActivities.length > 0) {
      onNext(selectedActivities); // Pass selected activities to the next step
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-4">What have you been up to?</h2>

      {/* Activities Grid */}
      <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-40">
        {activitiesData.activities.map((activity, index) => {
          const [activityName, icon] = Object.entries(activity)[0];
          return (
            <button
              key={index}
              className={`text-3xl p-2 ${selectedActivities.includes(activityName) ? 'bg-yellow-300' : ''}`}
              onClick={() => handleActivityClick(activityName)}
            >
              {icon}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {selectedActivities.length > 0 && (
        <button
          onClick={handleNextClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Activities;
