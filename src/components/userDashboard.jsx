import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navBar';
import CheckInModal from './checkInModal';
import CheckInButton from './CheckInButton';
import Task from './Task';
import Affirmation from './Affirmation';
import AiResponse from './AiResponse';
import NewUserStats from './NewUserStats'
import './dashboard.css'
import Footer from './Footer';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [checkedInDays, setCheckedInDays] = useState([]);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isAffirmationModalOpen, setIsAffirmationModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

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
    if (task === 'affirmation' && !checkedTasks.includes('affirmation')) {
      setCheckedTasks(prev => [...prev, task]);
    } else if (task !== 'affirmation') {
      setCheckedTasks(prev =>
        prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
      );
    }
  };

  const markAffirmationAsDone = () => {
    handleTaskCheck('affirmation'); // Mark affirmation as done
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

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const userId = localStorage.getItem("user_id")
        const response = await fetch(`http://localhost:5000/dashboard/entries?user_id=${userId}`);
        const data = await response.json();

        const checkedInDates = data.map(entry => new Date(entry.date).toLocaleDateString('en-US'));

        const checkedDays = last7Days
          .filter(day => checkedInDates.includes(day.dayDate))
          .map(day => day.dayDate);

        setCheckedInDays(checkedDays);
      } catch (error) {
        console.error("Error fetching check-in data:", error);
      }
    };

    fetchEntries();
  }, []);

  return  (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 bg-gray-50" style={{ backgroundColor: '#000b6445' }}>
        <h1 className="text-3xl font-bold mb-6 text-center">Your Dashboard</h1>
  
        {/* Check-In Buttons Row */}
        <div className="flex space-x-4 justify-center mb-8">
          {last7Days.map(({ dayName, dayDate }) => (
            <CheckInButton
              key={dayDate}
              dayName={dayName}
              dayDate={dayDate}
              isChecked={checkedInDays.includes(dayDate)}
              onCheckIn={() => console.log("Check-in clicked!")}
            />
          ))}
        </div>
  
        <div className="flex flex-col md:flex-row justify-center items-start gap-6">
          {/* Left Bubble */}
          <div className="md:w-1/4 flex justify-end">
            <div className="drop" style={{ "--clr": "#db4ef4" }}>
              <div className="content">
                <h2>01</h2>
                <p>{mentalHealthFacts[0]}</p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
  
          {/* Center Column */}
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Today's Tasks</h2>
            <div className="space-y-4">
              <Task
                task="checkin"
                isChecked={checkedTasks.includes('checkin')}
                onTaskCheck={handleTaskCheck}
                onModalOpen={() => setIsCheckInModalOpen(true)}
              />
              <Task
                task="affirmation"
                isChecked={checkedTasks.includes('affirmation')}
                onTaskCheck={handleTaskCheck}
                onModalOpen={() => setIsAffirmationModalOpen(true)}
              />
            </div>
          </div>
  
          {/* Right Bubble */}
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
  
        {/* Modals */}
        {isCheckInModalOpen && (
          <CheckInModal isModalOpen={isCheckInModalOpen} setIsModalOpen={setIsCheckInModalOpen} setAiResponse={setAiResponse} />
        )}
        {isAffirmationModalOpen && (
          <Affirmation closeModal={() => setIsAffirmationModalOpen(false)} onDone={markAffirmationAsDone} />
        )}
        {aiResponse ? <AiResponse data={aiResponse} /> : <p></p>}
      </main>
  
      <Footer />
    </div>
  );
  
};

export default UserDashboard;
