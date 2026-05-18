const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'submissions.json');

app.use(cors());
app.use(bodyParser.json());

// Ensure submissions.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.post('/api/submit', (req, res) => {
  const { entity, description, budget, email } = req.body;

  if (!entity || !description || !budget || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newSubmission = {
    id: Date.now(),
    entity,
    description,
    budget,
    email,
    timestamp: new Date().toISOString(),
  };

  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    data.push(newSubmission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    console.log('New submission received:', newSubmission);
    res.status(200).json({ message: 'Submission successful' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
