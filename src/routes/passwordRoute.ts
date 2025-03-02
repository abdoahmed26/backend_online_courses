import express from 'express';
import { forgotPassword, resetPassword, updatePassword } from '../controllers/passwordController';
import { verifyToken } from '../middlewares/verifyToken';
import { forgotValidation, resetValidation, updateValidation } from '../utils/validators/passwordValidation';
import { errorValidation } from '../utils/validators/errorValidation';

export const passwordRouter = express.Router();

passwordRouter.post('/update',verifyToken,updateValidation,errorValidation,updatePassword)
passwordRouter.post('/forgot',forgotValidation,errorValidation,forgotPassword)
passwordRouter.post('/reset',verifyToken,resetValidation,errorValidation,resetPassword)