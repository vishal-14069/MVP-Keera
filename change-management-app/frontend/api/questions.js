import { v4 as uuidv4 } from 'uuid';
import Cors from 'micro-cors';

const cors = Cors();
const questionsStore = {}; // In-memory store for questions, replace with a real database in production

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { questions } = req.body;
    const code = uuidv4();
    questionsStore[code] = questions;
    res.status(200).json({ code });
  } else if (req.method === 'GET') {
    const { code } = req.query;
    const questions = questionsStore[code];
    if (questions) {
      res.status(200).json({ questions });
    } else {
      res.status(404).json({ error: 'Questions not found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default cors(handler);