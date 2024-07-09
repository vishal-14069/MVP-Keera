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
      const response = await fetch(`${API_URL}/api/questions/${code}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Response data:', data);
      setQuestions(data.questions);
      setResponses(new Array(data.questions.length).fill(''));
    } catch (error) {
      console.error('Error during fetch:', error);
      setSubmissionStatus(`Error fetching questions: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting responses:', responses);
    try {
      const response = await fetch(`${API_URL}/api/responses/${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ responses }),
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`Failed to submit responses: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Response data:', data);
      setSubmissionStatus('Responses submitted successfully!');
    } catch (error) {
      console.error('Error during fetch:', error);
      setSubmissionStatus(`Error during submission: ${error.message}`);
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
