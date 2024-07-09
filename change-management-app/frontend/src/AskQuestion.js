import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function AskQuestion() {
  const [questions, setQuestions] = useState(['', '']);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError('');
    console.log('Submitting questions:', questions);
    try {
      const response = await fetch(`${API_URL}api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      setCode(data.code); // Set the code in state
    } catch (error) {
      console.error('Error submitting questions:', error);
      setError(error.message);
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  return (
    <div>
      <h1>Decision Loop</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <input
            key={index}
            type="text"
            value={question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            placeholder={`Ask question ${index + 1}...`}
          />
        ))}
        <button type="submit">Submit Questions</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {code && (
        <div>
          <p>Share this code with the interviewee: <strong>{code}</strong></p>
        </div>
      )}
    </div>
  );
}

export default AskQuestion;