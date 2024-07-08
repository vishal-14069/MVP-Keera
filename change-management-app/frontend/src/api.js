const API_URL = process.env.REACT_APP_API_URL || '/api'; // Use relative path for Vercel serverless functions

export const submitQuestion = async (question) => {
  try {
    const response = await fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchQuestions = async (code) => {
  try {
    const response = await fetch(`${API_URL}/questions?code=${code}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const submitInsights = async (code, responses) => {
  try {
    const response = await fetch(`${API_URL}/insights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, responses }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchResponses = async (code) => {
  try {
    const response = await fetch(`${API_URL}/responses?code=${code}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};