import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
// components
import Connection from './database/db.js';
import Router from './routes/route.js';

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/', Router);

// port
const PORT = process.env.PORT || 8000;

// database connection
Connection(process.env.MONGO_URI);

// server
app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT ${PORT}`);
});