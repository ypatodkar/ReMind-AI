import React, { useState } from 'react';
import Emotions from './emotions';
import Activities from './activities'; // Import the activities screen

const CheckInModal = ({ isModalOpen, setIsModalOpen }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  // Step 1: Select Emoji
  const handleEmojiClick = (emojiName) => {
    setSelectedEmoji(emojiName);
  };

  // Step 2: Select Emotion
  const handleEmotionClick = (emotionName) => {
    setSelectedEmotion(emotionName);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-3/5 h-3/5 rounded-lg p-6 flex flex-col items-center justify-center">
        {/* Step 3: Show Activities if an emotion is selected */}
        {selectedEmotion ? (
          <Activities />
        ) : selectedEmoji ? (
          // Step 2: Show Emotions if an emoji is selected
          <Emotions emoji={selectedEmoji} onEmotionClick={handleEmotionClick} />
        ) : (
          // Step 1: Emoji selection
          <>
            <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
            <div className="flex space-x-8">
              <span className="text-4xl cursor-pointer" onClick={() => handleEmojiClick('sad')}>😞</span>
              <span className="text-4xl cursor-pointer" onClick={() => handleEmojiClick('neutral')}>😐</span>
              <span className="text-4xl cursor-pointer" onClick={() => handleEmojiClick('happy')}>😊</span>
              <span className="text-4xl cursor-pointer" onClick={() => handleEmojiClick('excited')}>😁</span>
            </div>
          </>
        )}

        {/* Close Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
