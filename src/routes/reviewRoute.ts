import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { reviewValidation } from '../utils/validators/reviewValidation';
import { errorValidation } from '../utils/validators/errorValidation';
import { createReview, deleteReview, getReviewsCoures, getReviewsLesson, updateReview } from '../controllers/reviewController';

export const reviewRouter = express.Router();

reviewRouter.get('/course/:id',verifyToken,getReviewsCoures)  // id => courseId

reviewRouter.get('/lesson/:id',verifyToken,getReviewsLesson) // id => lessonId

reviewRouter.post('/',verifyToken,reviewValidation,errorValidation,createReview)

reviewRouter.route('/:id')  // id => reviewId
.put(verifyToken,updateReview)
.delete(verifyToken,deleteReview)