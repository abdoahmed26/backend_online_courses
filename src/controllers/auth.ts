import { Request, Response } from "express";
import Users from "../models/users";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async(req:Request,res:Response)=>{
    try {
        const { email, password } = req.body
        const user = await Users.findOne({where:{email}})
        if(!user){
            res.status(400).json({status:"error",message:"user not found"})
        }
        else{
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                res.status(400).json({status:"error",message:"invalid email or password"})
            }
            else{
                const token = jwt.sign({id:user.id,name:user.full_name,email:user.email,role:user.role,planId:user.planId},process.env.JWT_SECRET as string,{expiresIn:"5m"})
                const refresh_token = jwt.sign({id:user.id,name:user.full_name,email:user.email,role:user.role,planId:user.planId},process.env.JWT_SECRET_REFRESH as string,{expiresIn:"1d"})
                res.cookie("refresh_token",refresh_token,{
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    path:"/",
                    httpOnly:true,
                    secure:true,
                    sameSite:"lax"
                })
                res.status(200).json({status:"success",data:{token}})
            }
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const register = async(req:Request,res:Response)=>{
    try {
        const { email, password } = req.body
        const user = await Users.findOne({where:{email}})
        if(user){
            res.status(400).json({status:"error",message:"user already exists"})
        }
        else{
            const hashPass = await bcrypt.hash(password,10)
            const newUser = await Users.create({...req.body,password:hashPass})
            await newUser.save()
            res.status(201).json({status:"success",message:"user created successfully"})
        }
    } catch (error:any) {
        // console.error(error);
        res.status(404).json({status:"error",message:error.message})
    }
}

export const refresh = async(req:Request,res:Response)=>{
    try {
        const user = (req as any).user
        const token = jwt.sign({id:user.id,name:user.name,email:user.email,role:user.role,planId:user.planId},process.env.JWT_SECRET as string,{expiresIn:"5m"})
        res.status(200).json({status:"success",data:{token}})
    }catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const loginGoogle = async(req:Request,res:Response)=>{
    try {
        const user = (req as any).user
        const oldUser = await Users.findOne({where:{email:user.email},attributes:{exclude:["password"]}})
        if(oldUser){
            const token = jwt.sign({id:oldUser.id,name:oldUser.full_name,email:oldUser.email,role:oldUser.role,planId:oldUser.planId},process.env.JWT_SECRET as string,{expiresIn:"1d"})
            res.cookie("token",token,{expires:new Date(Date.now() + 24 * 60 * 60 * 1000)})
            res.cookie("id",oldUser.id,{expires:new Date(Date.now() + 24 * 60 * 60 * 1000)})
        }
        else{
            const newUser = await Users.create({
                email:user.email,
                full_name:user.displayName,
                password:"",
            })
            await newUser.save()
            const token = jwt.sign({id:newUser.id,name:newUser.full_name,email:newUser.email,role:newUser.role,planId:newUser.planId},process.env.JWT_SECRET as string,{expiresIn:"1d"})
            res.cookie("token",token,{expires:new Date(Date.now() + 24 * 60 * 60 * 1000)})
            res.cookie("id",newUser.id,{expires:new Date(Date.now() + 24 * 60 * 60 * 1000)})
        }
        res.redirect(`${process.env.FRONTEND_URL}/card-dashboard`)
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}