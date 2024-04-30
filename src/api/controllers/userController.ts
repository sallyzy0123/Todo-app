import bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from "express";
import {User} from "../../types/DBTypes";
import {addUser, deleteUser, getAllUsers, getUser, updateUser} from "../models/userModel";
import {UserResponse} from "../../types/MessageTypes";
import {validationResult} from "express-validator";
import CustomError from '../../classes/CustomError';

const salt = bcrypt.genSaltSync(12);

const userListGet = async (
    _req: Request,
    res: Response<User[]>,
    next: NextFunction
  ) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      console.log('error here', error);
      next(error);
    }
};

const userGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const user = await getUser(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const userPost = async (
    req: Request<{}, {}, Omit<User, 'id'>>,
    res: Response<UserResponse>,
    next: NextFunction
) => {
    const errors = validationResult(req.body);
    if (errors.isEmpty()) {
      const passwordHash = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        "email": req.body.email,
        "password": passwordHash
      }
  
      try {
        const result = await addUser(newUser);
        res.json(result)
      } catch (error) {
        next(error)
      }
    };
};

// user.id fetch from token to update user self
const userPut = async (
  req: Request<{}, {}, Omit<User, 'id'>>,
  res: Response<UserResponse>,
  next: NextFunction
) => {
  const errors = validationResult(req.body);
  if (errors.isEmpty()) {
    try {
      let _user = req.body;
  
      console.log('req.user', req.user);
      if (!req.user) {
        throw new CustomError('token not valid', 403);
      }

      if (req.body.password) {
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        _user = {
          ...req.body,
          password: passwordHash,
        }
      }
  
      console.log('user', _user);
      const result = await updateUser((req.user as User).id, _user);
      res.json(result);
     
    } catch (error) {
      next(error);
    }
  }
}

// user.id fetch from token to delete user self
// TODO: delete all todos of the user
const userDelete = async (
  req: Request,
  res: Response<UserResponse>,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError('token not valid', 403);
    }

    const result = await deleteUser((req.user as User).id);
    res.json(result);
  } catch (error) {
    next(error);
  };
};

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    next(new CustomError('token not valid', 403));
  } else {
    res.json(req.user);
  }
};

export {userListGet, userGet, userPost, userPut, userDelete, checkToken};