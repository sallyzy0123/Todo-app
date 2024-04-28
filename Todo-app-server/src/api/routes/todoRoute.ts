import express from 'express';
import {
  todoDelete,
  todoGet,
  todoListGet,
  todoPost,
  todoPut,
} from '../controllers/todoController';
import passport from '../../passport';
import {body, param} from 'express-validator';
import {validationErrors} from '../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(todoListGet)
  .post(
    passport.authenticate('jwt', {session: false}), 
    body('title').trim().isLength({min:3}).escape(), 
    body('progress').trim().isNumeric().escape(),
    validationErrors,
    todoPost)

router
  .route('/:id')
  .get(todoGet)
  .put(
    passport.authenticate('jwt', {session: false}), 
    param('id').isNumeric().toInt(),
    body('title').trim().isLength({min:3}).escape(),
    body('progress').trim().isNumeric().escape(),
    validationErrors,
    todoPut)
  .delete(
    passport.authenticate('jwt', {session: false}), 
    param('id').isNumeric().toInt(),
    validationErrors,
    todoDelete
);

export default router;
