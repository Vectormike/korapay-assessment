import 'reflect-metadata';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
import ApplicationError from './errors/application-error';
import routes from './routes';
import { rateLimiter } from './middleware/limiter';
import logger from './logger';
import { client, redisClient } from './redis.connection';

const cors = require('cors');
require('./config/database');

const app = express();
client();
const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';

app.use(morgan('combined', { stream: logger.stream }));

app.use(compression());
app.use(cookieParser());
// initalize passport
app.use(
  cors({
    origin: '*', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    credentials: true, // allow session cookie from browser to pass through
  }),
);

const runRedisAsync = async () => {
  try {
    redisClient.on('message', (channel, message) => {
      console.log(`Received data :${message}`);
    });
  } catch (error) {
    return console.log('fail to connect to redis');
  }
};
runRedisAsync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rateLimiter);

app.set('port', process.env.PORT || 3000);

app.use(routes);

app.use((req, res, next) => res.status(404).send({
  status: 'Not Found',
  status_code: 404,
}));

app.use(
  (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    if (req.url != '/api/auth/login') {
      logger.info(`request>>${JSON.stringify(req.body)}`);
    }
    if (res.headersSent) {
      return next(err);
    }

    const statusCode: number = err.statusCode || 500;

    return res.status(statusCode).json({
      status: err.status,
      statusCode,
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err : undefined,
    });
  },
);

export default app;
