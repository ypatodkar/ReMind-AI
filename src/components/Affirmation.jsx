import React from 'react';

const Affirmation = ({ closeModal, onDone }) => {
  const affirmation = "You are capable of amazing things.";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <button
          className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={closeModal}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center">Affirmation</h2>
        <div className="flex flex-col items-center mb-6">
          <p className="text-center text-lg text-gray-800">{affirmation}</p>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-green-600"
            onClick={() => { onDone(); closeModal(); }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Affirmation;
