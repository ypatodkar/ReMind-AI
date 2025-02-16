import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import NewUserForm from './components/NewUserForm';

import UserDashboard from "./components/userDashboard";
import Questionnaire, { QuestionnaireProvider } from './components/questionnaire';
import AuthPage from './components/loginPage';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />  
        <Route path="/userForm" element={<NewUserForm />} />  
        <Route 
          path="/autismTest" 
          element={
            <QuestionnaireProvider>
              <Questionnaire />
            </QuestionnaireProvider>
          } 
        />  
      </Routes>
    </Router>
  );
};

export default App;
