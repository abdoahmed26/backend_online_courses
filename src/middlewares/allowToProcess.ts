import { NextFunction, Request, Response } from "express"

export const allowToProcess = (...role:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const user = (req as any).user
        if(!role.includes(user.role)){
            res.status(405).json({status:"error",message:"this process is not allowed for you"})
        }
        else{
            next()
        }
    }
}