import React, { useState } from 'react';

const UserText = ({ onSubmit, onClose }) => {
  const [userText, setUserText] = useState('');

  const handleTextChange = (e) => {
    setUserText(e.target.value);
  };

  const handleSubmit = () => {
    if (userText.trim()) {
      onSubmit(userText);
      setUserText('');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto p-6 bg-white/90 rounded-lg font-sans">
      <h2 
        className="text-3xl font-bold mb-6 text-gray-800" 
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Express Your Thoughts
      </h2>
      
      <textarea
        value={userText}
        onChange={handleTextChange}
        className="w-full h-48 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base"
        placeholder="Please describe the issue you are facing..."
      />
      
      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleSubmit}
          className="px-7 py-2 bg-blue-500 text-white rounded-md transition-all duration-300 hover:bg-blue-600 hover:scale-105"
        >
          Ask AI
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-7 py-2 bg-gray-500 text-white rounded-md transition-all duration-300 hover:bg-gray-600 hover:scale-105"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default UserText;
