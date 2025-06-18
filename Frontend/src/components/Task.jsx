import React from 'react';
import checkin from '../images/checkin.png';
import affirmation from '../images/affirmation.png';

const Task = ({ task, isChecked, onTaskCheck, onModalOpen }) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onTaskCheck(task)} // Checkbox toggles based on task check logic
        className="w-6 h-6 accent-green-500 cursor-pointer"
      />
      <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center w-full">
        <img 
          src={task === 'affirmation' ? affirmation : checkin} 
          alt={`${task} icon`} 
          className="w-16 h-16 mr-4" 
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {task.charAt(0).toUpperCase() + task.slice(1)}
          </h2>
          <p className="text-sm">{`Stay positive with daily ${task}s`}</p>
        </div>
        {task === 'affirmation' && (
          <button
            onClick={onModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            View
          </button>
        )}
        {task === 'checkin' && (
          <button
            onClick={onModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Check-In
          </button>
        )}
      </div>
    </div>
  );
};


export default Task;
