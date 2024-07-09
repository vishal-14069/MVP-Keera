require('dotenv').config(); // Make sure this is at the very top

console.log('Loaded API Key:', process.env.OPENAI_API_KEY); // Debug log

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5001; // Changed port to 5001

// Adding CORS middleware with specific settings
app.use(cors({
  origin: '*', // Allow only your frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
}));

// Adding explicit CORS headers to handle preflight requests
app.use((req, res, next) => {
  console.log('CORS middleware hit');
  res.header('Access-Control-Allow-Origin', '*'); // Allow only your frontend origin
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.options('*', (req, res) => {
  console.log('OPTIONS request hit');
  res.header('Access-Control-Allow-Origin', '*'); // Allow only your frontend origin
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.sendStatus(200);
});

app.use(bodyParser.json());

const questionsStore = {}; // In-memory store for questions, replace with a real database in production
const responsesStore = {}; // In-memory store for responses, replace with a real database in production

// Endpoint to save questions and generate a unique code
app.post('/api/questions', (req, res) => {
  console.log('Received POST /api/questions');
  const { questions } = req.body;
  console.log('Questions received:', questions);
  const code = uuidv4();
  questionsStore[code] = questions;
  res.json({ code });
});

// Endpoint to fetch questions by code
app.get('/api/questions/:code', (req, res) => {
  console.log('Received GET /api/questions/:code');
  const { code } = req.params;
  const questions = questionsStore[code];
  if (questions) {
    res.json({ questions });
  } else {
    res.status(404).json({ error: 'Questions not found' });
  }
});

// Endpoint to submit responses (without AI insights)
app.post('/api/insights', (req, res) => {
  console.log('Received POST /api/insights');
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
  console.log(`Stored responses for code ${code}:`, responsesStore[code]);

  res.json({ insights, sentiment });
});

// Endpoint to fetch all responses for a given code
app.get('/api/responses/:code', (req, res) => {
  console.log('Received GET /api/responses/:code');
  const { code } = req.params;
  console.log(`Looking for responses with code: ${code}`);
  console.log('Current responsesStore:', responsesStore); // Log the entire store
  const responses = responsesStore[code];
  if (responses) {
    console.log(`Found responses for code ${code}:`, responses);
    res.json({ responses });
  } else {
    console.log(`No responses found for code ${code}`);
    res.status(404).json({ error: 'Responses not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
