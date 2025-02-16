import React, { useState, useEffect } from 'react';
import emotionsData from '../resources/emotions.json';

const Emotions = ({ emoji, onEmotionClick }) => {
  const [emotionType, setEmotionType] = useState('positive');
  const [emotionsList, setEmotionsList] = useState([]);

  useEffect(() => {
    if (emotionsData[emoji]) {
      setEmotionsList(Object.entries(emotionsData[emoji][emotionType] || {}));
    }
  }, [emoji, emotionType]);

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-4">Pick an Emotion</h2>

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
            className="text-3xl p-2"
            onClick={() => onEmotionClick(emotionName)}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Emotions;
