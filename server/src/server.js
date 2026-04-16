import cors from 'cors';
import express from 'express';
import { appData } from './data/app.js';

const app = express();
const port = Number(process.env.API_PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'server'
  });
});

app.get('/api/app', (req, res) => {
  res.json(appData);
});

app.put('/api/app/title', (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      message: 'title must be a non-empty string'
    });
  }

  appData.title = title.trim();

  return res.json(appData);
});

app.delete('/api/app/title', (req, res) => {
  appData.title = '';

  res.json(appData);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API server is running on http://localhost:${port}`);
});
