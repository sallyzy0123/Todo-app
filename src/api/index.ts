import express from 'express';

import userRoute from './routes/userRoute';
import todoRoute from './routes/todoRoute';
import authRoute from './routes/authRoute';
import passport from 'passport';
import {MessageResponse} from '../types/MessageTypes';

const router = express.Router();

router.use(passport.initialize());

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'routes: auth, users, todos',
  });
});

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/todos', todoRoute);

export default router;