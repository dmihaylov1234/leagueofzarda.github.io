require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/fantasy', async (req, res) => {
  try {
    const response = await fetch('https://fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/1234567', {
      headers: {
        'Cookie': `espn_s2=${process.env.ESPN_S2}; swid=${process.env.SWID}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});