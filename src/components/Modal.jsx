"use client";

import React, { useState } from "react";

const Modal = ({ isVisible, onClose, chapterTitle }) => {
  // State to manage answers
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Answers:", answers);
    // You can add logic here to process the answers
    onClose(); // Close the modal after submission
  };

  // Return null if the modal is not visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[400px] animate-slide-up">
        <h2>{chapterTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="question1" className="block">
              Question 1: What is your name?
            </label>
            <input
              type="text"
              id="question1"
              name="question1"
              value={answers.question1}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="question2" className="block">
              Question 2: What is your favorite color?
            </label>
            <input
              type="text"
              id="question2"
              name="question2"
              value={answers.question2}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="question3" className="block">
              Question 3: What is your hobby?
            </label>
            <input
              type="text"
              id="question3"
              name="question3"
              value={answers.question3}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 p-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
