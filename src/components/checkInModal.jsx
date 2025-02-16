import React, { useState } from 'react';
import Emotions from './Emotions';
import Activities from './Activities';
import UserText from './UserText';

const CheckInModal = ({ isModalOpen, setIsModalOpen }) => {
  const [step, setStep] = useState(1);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [userText, setUserText] = useState('');

  const [entry, setEntry] = useState(null); // To store the final entry object

  const generateEntryId = () => {
    return Math.floor(Math.random() * 1000000); // Generate a random number as entryId
  };

  // Step 1: User picks an emoji
  const handleEmojiPick = (emojiName) => {
    setSelectedEmoji(emojiName);
    setStep(2); // go to Emotions
  };

  // Step 2: Emotions next
  const handleEmotionsNext = (emotions) => {
    setSelectedEmotions(emotions);
    setStep(3); // go to Activities
  };

  // Step 3: Activities next
  const handleActivitiesNext = (activities) => {
    setSelectedActivities(activities);
    setStep(4); // go to UserText
  };

  // Step 4: Submit text
  const handleTextSubmit = (text) => {
    const currentDate = new Date().toLocaleDateString(); // Get current date in 'MM/DD/YYYY' format
    const entryId = generateEntryId(); // Generate a random entryId

    const newEntry = {
      entryId: entryId,
      date: currentDate,
      text: text,
      emotions: selectedEmotions, // Store emotions as array of strings
      categories: selectedActivities, // Store categories as activities
      ai: '', // Empty as per your requirement
      user_id: '', // Empty as per your requirement
    };

    setEntry(newEntry); // Store the new entry in the state
    console.log('Generated Entry:', newEntry);

    // Close modal after submission (or reset the state)
    setIsModalOpen(false);
    setStep(1); // reset steps for next entry
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-3/5 h-3/5 rounded-lg p-6 flex flex-col items-center justify-center">
        
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
            <div className="flex space-x-8">
              <span className="text-4xl cursor-pointer" onClick={() => handleEmojiPick('sad')}>😞</span>
              <span className="text-4xl cursor-pointer" onClick={() => handleEmojiPick('neutral')}>😐</span>
              <span className="text-4xl cursor-pointer" onClick={() => handleEmojiPick('happy')}>😊</span>
              <span className="text-4xl cursor-pointer" onClick={() => handleEmojiPick('excited')}>😁</span>
            </div>
          </>
        )}

        {step === 2 && (
          <Emotions emoji={selectedEmoji} onNext={handleEmotionsNext} />
        )}

        {step === 3 && (
          <Activities onNext={handleActivitiesNext} />
        )}

        {step === 4 && (
          <UserText onSubmit={handleTextSubmit} />
        )}

        {/* Close Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setIsModalOpen(false);
              setStep(1); // reset steps
            }}
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
