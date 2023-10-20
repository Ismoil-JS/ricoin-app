import express from 'express';
import cors from 'cors';
import { config } from "dotenv";
import {router} from './routes/routes.js';

config();


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router)

const port = process.env.APP_PORT || 9000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
