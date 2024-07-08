import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL || '/api';
const SubmitResponse = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    fetchQuestions(code);
  }, [code]);

  const fetchQuestions = async (code) => {
    console.log('Fetching questions for code:', code);
    try {
      const response = await fetch(`${API_URL}questions/${code}`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting responses:', responses);
    try {
      const response = await fetch(`${API_URL}/insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Add this header to avoid preflight requests
        },
        body: JSON.stringify({ code, responses }),
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        console.error('Failed to submit responses:', response.statusText);
        setSubmissionStatus('Failed to submit responses'); // Update status on failure
        return;
      }
      const data = await response.json();
      console.log('Response data:', data);
      setSubmissionStatus('Responses submitted successfully!'); // Update status on success
    } catch (error) {
      console.error('Error during fetch:', error);
      setSubmissionStatus('Error during submission'); // Update status on error
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
      {submissionStatus && <p>{submissionStatus}</p>} {/* Display submission status */}
    </div>
  );
};

export default SubmitResponse;
