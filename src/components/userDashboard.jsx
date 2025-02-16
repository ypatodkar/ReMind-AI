import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navBar';
import CheckInModal from './CheckInModal';
import CheckInButton from './CheckInButton';
import Task from './Task';
import Affirmation from './Affirmation';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [checkedInDays, setCheckedInDays] = useState([]);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isAffirmationModalOpen, setIsAffirmationModalOpen] = useState(false);

  // Fixed arrays for facts and quotes
  const mentalHealthFacts = [
    "1 in 4 people will experience a mental health issue in their lifetime.",
    "Mental and physical health are deeply connected.",
    "Exercise, nutrition, and sleep boost mental well-being.",
    "Early intervention improves long-term outcomes.",
    "Digital resources expand access to mental health care."
  ];

  const depressionQuotes = [
    "Depression is not a sign of weakness; it’s a reminder that you’ve been strong for far too long.",
    "Even in the darkest moments, a single ray of hope can illuminate your path.",
    "Healing begins when you acknowledge that you deserve to feel better, one day at a time."
  ];

  const handleTaskCheck = (task) => {
    setCheckedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  const handleCheckIn = (day) => {
    setCheckedInDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const openCheckInModal = () => setIsCheckInModalOpen(true);
  const closeCheckInModal = () => setIsCheckInModalOpen(false);
  const openAffirmationModal = () => setIsAffirmationModalOpen(true);
  const closeAffirmationModal = () => setIsAffirmationModalOpen(false);
  const markAffirmationAsDone = () => {
    handleTaskCheck('affirmation');
  };

  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayName = date.toLocaleString('en-US', { weekday: 'short' });
      const dayDate = date.toLocaleDateString('en-US');
      days.push({ dayName, dayDate, day: i + 1 });
    }
    return days;
  };

  const last7Days = getLast7Days();

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Dashboard</h1>

        {/* Check-In Buttons Row */}
        <div className="flex space-x-4 justify-center mb-8">
          {last7Days.map(({ dayName, dayDate, day }) => (
            <CheckInButton
              key={day}
              dayName={dayName}
              dayDate={dayDate}
              day={day}
              isChecked={checkedInDays.includes(day)}
              onCheckIn={handleCheckIn}
            />
          ))}
        </div>

        {/* Today's Tasks Section */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Today's Tasks</h2>
        <div className="max-w-3xl mx-auto pl-4 mb-8 space-y-4">
          <Task
            task="checkin"
            isChecked={checkedTasks.includes('checkin')}
            onTaskCheck={handleTaskCheck}
            onModalOpen={openCheckInModal}
          />
          <Task
            task="affirmation"
            isChecked={checkedTasks.includes('affirmation')}
            onTaskCheck={handleTaskCheck}
            onModalOpen={openAffirmationModal}
          />
        </div>

        {/* Fixed Bubble Cards for Mental Health Fact and Depression Quote */}
        <div className="flex justify-center space-x-6 mt-8">
          <div className="bg-gradient-to-br from-cyan-100 to-blue-200 border border-blue-200 text-blue-800 p-4 w-52 h-52 flex items-center justify-center rounded-full shadow-sm text-center whitespace-normal break-words">
            <p className="text-sm">{mentalHealthFacts[0]}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 w-52 h-52 flex items-center justify-center rounded-full shadow-sm text-center italic whitespace-normal break-words">
            <p className="text-sm">{depressionQuotes[0]}</p>
          </div>
        </div>

        {/* Modals */}
        {isCheckInModalOpen && (
          <CheckInModal isModalOpen={isCheckInModalOpen} setIsModalOpen={setIsCheckInModalOpen} />
        )}
        {isAffirmationModalOpen && (
          <Affirmation closeModal={closeAffirmationModal} onDone={markAffirmationAsDone} />
        )}
      </div>
    </>
  );
};

export default UserDashboard;
