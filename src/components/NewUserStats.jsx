import React from 'react'

const NewUserStats = () => {
  return (
    <div className="flex flex-col items-center space-y-8 p-6 bg-gradient-to-r from-indigo-100 via-green-200 to-yellow-200 rounded-lg shadow-xl max-w-4xl mx-auto">
      {/* Image with circular progress */}
      <div className="relative flex justify-center items-center w-40 h-40 bg-white rounded-full shadow-lg">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile" 
          className="absolute inset-0 object-cover w-full h-full rounded-full opacity-50"
        />
        <div className="relative text-2xl font-bold text-white">
          <span>Score: 85</span>
        </div>
      </div>

      <div className="text-center text-gray-800 space-y-4">
        <h2 className="text-3xl font-semibold">Your total score is high</h2>
        <p className="text-lg">Here's a breakdown of your last week:</p>
      </div>

      {/* Stats section */}
      <div className="space-y-4 w-full">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700">Anxiety level: 29%</h1>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-red-400 h-2.5 rounded-full" style={{ width: '29%' }}></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700">Depression level: 29%</h1>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '29%' }}></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700">Stress level: 29%</h1>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: '29%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUserStats;
