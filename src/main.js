import express from 'express';
import cors from 'cors';
import { config } from "dotenv";
import { router } from './routes/routes.js';
import { json } from 'express';

config();

const app = express();

// Use CORS middleware first to handle CORS headers
app.use(cors());

// Apply the JSON middleware to handle larger request bodies
app.use(json({ limit: '100mb' }));

// Use the Express Router for your API routes
app.use("/api", router);

const port = process.env.APP_PORT || 9000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
