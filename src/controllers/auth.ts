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
                const token = jwt.sign({id:user.id,name:user.full_name,email:user.email,role:user.role},process.env.JWT_SECRET as string,{expiresIn:"1d"})
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