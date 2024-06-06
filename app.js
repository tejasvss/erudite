import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { sourceDotConfig } from "./utils/env/getEnvFilePath.js";
import { databaseConnection } from './config/index.js';
dotenv.config({ path: sourceDotConfig() });

const app = express();
app.use(cors());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 5000000 }));
app.use(express.json({ limit: "500mb", extended: true, parameterLimit: 5000000 }));

// Routes
app.get('/', async (req, res) => {
    res.send(`WELCOME TO ERP_ADMIN BACKEND ${process.env.ENVIRONMENT} APP`);
});

// Start server
app.listen(process.env.EXPRESS_PORT, async function () {
    console.log(`PORT NUMBER: ${process.env.EXPRESS_PORT}`);
    console.log(`ENVIRONMENT: ${process.env.ENVIRONMENT}`);
    console.log(`SERVER STATUS: SUCCESS`);
    await databaseConnection().then(async () => {
        console.log("MONGO DB STATUS: SUCCESS");
    }).catch((e) => {
        "Unable to connect to MONGO-DB.Try again";
    });
});

export default app;
