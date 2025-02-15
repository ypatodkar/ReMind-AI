import React from 'react'
import { useClerk } from '@clerk/clerk-react'

const AuthPage = () => {
  const { openSignUp } = useClerk() // Use Clerk's openSignUp function to open the sign-up flow

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <button
        onClick={() => openSignUp()}
        className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg"
      >
        Join In
      </button>
    </div>
  )
}

export default AuthPage
