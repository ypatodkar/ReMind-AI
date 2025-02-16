import React from 'react'

const AiResponse = () => {
  return (
    <div className="flex flex-col items-center space-y-8 p-6 bg-gradient-to-r from-green-100 via-blue-200 to-purple-300 rounded-lg shadow-xl max-w-3xl mx-auto">
      {/* Mood Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="text-gray-700 font-semibold">Your Mood Today:</div>
          <input
            type="text"
            className="p-2 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your mood today"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="text-gray-700 font-semibold">Your Mood Emotions:</div>
          <input
            type="text"
            className="p-2 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What emotions are you feeling?"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="text-gray-700 font-semibold">Your Mood Activities:</div>
          <input
            type="text"
            className="p-2 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What activities have you done today?"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="text-gray-700 font-semibold">Your Elaborated Text:</div>
          <textarea
            className="p-2 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please elaborate on your mood or activities..."
            rows="4"
          />
        </div>
      </div>

      {/* AI Generated Response Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">AI Generated Response:</h4>
        <textarea
          className="p-4 w-full h-40 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, optio voluptatum! Quis, sed cumque tenetur debitis magni similique tempora officiis et? Quae dolorem aliquid assumenda natus porro expedita modi cum?"
        />
      </div>
    </div>
  )
}

export default AiResponse;
