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
  const { data } = req.body;

  // Check if `data` is defined and is an array
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: 'john_doe_17091999',
      email: 'john@xyz.com',
      roll_number: 'ABCD123',
      numbers: [],
      alphabets: [],
      highest_lowercase_alphabet: []
    });
  }

  // Initialize arrays for filtered data
  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = [];

  // Iterate through data to filter numbers and alphabets
  for (let item of data) {
    if (/^[0-9]+$/.test(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
    }
  }

  // Determine the highest lowercase alphabet
  let highest = null;
  if (alphabets.length > 0) {
    for (let char of alphabets) {
      if (/^[a-z]$/.test(char)) {
        if (highest === null || char > highest) {
          highest = char;
        }
      }
    }
  }

  if (highest !== null) {
    highestLowercaseAlphabet.push(highest);
  }

  // Respond with the processed data
  res.json({
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers,
    alphabets,
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
