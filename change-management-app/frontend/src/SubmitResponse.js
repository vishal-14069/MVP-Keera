import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SubmitResponse() {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [insights, setInsights] = useState('');
  const [sentiment, setSentiment] = useState('');

  useEffect(() => {
    // Fetch the questions using the code
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:5000/api/questions/${code}`);
      if (!response.ok) {
        console.error('Failed to fetch questions:', response.statusText);
        return;
      }
      const data = await response.json();
      setQuestions(data.questions);
      setResponses(new Array(data.questions.length).fill(''));
    };
    fetchQuestions();
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your backend API to submit the responses and get insights
    const response = await fetch('http://localhost:5000/api/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, responses }),
    });
    if (!response.ok) {
      console.error('Failed to fetch insights:', response.statusText);
      return;
    }
    const data = await response.json();
    setInsights(data.insights);
    setSentiment(data.sentiment);
  };

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question}</p>
            <textarea
              value={responses[index]}
              onChange={(e) => handleResponseChange(index, e.target.value)}
              placeholder="Your response..."
            />
          </div>
        ))}
        <button type="submit">Submit Responses</button>
      </form>
      {insights && <p>Insights: {insights}</p>}
      {sentiment && <p>Sentiment: {sentiment}</p>}
    </div>
  );
}

export default SubmitResponse;