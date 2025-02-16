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

  // Fixed arrays for content
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
    setCheckedTasks(prev =>
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  };

  const handleCheckIn = (day) => {
    setCheckedInDays(prev =>
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
    console.log(days);
    return days;
  };

  const last7Days = getLast7Days();




  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen" style={{ backgroundColor: '#000b6445'}}>
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
        <div className="flex flex-col md:flex-row justify-center items-start gap-6">
  {/* Left Bubble: Mental Health Fact */}
  <div className="md:w-1/4 flex justify-end">
    <div className="drop" style={{ "--clr": "#db4ef4" }}>
      <div className="content">
        <h2>01</h2>
        <p>{mentalHealthFacts[0]}</p>
        <a href="#">Read More</a>
      </div>
    </div>
  </div>

  {/* Center Column: Today's Tasks */}
  <div className="md:w-1/2 w-full">
    <h2 className="text-2xl font-semibold mb-4 text-center">Today's Tasks</h2>
    <div className="space-y-4">
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
  </div>

  {/* Right Bubble: Depression Quote */}
  <div className="md:w-1/4 flex justify-start">
    <div className="drop" style={{ "--clr": "#3a9cf1" }}>
      <div className="content">
        <h2>02</h2>
        <p>{depressionQuotes[0]}</p>
        <a href="#">Read More</a>
      </div>
    </div>
  </div>
</div>

        {/* Fixed Bubble Cards on either side of the tasks */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 items-center">


          {/* Center Column: (empty, used only for spacing) */}
          <div></div>

          {/* Right Bubble: Depression Quote */}

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
