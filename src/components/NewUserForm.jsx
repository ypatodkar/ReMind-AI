import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sentencesData from '../resources/staticQuestions.json';
import './NewUserForm.css'; // Import custom CSS

const NewUserForm = () => {
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
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

  function convertKeysToString(obj) {
    if (Array.isArray(obj)) {
      return obj.map(convertKeysToString);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
        // Convert the key to a string (even though it's already a string in most cases)
        const newKey = String(key);
        acc[newKey] = convertKeysToString(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  }
  

  const handleSubmit = async () => {
    // Validate that every question has a response
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
    
    // Build the questions payload by mapping question text to response
    const questionsPayload = {};
    sentencesData.sentences.forEach((question, index) => {
      questionsPayload[question] = responses[index].toString();
    });
    
    // Compute total score as the sum of all responses
    const totalScore = Object.values(responses).reduce((acc, val) => acc + val, 0);
    const todayDate = new Date().toLocaleDateString('en-US');

    const payload = {
      user_id: localStorage.getItem('user_id') || "123",
      responses: questionsPayload,
      score: {
        todayDate: String(totalScore)
      }
    };


    try {
      // console.log("payload",JSON.stringify(payload));
      const response = await fetch("http://127.0.0.1:5000/questions/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }
      console.log("Submission successful:", data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">New User Form</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
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
                className="custom-range" 
              />
              <span>10</span>
            </div>
            <span className="text-sm mt-1">
              {responses[index] ? responses[index] : 'Select a value'}
            </span>
            {errors[index] && <p className="text-red-500 text-xs mt-1">Selection is required</p>}
          </div>
        </div>
      ))}
      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={handleSubmit} 
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewUserForm;
