const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Import UUID for generating unique codes
require('dotenv').config(); // Load environment variables from .env file
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY); // Add this line
const { Configuration, OpenAIApi } = require('openai'); // Import OpenAI
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Adding CORS middleware with specific settings
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend to access the backend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
}));

app.use(bodyParser.json());

// Check if the API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OpenAI API key in .env file');
  process.exit(1); // Exit the process with an error code
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const users = []; // In-memory user store, replace with a real database in production
const questionsStore = {}; // In-memory store for questions, replace with a real database in production

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

// Endpoint to save questions and generate a unique code
app.post('/api/questions', authenticate, (req, res) => {
  const { questions } = req.body;
  const code = uuidv4();
  questionsStore[code] = questions;
  res.json({ code });
});

// Endpoint to fetch questions by code
app.get('/api/questions/:code', (req, res) => {
  const { code } = req.params;
  const questions = questionsStore[code];
  if (questions) {
    res.json({ questions });
  } else {
    res.status(404).json({ error: 'Questions not found' });
  }
});

// Endpoint to submit responses and get insights
app.post('/api/insights', async (req, res) => {
  const { code, responses } = req.body;
  const questions = questionsStore[code];
  if (!questions) {
    return res.status(404).json({ error: 'Questions not found' });
  }

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: responses.join('\n'),
      max_tokens: 150,
    });
    const insights = response.data.choices[0].text;
    res.json({ insights, sentiment: 'Positive' }); // Mock sentiment for now
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

// Adding explicit CORS headers to handle preflight requests
app.use((req, res, next) => {
  console.log('CORS middleware hit');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.options('*', (req, res) => {
  console.log('OPTIONS request hit');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});