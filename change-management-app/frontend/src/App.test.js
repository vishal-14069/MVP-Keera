require('dotenv').config({ path: '../.env' }); // Load environment variables from the correct .env file

console.log('Loaded API Key:', process.env.OPENAI_API_KEY); // Debugging line

const fs = require('fs');
const envPath = '../.env';
if (fs.existsSync(envPath)) {
  console.log('.env file exists');
} else {
  console.log('.env file does not exist');
}

const { OpenAIApi } = require('openai'); // Ensure correct import

// Check if the API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OpenAI API key in .env file');
  process.exit(1); // Exit the process with an error code
}

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Say something funny',
      max_tokens: 50,
    });
    console.log('Response:', response.data.choices[0].text);
  } catch (error) {
    console.error('Error:', error);
  }
}

testOpenAI();
