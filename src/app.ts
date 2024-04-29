require('dotenv').config();
import express, {Request} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import {notFound, errorHandler} from './middlewares';
import api from './api';
import {MessageResponse} from './types/MessageTypes';

const app = express();

// process.env.PORT
// process.env.NODE_ENV => production or undefined

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  // server static content
  // npm run build
  app.use(express.static(path.join(__dirname, '../todo-app-client/build')));
}

console.log(__dirname);
console.log(path.join(__dirname, '../todo-app-client/build'));

app.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'API location: api/v1',
  });
});

app.use('/api/v1', api);

// app.get('/*', (_req, res) => {
//   res.sendFile(path.join(__dirname, '../todo-app-client/build/index.html'));
// });

app.use(notFound);
app.use(errorHandler);

export default app;