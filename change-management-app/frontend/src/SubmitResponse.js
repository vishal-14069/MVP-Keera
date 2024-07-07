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
      console.log('Fetching questions for code:', code);
      try {
        const response = await fetch(`http://localhost:5001/api/questions/${code}`, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest', // Add this header to avoid preflight requests
          },
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
          console.error('Failed to fetch questions:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log('Response data:', data);
        setQuestions(data.questions);
        setResponses(new Array(data.questions.length).fill(''));
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
    fetchQuestions();
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting responses:', responses);
    try {
      const response = await fetch('http://localhost:5001/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Add this header to avoid preflight requests
        },
        body: JSON.stringify({ code, responses }),
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        console.error('Failed to fetch insights:', response.statusText);
        return;
      }
      const data = await response.json();
      console.log('Response data:', data);
      setInsights(data.insights);
      setSentiment(data.sentiment);
    } catch (error) {
      console.error('Error during fetch:', error);
    }
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