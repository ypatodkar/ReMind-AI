import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sentencesData from '../resources/staticQuestions.json';

const NewUserForm = () => {
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSelection = (sentenceIndex, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [sentenceIndex]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [sentenceIndex]: false
    }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    sentencesData.sentences.forEach((_, index) => {
      if (!responses[index]) {
        newErrors[index] = true;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">New User Form</h1>
      {sentencesData.sentences.map((sentence, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <p className="text-lg font-medium mb-2">{sentence}</p>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
                <span>1</span>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={responses[index] || 0} 
                  onChange={(e) => handleSelection(index, parseInt(e.target.value))} 
                  className="w-3/4 appearance-none bg-gray-300 cursor-pointer rounded-lg" 
                />
                <span>10</span>
            </div>
            <span className="text-sm mt-1">{responses[index] ? responses[index] : 'Select a value'}</span>
            {errors[index] && <p className="text-red-500 text-xs mt-1">Selection is required</p>}
          </div>
        </div>
      ))}
      <button 
        onClick={handleSubmit} 
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default NewUserForm;