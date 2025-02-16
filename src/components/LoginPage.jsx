import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:5000/auth/${isSignUp ? 'signup' : 'signin'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      console.log('User ID:', data.userId);
      // Store user_id in localStorage for global access
      localStorage.setItem('user_id', data.userId);
      // If signing up, navigate to /userForm, otherwise navigate to /dashboard
      if (isSignUp) {
        navigate('/userForm');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                required 
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
          <span 
            className="text-blue-600 cursor-pointer" 
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? ' Login' : ' Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
