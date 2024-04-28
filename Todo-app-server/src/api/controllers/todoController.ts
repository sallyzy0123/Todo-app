import {NextFunction, Request, Response} from "express";
import {Todo, User} from "../../types/DBTypes";
import {getAllTodosByUser, getTodoById, addTodo, updateTodo, deleteTodo} from "../models/todoModel";
import {validationResult} from "express-validator";
import {TodoResponse} from "../../types/MessageTypes";
import CustomError from "../../classes/CustomError";

// fetch userId from req.user to get user-own todos
const todoListGet = async (
    req: Request,
    res: Response<Todo[]>,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        throw new CustomError('token not valid', 403);
      }
      const userId = (req.user as User).id;
      const todos = await getAllTodosByUser(userId);
      res.json(todos);
    } catch (error) {
      next(error);
    }
};

const todoGet = async (
    req: Request<{id: string}, {}, {}>,
    res: Response<Todo>,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const todos = await getTodoById(id);
        res.json(todos);
    } catch (error) {
        next(error);
    }
};

// fetch user_id from req.user to add todo for user self
const todoPost = async (
    req: Request<{}, {}, Pick<Todo, 'user_id' | 'title' | 'progress'>>,
    res: Response<TodoResponse>,
    next: NextFunction
) => {
    const errors = validationResult(req.body);
    if (errors.isEmpty()) {
        try {
            if (!req.user) {
                throw new CustomError('token not valid', 403);
            }

            // console.log('req.user', req.user);
            const newTodo = {
                "user_id": (req.user as User).id,
                "title": req.body.title,
                "progress": req.body.progress
            }

            const result = await addTodo(newTodo);
            res.json(result)
        } catch (error) {
            next(error)
        }
    };
};

// fetch userId from req.user to update user-own todo
const todoPut = async (
    req: Request<{id: string}, {}, Pick<Todo, 'title' | 'progress'>>,
    res: Response<TodoResponse>,
    next: NextFunction
) => {
    const errors = validationResult(req.body);
    if (errors.isEmpty()) {
        try {
            if (!req.user) {
                throw new CustomError('token not valid', 403);
            }

            const updatedTodo = {
                "title": req.body.title,
                "progress": req.body.progress
            }

            const id = Number(req.params.id);
            const userId = (req.user as User).id;
            const result = await updateTodo(id, userId, updatedTodo);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };
};

// fetch userId from req.user to delete user-own todo
const todoDelete = async (
    req: Request<{id: string}, {}, {}>,
    res: Response<TodoResponse>,
    next: NextFunction
) => {
    const errors = validationResult(req.body);
    if (errors.isEmpty()) {
        try {
            if (!req.user) {
                throw new CustomError('token not valid', 403);
            }
            const id = Number(req.params.id);
            const userId = (req.user as User).id;
            const result = await deleteTodo(id, userId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };
     
};

export {todoListGet, todoGet, todoPost, todoPut, todoDelete};