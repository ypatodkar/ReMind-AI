import React from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { openSignIn, openSignUp } = useClerk();
  const navigate = useNavigate();

  const handleSignIn = () => {
    openSignIn({
      redirectUrl: '/dashboard',
      afterSignInUrl: '/dashboard'
    });
  };

  const handleSignUp = () => {
    openSignUp({
      redirectUrl: '/dashboard',
      afterSignUpUrl: '/dashboard'
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center gap-6">
      <button
        onClick={handleSignUp}
        className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
      >
        New User
      </button>
      <button
        onClick={handleSignIn}
        className="px-6 py-3 bg-transparent text-white font-semibold border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors"
      >
        Get In
      </button>
    </div>
  );
};

export default AuthPage;