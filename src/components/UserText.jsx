// UserText.jsx
import React, { useState } from 'react';

const UserText = ({ onSubmit }) => {
  const [userText, setUserText] = useState('');

  const handleTextChange = (e) => {
    setUserText(e.target.value);
  };

  const handleSubmit = () => {
    if (userText.trim()) {
      onSubmit(userText); // Pass the text to the parent component or handle it here
      setUserText(''); // Clear the input after submission
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-4">Elaborate Your Problem</h2>
      
      <textarea
        value={userText}
        onChange={handleTextChange}
        className="w-3/4 h-32 p-4 border rounded-md"
        placeholder="Please describe the issue you are facing..."
      />
      
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserText;
