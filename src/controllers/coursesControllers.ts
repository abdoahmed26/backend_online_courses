import { Request, Response } from "express";
import Courses from "../models/courses";
import { pagination } from "../middlewares/pagination";

export const getAllCourses = async(req:Request,res:Response)=>{
    try {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const offset = (+page - 1) * +limit;
        const courses = await Courses.findAndCountAll({
            order:[["createdAt","DESC"]],
            limit:+limit,
            offset,
        })
        const pagin = pagination(+limit,+page,courses.count)
        res.status(200).json({status:"success",data:courses.rows,pagination:pagin})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const getCourseById = async(req:Request,res:Response)=>{
    try {
        const course = await Courses.findByPk(req.params.id)
        if(!course){
            res.status(404).json({status:"error",message:"course not found"})
        }
        else{
            res.status(200).json({status:"success",data:course})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const createCourse = async(req:Request,res:Response)=>{
    try {
        const course = await Courses.create(req.body)
        await course.save()
        res.status(201).json({status:"success",data:course})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateCourse = async(req:Request,res:Response)=>{
    try {
        const course = await Courses.findByPk(req.params.id)
        if(!course){
            res.status(404).json({status:"error",message:"course not found"})
        }
        else{
            await course.update(req.body)
            await course.save()
            res.status(200).json({status:"success",data:course})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteCourse = async(req:Request,res:Response)=>{
    try {
        const course = await Courses.findByPk(req.params.id)
        if(!course){
            res.status(404).json({status:"error",message:"course not found"})
        }
        else{
            await course.destroy()
            await course.save()
            res.status(200).json({status:"success",message:"course deleted"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}