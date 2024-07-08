import Cors from 'micro-cors';

const cors = Cors();
const responsesStore = {}; // In-memory store for responses, replace with a real database in production

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { code } = req.query;
    const responses = responsesStore[code];
    if (responses) {
      res.status(200).json({ responses });
    } else {
      res.status(404).json({ error: 'Responses not found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default cors(handler);