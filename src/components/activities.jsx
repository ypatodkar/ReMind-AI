import React from 'react';
import activitiesData from '../resources/activities.json'; // Import activities data

const Activities = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-4">What have you been up to?</h2>

      {/* Activities Grid */}
      <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-40">
        {activitiesData.activities.map((activity, index) => {
          const [activityName, icon] = Object.entries(activity)[0];
          return (
            <button key={index} className="text-3xl p-2">
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Activities;
