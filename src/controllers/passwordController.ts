import { Request, Response } from "express"
import Users from "../models/users"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/sendEmail";

export const updatePassword = async(req:Request,res:Response)=>{
    try {
        const {id} = (req as any).user
        const {oldPassword,newPassword} = req.body
        const user = await Users.findByPk(id)
        if(!user){
            res.status(404).json({status:"error",message:"user not found"})
        }
        else{
            const isMatch = await bcrypt.compare(oldPassword,user.password)
            if(!isMatch){
                res.status(400).json({status:"error",message:"invalid old password"})
            }
            else{
                const updatePassword = await bcrypt.hash(newPassword,10)
                await user.update({password:updatePassword})
                await user.save()
                res.status(200).json({status:"success",message:"password updated successfully"})
            }
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const forgotPassword = async(req:Request,res:Response)=>{
    try {
        const {email} = req.body
        const user = await Users.findOne({where:{email}})
        if(!user){
            res.status(404).json({status:"error",message:"user not found"})
        }
        else{
            const token = jwt.sign({id:user.id},process.env.JWT_SECRET as string,{expiresIn:"5m"})
            const link = `${req.protocol}://${req.get("host")}/reset-password/${token}`
            sendEmail(email,link,user.full_name)
            res.status(200).json({status:"success",message:"reset password link sent to email"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const resetPassword = async(req:Request,res:Response)=>{
    try {
        const {id} = (req as any).user
        const {password} = req.body
        const user = await Users.findOne({where:{id:id}})
        if(!user){
            res.status(404).json({status:"error",message:"user not found"})
        }
        else{
            const updatePassword = await bcrypt.hash(password,10)
            await user.update({password:updatePassword})
            await user.save()
            res.status(200).json({status:"success",message:"password reseted successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}