import { Request, Response } from "express"
import Lessons from "../models/lessons"
import Courses from "../models/courses"

export const getLessonsCourse = async(req:Request,res:Response)=>{
    try {
        const planUser = (req as any).user.planId
        const course = await Courses.findByPk(req.params.id)
        if(!course){
            res.status(404).json({status:"error",message:"course not found"})
        }
        else{
            if(course.planId === null || course.planId === planUser){
                const lessons = await Lessons.findAll({
                    where:{courseId:req.params.id},
                })
                res.status(200).json({status:"success",data:lessons})
            }
            else{
                const lessons = await Lessons.findAll({
                    where:{courseId:req.params.id},
                    attributes:{exclude:["video"]},
                })
                res.status(200).json({status:"success",data:lessons})
            }
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const getLessonById = async(req:Request,res:Response)=>{
    try {
        const lesson = await Lessons.findByPk(req.params.id)
        if(!lesson){
            res.status(404).json({status:"error",message:"lessons not found"})
        }
        else{
            const planUser = (req as any).user.planId
            const course = await Courses.findByPk(lesson.courseId)
            if(course?.planId === null || course?.planId === planUser){
                res.status(200).json({status:"success",data:lesson})
            }
            else{
                const lessons = await Lessons.findByPk(req.params.id,{
                    attributes:{exclude:["video"]},
                })
                res.status(200).json({status:"success",data:lessons})
            }
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const createLesson = async(req:Request,res:Response)=>{
    try {
        const course = await Courses.findOne({where:{id:req.params.id}})
        if(!course){
            res.status(404).json({status:"error",message:"course not found"})
        }
        else{
            const lesson = await Lessons.create({...req.body,courseId:req.params.id})
            await lesson.save()
            res.status(201).json({status:"success",message:"lesson created successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateLesson = async(req:Request,res:Response)=>{
    try {
        const lesson = await Lessons.findByPk(req.params.id)
        if(!lesson){
            res.status(404).json({status:"error",message:"lesson not found"})
        }
        else{
            await lesson.update(req.body)
            await lesson.save()
            res.status(200).json({status:"success",message:"lesson updated successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteLesson = async(req:Request,res:Response)=>{
    try {
        const lesson = await Lessons.findByPk(req.params.id)
        if(!lesson){
            res.status(404).json({status:"error",message:"lesson not found"})
        }
        else{
            await lesson.destroy()
            await lesson.save()
            res.status(200).json({status:"success",message:"lesson deleted successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}