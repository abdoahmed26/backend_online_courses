import { Request, Response } from "express"
import Users from "../models/users"
import { pagination } from "../middlewares/pagination"
import Plans from "../models/plans"

export const getUser = async(req:Request,res:Response)=>{
    try {
        const id = (req as any).user.id
        const user = await Users.findOne({
            where:{id},
            attributes:{exclude:["password"]},
            include:[{model:Plans,as:"plan"}]
        })
        if(!user){
            res.status(404).json({status:"error",message:"user not found"})
        }
        else{
            res.status(200).json({status:"success",data:user})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const getAllUsers = async(req:Request,res:Response)=>{
    try {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const offset = (+page - 1) * +limit;
        const users = await Users.findAndCountAll({
            attributes:{exclude:["password"]},
            order:[["createdAt","DESC"]],
            limit : +limit,
            offset : offset
        })
        if(!users){
            res.status(404).json({status:"error",message:"users not found"})
        }
        else{
            const pagin = pagination(+limit,+page,users.count)
            res.status(200).json({status:"success",data:users.rows,pagination:pagin})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateUser = async(req:Request,res:Response)=>{
    try {
        const id = (req as any).user.id
        const user = await Users.findOne({where:{id},attributes:{exclude:["password"]}})
        if(!user){
            res.status(404).json({status:"error",message:"user not found"})
        }
        else{
            await user.update(req.body)
            await user.save()
            res.status(200).json({status:"success",message:"user updated successfully",data:user})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteUser = async(req:Request,res:Response)=>{
    try {
        const id = (req as any).user.id
        const user = await Users.findOne({where:{id},attributes:{exclude:["password"]}})
        if(!user){
            res.status(404).json({status:"error",message:"user not found"})
        }
        else{
            await user.destroy()
            await user.save()
            res.status(200).json({status:"success",message:"user deleted successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}