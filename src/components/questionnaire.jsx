import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questionnaireData from '../resources/questionnaire.json';

export const QuestionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
  const [responses, setResponses] = useState({});

  return (
    <QuestionnaireContext.Provider value={{ responses, setResponses }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => useContext(QuestionnaireContext);

const Questionnaire = () => {
  const { responses, setResponses } = useQuestionnaire();
  const navigate = useNavigate();

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">{questionnaireData.title}</h1>
      <p className="text-md text-gray-600 mb-6 text-center">{questionnaireData.instructions}</p>
      {questionnaireData.questions.map((question) => (
        <div key={question.id} className="mb-6 border-b pb-4">
          <p className="text-lg font-medium mb-2">{question.text}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {Array.from({ length: 10 }, (_, index) => (
              <label key={index} className="flex flex-col items-center">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index + 1}
                  checked={responses[question.id] === index + 1}
                  onChange={() => handleChange(question.id, index + 1)}
                  className="accent-blue-500"
                />
                <span className="text-sm mt-1">{index + 1}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button 
        onClick={handleSubmit} 
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
        Submit
      </button>
    </div>
  );
};

export default Questionnaire;
