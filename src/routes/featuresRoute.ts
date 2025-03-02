import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { allowToProcess } from '../middlewares/allowToProcess';
import { createFeature, deleteFeature, getFeatures, updateFeature } from '../controllers/featuresControllers';

export const featuresRouter = express.Router();

featuresRouter.route('/').get(getFeatures)
.post(verifyToken,allowToProcess("admin","manager","superadmin"),createFeature)

featuresRouter.route('/:id')
.put(verifyToken,allowToProcess("admin","manager","superadmin"),updateFeature)
.delete(verifyToken,allowToProcess("admin","manager","superadmin"),deleteFeature)