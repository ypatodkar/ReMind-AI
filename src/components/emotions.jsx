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
      const emotionToSelect = { name: emotionName, icon: emotionsData[emoji][emotionType][emotionName] };

      const isSelected = prevSelected.some(selected => selected.name === emotionName);

      if (isSelected) {
        return prevSelected.filter((emotion) => emotion.name !== emotionName);
      } else {
        return [...prevSelected, emotionToSelect];
      }
    });
  };

  const handleNextClick = () => {
    if (selectedEmotions.length > 0) {
      onNext(selectedEmotions);
    }
  };

  return (
    <div className="bg-lavender p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center">Pick Emotions</h2>

      <div className="flex space-x-4 justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${emotionType === 'positive' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'} focus:outline-none`}
          onClick={() => setEmotionType('positive')}
        >
          Positive
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${emotionType === 'negative' ? 'bg-red-500 text-white' : 'bg-gray-300 hover:bg-gray-400'} focus:outline-none`}
          onClick={() => setEmotionType('negative')}
        >
          Negative
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-48 w-full">
        {emotionsList.map(([emotionName, icon]) => (
          <div key={emotionName} className="flex flex-col items-center">
            <button
              className={`text-4xl p-3 rounded-lg hover:bg-gray-200 focus:outline-none ${selectedEmotions.some(selected => selected.name === emotionName) ? 'bg-yellow-300' : ''}`}
              onClick={() => handleEmotionClick(emotionName)}
            >
              {icon}
            </button>
            <span className="text-sm mt-1">{emotionName}</span>
          </div>
        ))}
      </div>

      {selectedEmotions.length > 0 && (
        <button
          onClick={handleNextClick}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full focus:outline-none"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Emotions;