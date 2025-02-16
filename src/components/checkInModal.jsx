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
  const handleTextSubmit = async (text) => {
    const currentDate = new Date().toLocaleDateString();
    const entryId = generateEntryId();
    const user_id = localStorage.getItem("user_id");
  
    const newEntry = {
      entry_id: String(entryId),
      date: currentDate,
      text: text,
      emotions: selectedEmotions,
      categories: selectedActivities,
      ai: '',
      user_id: user_id,
    };
  
    setEntry(newEntry);
    console.log('Generated Entry:', newEntry);
  
    try {
      console.log("Submitting entry...");
  
      const response = await fetch('http://127.0.0.1:5000/dashboard/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit entry');
      }
  
      console.log("Entry submitted successfully!");
  
      // Wait before checking AI response to ensure the entry is stored
      // setTimeout(() => checkAiResponse(user_id, entryId), 3000);
      await checkAiResponse(user_id, entryId)
    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  
    // Close modal after submission
    setIsModalOpen(false);
    setStep(1);
  };
   
  const checkAiResponse = async (user_id, entryId) => {
    let value = true; // Correctly named variable

    while (value) {
      try {
        console.log("Checking AI response...");
        const aiResponse = await fetch(`http://127.0.0.1:5000/dashboard/entries?user_id=${user_id}&entry_id=${entryId}`);
        
        if (aiResponse.status === 404) {
          console.log("Entry not found yet, retrying...");
        } else if (!aiResponse.ok) {
          throw new Error('Error fetching AI response');
        } else {
          const data = await aiResponse.json();
          if (data && data.ai) {
            console.log("AI Response Received:", data.ai);
            setEntry((prevEntry) => ({ ...prevEntry, ai: data.ai }));
            value = false; // Correctly stopping the loop
            break; // Exit the loop
          }
        }
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }

      // Wait 2 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
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
