import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const verifyRefreshToken = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const refresh_token = req.cookies.refresh_token
        if(!refresh_token){
            res.status(401).json({status:"error",message:"you are not authorized"})
        }
        else{
            jwt.verify(refresh_token,process.env.JWT_SECRET_REFRESH as string,(err,user)=>{
                if(err){
                    res.status(401).json({status:"error",message:err.message})
                }
                else{
                    (req as any).user = user
                    next()
                }
            })
        }
    } catch (error:any) {
        res.status(401).json({status:"error",message:error.message})
    }
}