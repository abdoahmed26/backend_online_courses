import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { confirmPaymentValidation, paymentValidation } from '../utils/validators/paymentValidation';
import { errorValidation } from '../utils/validators/errorValidation';
import { confirmPayment, createPayment, getPaymentsUser } from '../controllers/paymentsController';

export const paymentsRouter = express.Router();

paymentsRouter.get("/",verifyToken,getPaymentsUser)

paymentsRouter.post("/create",verifyToken,paymentValidation,errorValidation,createPayment)

paymentsRouter.post("/confirm/:id",verifyToken,confirmPaymentValidation,errorValidation,confirmPayment)