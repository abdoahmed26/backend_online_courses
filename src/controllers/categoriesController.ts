import { Request, Response } from "express"
import Categories from "../models/categories"

export const getAllCategories = async(req:Request,res:Response)=>{
    try {
        const categories = await Categories.findAll({order:[["createdAt","DESC"]]})
        if(!categories){
            res.status(404).json({status:"error",message:"categories not found"})
        }
        else{
            res.status(200).json({status:"success",data:categories})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const getCategory = async(req:Request,res:Response)=>{
    try {
        const id = req.params.id
        const category = await Categories.findOne({where:{id}})
        if(!category){
            res.status(404).json({status:"error",message:"category not found"})
        }
        else{
            res.status(200).json({status:"success",data:category})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const createCategory = async(req:Request,res:Response)=>{
    try {
        const newCategory = await Categories.create(req.body)
        await newCategory.save()
        res.status(200).json({status:"success",message:"category created successfully",data:newCategory})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateCategory = async(req:Request,res:Response)=>{
    try {
        const category = await Categories.findOne({where:{id:req.params.id}})
        if(!category){
            res.status(404).json({status:"error",message:"category not found"})
        }
        else{
            const updatedCategory = await category.update(req.body)
            await updatedCategory.save()
            res.status(200).json({status:"success",message:"category updated successfully",data:updatedCategory})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteCategory = async(req:Request,res:Response)=>{
    try {
        const category = await Categories.findOne({where:{id:req.params.id}})
        if(!category){
            res.status(404).json({status:"error",message:"category not found"})
        }
        else{
            await category.destroy()
            await category.save()
            res.status(200).json({status:"success",message:"category deleted successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}