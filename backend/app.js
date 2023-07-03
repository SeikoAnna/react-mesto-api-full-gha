const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');

const router = require('./routes');

const errorHandler = require('./middlewares/error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors({
  origin:
    [
      'http://localhost:3001',
      'http://seiko.anna.nomoreparties.sbs',
      'https://seiko.anna.nomoreparties.sbs',
    ],
  credentials: true,
}));

mongoose.connect(DB_URL);

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
