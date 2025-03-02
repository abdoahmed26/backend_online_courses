import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.get('/',verifyToken,getUser);
userRouter.get('/all',verifyToken,getAllUsers);
userRouter.put('/',verifyToken,updateUser);
userRouter.delete('/',verifyToken,deleteUser);