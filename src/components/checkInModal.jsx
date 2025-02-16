import React, { useState } from 'react';
import Emotions from './emotions';
import Activities from './activities';
import UserText from './UserText';
import { RingLoader } from 'react-spinners';

const CheckInModal = ({ isModalOpen, setIsModalOpen, setAiResponse }) => {
  const [step, setStep] = useState(1);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [userText, setUserText] = useState('');
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateEntryId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleEmojiPick = (emojiName) => {
    setSelectedEmoji(emojiName);
    setStep(2);
  };

  const handleEmotionsNext = (emotions) => {
    setSelectedEmotions(emotions);
    setStep(3);
  };

  const handleActivitiesNext = (activities) => {
    setSelectedActivities(activities);
    setStep(4);
  };

  const checkAiResponse = async (user_id, entryId) => {
    setIsLoading(true);
    try {
      while (true) {
        console.log("Checking AI response...");
        const aiResponse = await fetch(`http://127.0.0.1:5000/dashboard/entries?user_id=${user_id}&entry_id=${entryId}`);
        if (!aiResponse.ok) {
          console.log("Error fetching AI response, retrying...");
        } else {
          const dataList = await aiResponse.json();
          const data = Array.isArray(dataList) ? dataList.find(entry => entry.entry_id === entryId) : dataList;

          if (data) {
            if (data.ai) {
              console.log("AI Response Received:", data.ai);
              setEntry((prevEntry) => ({ ...prevEntry, ai: data.ai }));
              setIsLoading(false);
              setIsModalOpen(false);
              setAiResponse(data);
              setStep(1);
              return;
            } else {
              console.log("AI response not yet available, retrying...");
            }
          } else {
            console.log("Entry not found yet, retrying...");
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setIsLoading(false);
    }
  };

  const handleTextSubmit = async (text) => {
    setIsLoading(true);
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

    try {
      await fetch('http://127.0.0.1:5000/dashboard/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
      console.log("Entry submitted successfully!");
      await checkAiResponse(user_id, entryId);
    } catch (error) {
      console.error('Error submitting entry:', error);
      setIsLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-3/5 h-3/5 rounded-lg p-6 flex flex-col items-center justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
            <RingLoader color="#36d7b7" size={80} />
          </div>
        )}

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
          <UserText onSubmit={handleTextSubmit} isLoading={isLoading} />
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setIsModalOpen(false);
              setStep(1);
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