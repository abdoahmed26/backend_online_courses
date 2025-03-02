import { Request, Response } from "express";
import Stripe from "stripe";
import Payments from "../models/payments";
import Users from "../models/users";
import Plans from "../models/plans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const createPayment = async(req:Request,res:Response)=>{
    try {
        const {amount,currency} = req.body
        const payment = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        })
        res.status(200).json({status:"success",data:{client_secret:payment.client_secret}})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const confirmPayment = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const {planId} = req.body
        const plan = await Plans.findByPk(planId)
        const payment = await stripe.paymentIntents.retrieve(id)
        if(!payment || !plan){
            res.status(404).json({status:"error",message:"payment or plan not found"})
        }
        else{
            const newPayment = await Payments.create({
                planId:planId,
                userId:(req as any).user.id,
                amount:payment.amount,
                amountReceived:payment.amount,
                paymentId:payment.id,
                currency:payment.currency,
                paymentMethod:payment.payment_method_types[0],
                status:payment.status
            })
            await newPayment.save()
            if(payment.status === "succeeded"){
                const updateUser = await Users.findByPk((req as any).user.id)
                await updateUser?.update({planId:planId})
                await updateUser?.save()
                res.status(200).json({status:"success",message:`payment succeeded`})
            }
            else{
                res.status(404).json({status:"error",message:`payment ${payment.status}`})
            }
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const getPaymentsUser = async(req:Request,res:Response)=>{
    try {
        const {id} = (req as any).user
        const payment = await Payments.findAll({where:{userId:id}})
        if(!payment){
            res.status(404).json({status:"error",message:"payment not found"})
        }
        else{
            res.status(200).json({status:"success",data:payment})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}