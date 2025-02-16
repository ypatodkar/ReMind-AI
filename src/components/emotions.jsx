import React, { useState, useEffect } from 'react';
import emotionsData from '../resources/emotions.json';

const Emotions = ({ emoji, onEmotionClick, onNext }) => {
  const [emotionType, setEmotionType] = useState('positive');
  const [emotionsList, setEmotionsList] = useState([]);
  const [selectedEmotions, setSelectedEmotions] = useState([]);

  useEffect(() => {
    if (emotionsData[emoji]) {
      setEmotionsList(Object.entries(emotionsData[emoji][emotionType] || {}));
    }
  }, [emoji, emotionType]);

  const handleEmotionClick = (emotionName) => {
    setSelectedEmotions((prevSelected) => {
      if (prevSelected.includes(emotionName)) {
        // If already selected, remove it
        return prevSelected.filter((emotion) => emotion !== emotionName);
      } else {
        // If not selected, add it
        return [...prevSelected, emotionName];
      }
    });
  };

  const handleNextClick = () => {
    if (selectedEmotions.length > 0) {
      onNext(selectedEmotions); // Pass selected emotions to the next step
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-4">Pick Emotions</h2>

      {/* Positive & Negative Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${emotionType === 'positive' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setEmotionType('positive')}
        >
          Positive
        </button>
        <button
          className={`px-4 py-2 rounded-md ${emotionType === 'negative' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setEmotionType('negative')}
        >
          Negative
        </button>
      </div>

      {/* Emotion Icons Grid */}
      <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-40">
        {emotionsList.map(([emotionName, icon]) => (
          <button
            key={emotionName}
            className={`text-3xl p-2 ${selectedEmotions.includes(emotionName) ? 'bg-yellow-300' : ''}`}
            onClick={() => handleEmotionClick(emotionName)}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Display selected emotions */}
      <div className="mt-4">
        <h3 className="text-lg">Selected Emotions:</h3>
        <div className="flex space-x-2">
          {selectedEmotions.map((emotion) => (
            <span key={emotion} className="text-lg font-bold">{emotion}</span>
          ))}
        </div>
      </div>

      {/* Next Button */}
      {selectedEmotions.length > 0 && (
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

export default Emotions;
