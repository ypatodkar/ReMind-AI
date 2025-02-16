import React, { useState } from 'react';
import Navbar from './navBar';
import CheckInModal from './CheckInModal'; // Import CheckInModal
import CheckInButton from './CheckInButton';
import Task from './Task';
import Affirmation from './Affirmation'; // Import Affirmation modal

const UserDashboard = () => {
  const [checkedTasks, setCheckedTasks] = useState([]); // Task completion state
  const [checkedInDays, setCheckedInDays] = useState([]); // Check-in state
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false); // Modal for CheckIn
  const [isAffirmationModalOpen, setIsAffirmationModalOpen] = useState(false); // Modal for Affirmation

  const handleTaskCheck = (task) => {
    setCheckedTasks((prev) =>
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  };

  const handleCheckIn = (day) => {
    setCheckedInDays((prev) =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
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
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Your Dashboard</h1>

        {/* Circular Check-In Buttons */}
        <div className="flex space-x-4 justify-center mb-6">
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

        {/* Timeline and Tasks */}
        <h2 className="text-xl font-semibold mb-4 text-center">Today's Task</h2>
        <div className="max-w-3xl mx-auto border-l-4 border-gray-500 pl-4 mb-6 space-y-4">
          <Task
            task="checkin"
            isChecked={checkedTasks.includes('checkin')}
            onTaskCheck={handleTaskCheck}
            onModalOpen={openCheckInModal}  // Open Check-In Modal
          />
          <Task
            task="affirmation"
            isChecked={checkedTasks.includes('affirmation')}
            onTaskCheck={handleTaskCheck}
            onModalOpen={openAffirmationModal}
          />
        </div>

        {/* Modals */}
        {isCheckInModalOpen && <CheckInModal isModalOpen={isCheckInModalOpen} setIsModalOpen={setIsCheckInModalOpen} />}
        {isAffirmationModalOpen && <Affirmation closeModal={closeAffirmationModal} onDone={markAffirmationAsDone} />}
      </div>
    </>
  );
};

export default UserDashboard;
