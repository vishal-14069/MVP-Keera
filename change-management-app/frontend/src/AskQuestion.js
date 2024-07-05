import React, { useState } from 'react';

function AskQuestion() {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your backend API to save the question
    const response = await fetch('http://localhost:5000/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) {
      console.error('Failed to save question:', response.statusText);
      return;
    }
    alert('Question submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
      />
      <button type="submit">Submit Question</button>
    </form>
  );
}

export default AskQuestion;