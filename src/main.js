import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { router } from './routes/routes.js';

config();

const app = express();

// Middleware
app.use(express.json({ limit: '100mb' })); // Increase payload size limit to 100MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Set limit for url-encoded data
app.use(cors());

// Routes
app.use('/api', router);

// Default route
app.use('/', (_, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const port = process.env.APP_PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
