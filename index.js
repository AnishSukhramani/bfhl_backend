const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// POST endpoint
app.post('/bfhl', (req, res) => {
  const requestBody = req.body;
  const data = requestBody.data;

  // Check if `data` is defined and is an array
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid data format' });
  }

  // Process the input data
  const numbers = data.filter(item => /^[0-9]+$/.test(item));
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
  const highestLowercaseAlphabet = alphabets
    .filter(item => /^[a-z]$/.test(item))
    .sort()
    .slice(-1); // Get the last item in the sorted list (highest in a-z series)

  // Respond with the processed data
  res.json({
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
  });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
