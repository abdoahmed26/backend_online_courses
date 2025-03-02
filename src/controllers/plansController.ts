import { Request, Response } from "express"
import Plans from "../models/plans"
import Features from "../models/features"
import PlansFeatures from "../models/plansFeatures"

export const getPlans = async(req:Request,res:Response)=>{
    try {
        const plans = await Plans.findAll({include:[{model:Features,as:"features"}]})
        if(!plans){
            res.status(404).json({status:"error",message:"plans not found"})
        }
        else{
            res.status(200).json({status:"success",data:plans})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const getPlanById = async(req:Request,res:Response)=>{
    try {
        const plan = await Plans.findByPk(req.params.id,{include:[{model:Features,as:"features"}]})
        if(!plan){
            res.status(404).json({status:"error",message:"plans not found"})
        }
        else{
            res.status(200).json({status:"success",data:plan})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const createPlan = async(req:Request,res:Response)=>{
    try {
        const {name, price, features} = req.body
        const plan = await Plans.create({name,price})
        await plan.save()
        await PlansFeatures.bulkCreate(
            features.map((featureId) => ({
                planId: plan.id,
                featureId,
            }))
        )
        if(!plan){
            res.status(404).json({status:"error",message:"error creating plan"})
        }
        else{
            res.status(201).json({status:"success",message:"creating plan successfully"})
        }
        
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updatePlan = async(req:Request,res:Response)=>{
    try {
        const plan = await Plans.findByPk(req.params.id)
        if(!plan){
            res.status(404).json({status:"error",message:"plans not found"})
        }
        else{
            if(req.body.features){
                await PlansFeatures.destroy({where:{planId:plan.id}})
                await PlansFeatures.bulkCreate(
                    req.body.features.map((featureId) => ({
                        planId: plan.id,
                        featureId,
                    }))
                )
            }
            if(req.body.name || req.body.price){
                await plan.update({
                    name: req.body.name || plan.name,
                    price: req.body.price || plan.price,
                })
                await plan.save()
            }
            res.status(200).json({status:"success",message:"updating plan successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deletePlan = async(req:Request,res:Response)=>{
    try {
        const plan = await Plans.findByPk(req.params.id)
        if(!plan){
            res.status(404).json({status:"error",message:"plans not found"})
        }
        else{
            await plan.destroy()
            await plan.save()
            res.status(200).json({status:"success",message:"deleting plan successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}