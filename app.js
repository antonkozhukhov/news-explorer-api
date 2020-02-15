const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { localAdress } = require('./config');
const cenralizedError = require('./errors/centralized-error');


const app = express();
const corsOptions = {
  origin: 'http:localhost:8081',
  optionsSuccessStatus: 200,
  credentials: true,
};
app.options('*', cors());
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, MONGO_ADRESS } = process.env;
const mongoAdress = NODE_ENV === 'production' ? MONGO_ADRESS : localAdress;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(mongoAdress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const { PORT = 3000 } = process.env;
const router = require('./routes/index.js');


app.listen(PORT, () => {
});

app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.use(cors(corsOptions), router);

app.use(errorLogger);
app.use(errors());
app.use(cenralizedError);
