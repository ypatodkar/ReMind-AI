import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navBar";

const NewUserStats = () => {
  const navigate = useNavigate();
  const [totalScore, setTotalScore] = useState(0);
  const [anxietyLevel, setAnxietyLevel] = useState(0);
  const [depressionLevel, setDepressionLevel] = useState(0);
  const [stressLevel, setStressLevel] = useState(0);

  useEffect(() => {
    // Retrieve scores from localStorage
    const storedResponses = JSON.parse(localStorage.getItem("responses")) || {};
    const scores = Object.values(storedResponses).map(Number); // Convert values to numbers

    if (scores.length === 10) {
      const total = scores.reduce((acc, val) => acc + val, 0);
      const anxiety = Math.round((scores.slice(0, 5).reduce((a, b) => a + b, 0) / 5) * 10); // Scale to percentage
      const depression = Math.round((scores.slice(5, 9).reduce((a, b) => a + b, 0) / 4) * 10);
      const stress = scores[9] * 10; // Last question mapped directly

      setTotalScore(total);
      setAnxietyLevel(anxiety);
      setDepressionLevel(depression);
      setStressLevel(stress);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center space-y-8 my-6 p-6 bg-gradient-to-r from-indigo-100 via-green-200 to-yellow-200 rounded-lg shadow-xl max-w-4xl mx-auto">
        {/* Image with circular progress */}
        <div className="relative flex justify-center items-center w-40 h-40 bg-white rounded-full shadow-lg">
          <img
            src="https://via.placeholder.com/150"
            alt=""
            className="absolute inset-0 object-cover w-full h-full rounded-full opacity-50"
          />
          <div className="relative text-2xl font-bold">
            <span>Score: {totalScore}</span>
          </div>
        </div>

        <div className="text-center text-gray-800 space-y-4">
          <h2 className="text-3xl font-semibold">Your total score is {totalScore}</h2>
          <p className="text-lg">Here's a breakdown of your last session:</p>
        </div>

        {/* Stats section */}
        <div className="space-y-4 w-full">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-700">Anxiety level: {anxietyLevel}%</h1>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-red-400 h-2.5 rounded-full" style={{ width: `${anxietyLevel}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-700">Depression level: {depressionLevel}%</h1>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${depressionLevel}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-700">Stress level: {stressLevel}%</h1>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${stressLevel}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={() => navigate("/dashboard")}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default NewUserStats;
