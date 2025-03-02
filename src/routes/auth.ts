import express from 'express';
import { loginValidation } from '../utils/validators/loginValidation';
import { errorValidation } from '../utils/validators/errorValidation';
import { registerValidation } from '../utils/validators/registerValidation';
import { login, register } from '../controllers/auth';

export const authRouter = express.Router();

authRouter.post('/login',loginValidation,errorValidation,login)

authRouter.post('/register',registerValidation,errorValidation,register)