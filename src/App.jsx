import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/authPage';
import { Dashboard } from './components/Dashboard';
import NewUserForm from './components/NewUserForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/NewUserForm" element={<NewUserForm />} />  
      </Routes>
    </Router>
  );
};

export default App;
