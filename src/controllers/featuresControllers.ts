import { Request, Response } from "express"
import Features from "../models/features"

export const getFeatures = async(req:Request,res:Response)=>{
    try {
        const features = await Features.findAll()
        if(!features){
            res.status(404).json({status:"error",message:"features not found"})
        }
        else{
            res.status(200).json({status:"success",data:features})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const createFeature = async(req:Request,res:Response)=>{
    try {
        const feature = await Features.create(req.body)
        await feature.save()
        if(!feature){
            res.status(404).json({status:"error",message:"error creating feature"})
        }
        else{
            res.status(201).json({status:"success",data:feature})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateFeature = async(req:Request,res:Response)=>{
    try {
        const feature = await Features.findOne({where:{id:req.params.id}})
        if(!feature){
            res.status(404).json({status:"error",message:"error updating feature"})
        }
        else{
            await feature.update(req.body)
            await feature.save()
            res.status(200).json({status:"success",data:feature})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteFeature = async(req:Request,res:Response)=>{
    try {
        const feature = await Features.findOne({where:{id:req.params.id}})
        if(!feature){
            res.status(404).json({status:"error",message:"error deleting feature"})
        }
        else{
            await feature.destroy()
            await feature.save()
            res.status(200).json({status:"success",message:"deleting feature successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}