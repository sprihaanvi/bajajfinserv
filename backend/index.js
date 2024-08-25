const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// Use cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

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

  // Separate numbers and alphabets
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item) && typeof item === 'string');

  // Find the highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
    ? [lowercaseAlphabets.reduce((a, b) => a > b ? a : b)]
    : [];

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

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
