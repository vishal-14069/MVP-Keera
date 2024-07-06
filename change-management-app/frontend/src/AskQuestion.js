import React, { useState } from 'react';

function AskQuestion() {
  const [questions, setQuestions] = useState(['', '']);
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your backend API to save the questions and generate a unique code
    const response = await fetch('http://localhost:5000/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions }),
    });
    if (!response.ok) {
      console.error('Failed to save questions:', response.statusText);
      return;
    }
    const data = await response.json();
    setCode(data.code);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  return (
    <div>
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
      {code && (
        <div>
          <p>Share this code with the interviewee: {code}</p>
          <p>Or share this URL: {window.location.origin}/respond/{code}</p>
        </div>
      )}
    </div>
  );
}

export default AskQuestion;