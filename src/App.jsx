import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/authPage';

import NewUserForm from './components/NewUserForm';

import UserDashboard from "./components/userDashboard";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/NewUserForm" element={<NewUserForm />} />  
      </Routes>
    </Router>
  );
};

export default App;
