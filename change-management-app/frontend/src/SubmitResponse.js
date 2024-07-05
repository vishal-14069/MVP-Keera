import React, { useState } from 'react';

function SubmitResponse() {
  const [response, setResponse] = useState('');
  const [insights, setInsights] = useState('');
  const [sentiment, setSentiment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your backend API to submit the response and get insights
    const response = await fetch('http://localhost:5000/api/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response }),
    });
    if (!response.ok) {
      console.error('Failed to fetch insights:', response.statusText);
      return;
    }
    const data = await response.json();
    setInsights(data.insights);
    setSentiment(data.sentiment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Interviewee's response..."
      />
      <button type="submit">Submit Response</button>
      {insights && <p>Insights: {insights}</p>}
      {sentiment && <p>Sentiment: {sentiment}</p>}
    </form>
  );
}

export default SubmitResponse;