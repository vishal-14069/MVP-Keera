import Cors from 'micro-cors';

const cors = Cors();
const questionsStore = {}; // In-memory store for questions, replace with a real database in production
const responsesStore = {}; // In-memory store for responses, replace with a real database in production

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { code, responses } = req.body;
    const questions = questionsStore[code];
    if (!questions) {
      return res.status(404).json({ error: 'Questions not found' });
    }

    // Mock insights and sentiment for now
    const insights = 'Mock insights based on responses: ' + responses.join(', ');
    const sentiment = 'Positive'; // Mock sentiment for now

    // Store responses
    if (!responsesStore[code]) {
      responsesStore[code] = [];
    }
    responsesStore[code].push({ responses, insights, sentiment });

    res.status(200).json({ insights, sentiment });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default cors(handler);