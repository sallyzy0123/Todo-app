import express from 'express';
import {
  checkToken,
  userDelete,
  userGet,
  userListGet,
  userPost,
  userPut,
} from '../controllers/userController';
import passport from '../../passport';
import {body, param} from 'express-validator';
import {validationErrors} from '../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(userListGet)
  .post(
    body('email').trim().isEmail().escape(), 
    body('password').trim().isLength({min:4}).escape(),
    validationErrors,
    userPost)
  .put(
    passport.authenticate('jwt', {session: false}), 
    body('email').trim().isEmail().escape(), 
    body('password').trim().isLength({min:4}).escape(),
    validationErrors,
    userPut)
  .delete(
    passport.authenticate('jwt', {session: false}), 
    userDelete
  );

router.get(
  '/token',
  passport.authenticate('jwt', {session: false}),
  checkToken
);

router
  .route('/:id')
  .get(userGet);

export default router;
