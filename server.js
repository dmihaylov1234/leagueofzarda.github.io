import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/fantasy', async (req, res) => {
  try {
    const apiUrl = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/1234567';
    const cookies = `espn_s2=${process.env.ESPN_S2}; swid=${process.env.SWID}`;

    console.log('API URL:', apiUrl);
    console.log('Cookies:', cookies);

    const response = await fetch(apiUrl, {
      headers: {
        'Cookie': cookies,
      },
    });

    // Log the response status and headers
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers.raw());

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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