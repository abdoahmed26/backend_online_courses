import express from 'express';
import { loginValidation } from '../utils/validators/loginValidation';
import { errorValidation } from '../utils/validators/errorValidation';
import { registerValidation } from '../utils/validators/registerValidation';
import { login, loginGoogle, refresh, register } from '../controllers/auth';
import { verifyRefreshToken } from '../middlewares/verifyRefreshToken';
import passport from 'passport';

export const authRouter = express.Router();

authRouter.post('/login',loginValidation,errorValidation,login)

authRouter.post('/register',registerValidation,errorValidation,register)

authRouter.get('/refresh',verifyRefreshToken,refresh)

authRouter.get("/google", passport.authenticate("google", { scope: [ 'email', 'profile' ] }));

authRouter.get('/google/callback',passport.authenticate('google',{
    failureRedirect:`/api/v1/auth/google/failure`,
    successRedirect:`/api/v1/auth/google/success`
}))

authRouter.get('/google/success',loginGoogle)

authRouter.get('/google/failure',(req,res)=>{
    res.redirect(`${process.env.FRONTEND_URL}/login`)
})