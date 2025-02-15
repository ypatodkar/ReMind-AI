import React, { useState } from 'react';
import sentencesData from '../resources/staticQuestions.json'; // Ensure you have the JSON file in the same directory


const NewUserForm = () => {
  const [responses, setResponses] = useState({});

  const handleSelection = (sentenceIndex, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [sentenceIndex]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await fetch('/api/saveResponses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses)
      });
      alert('Responses saved successfully!');
    } catch (error) {
      console.error('Error saving responses:', error);
    }
  };

  return (
    <div>
      {sentencesData.sentences.map((sentence, index) => (
        <div key={index}>
          <p>{sentence}</p>
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <label key={i} style={{ marginRight: '10px' }}>
                <input 
                  type="radio" 
                  name={`sentence-${index}`} 
                  value={i + 1} 
                  checked={responses[index] === i + 1}
                  onChange={() => handleSelection(index, i + 1)}
                /> {i + 1}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewUserForm;
