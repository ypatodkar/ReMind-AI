import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const affirmations = [
  "You are enough just as you are.",
  "Your feelings are valid, and you deserve support.",
  "You are stronger than your struggles.",
  "Every day is a fresh start with new possibilities.",
  "You are not alone in this journey.",
  "It's okay to take things one step at a time.",
  "Your mental health matters as much as your physical health.",
  "You deserve love, kindness, and self-care.",
  "You are growing and healing at your own pace.",
  "You are capable of overcoming difficult times."
];

const Affirmation = ({ closeModal, onDone }) => {
  const [randomAffirmation, setRandomAffirmation] = useState("");

  useEffect(() => {
    // Select a random affirmation on mount
    setRandomAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-8 rounded-lg w-96 shadow-xl relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={closeModal}
          >
            ×
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Daily Affirmation</h2>

          {/* Affirmation Text */}
          <div className="flex flex-col items-center mb-6">
            <p className="text-center text-lg text-gray-800 font-medium italic">{randomAffirmation}</p>
          </div>

          {/* Done Button */}
          <div className="flex justify-center">
            <button
              className="bg-green-500 text-white px-5 py-2 rounded-md text-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-600"
              onClick={() => { onDone(); closeModal(); }}
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Affirmation;
