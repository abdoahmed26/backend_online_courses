import { Request, Response } from "express"
import Reviews from "../models/reviews"
import Users from "../models/users"

export const getReviewsCoures = async(req:Request,res:Response)=>{
    try {
        const { id } = req.params
        const reviews = await Reviews.findAll({
            where:{
                reviewableId:id,
                reviewableType:"course"
            },
            include:[{model:Users,as:"user",attributes:{exclude:["password"]}}]
        })
        res.status(200).json({status:"success",data:reviews})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const getReviewsLesson = async(req:Request,res:Response)=>{
    try {
        const { id } = req.params
        const reviews = await Reviews.findAll({
            where:{
                reviewableId:id,
                reviewableType:"lesson"
            },
            include:[{model:Users,as:"user",attributes:{exclude:["password"]}}]
        })
        res.status(200).json({status:"success",data:reviews})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const createReview = async(req:Request,res:Response)=>{
    try {
        const review = await Reviews.create({...req.body,userId:(req as any).user.id})
        await review.save()
        res.status(201).json({status:"success",data:review})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateReview = async(req:Request,res:Response)=>{
    try {
        const { id } = req.params
        const review = await Reviews.findByPk(id)
        if(!review){
            res.status(404).json({status:"error",message:"review not found"})
        }
        else{
            await review.update(req.body)
            await review.save()
            res.status(200).json({status:"success",data:review})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteReview = async(req:Request,res:Response)=>{
    try {
        const { id } = req.params
        const review = await Reviews.findByPk(id)
        if(!review){
            res.status(404).json({status:"error",message:"review not found"})
        }
        else{
            await review.destroy()
            await review.save()
            res.status(200).json({status:"success",message:"review deleted successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}