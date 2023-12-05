import express from 'express';
import cors from 'cors';
import { config } from "dotenv";
import { router } from './routes/routes.js';

config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json({ limit: "100mb" }));

app.use("/api", router)
app.use("/", (_, res) => {
    res.send("Hello World!");
});

const port = process.env.APP_PORT || 9000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
