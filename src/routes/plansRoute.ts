import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { allowToProcess } from '../middlewares/allowToProcess';
import { createPlan, deletePlan, getPlanById, getPlans, updatePlan } from '../controllers/plansController';
import { planValidation } from '../utils/validators/planValidation';
import { errorValidation } from '../utils/validators/errorValidation';

export const plansRouter = express.Router();

plansRouter.route('/').get(getPlans)
.post(verifyToken,
    allowToProcess("admin","manager","superadmin"),
    planValidation,
    errorValidation,
    createPlan
)

plansRouter.route('/:id')
.get(getPlanById)
.put(verifyToken,allowToProcess("admin","manager","superadmin"),updatePlan)
.delete(verifyToken,allowToProcess("admin","manager","superadmin"),deletePlan)