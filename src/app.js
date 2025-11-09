import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errHandler } from './middlewares/errorHandler.middleware.js';
import { ApiError } from './utils/api-error.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((req, res, next) => {
  next(new ApiError(404, `Cannot ${req.method} ${req.originalUrl}`));
});

app.use(errHandler);
export default app;
