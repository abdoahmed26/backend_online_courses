import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { upload, uploadFile } from '../middlewares/uploadFile';
import { allowToProcess } from '../middlewares/allowToProcess';
import { lessonValidation } from '../utils/validators/lessonsValidation';
import { errorValidation } from '../utils/validators/errorValidation';
import { createLesson, deleteLesson, getLessonById, getLessonsCourse, updateLesson } from '../controllers/lessonsControllers';

export const lessonsRouter = express.Router();

lessonsRouter.route('/course/:id') // => id => courseId
.get(verifyToken,getLessonsCourse)
.post(
    verifyToken,
    allowToProcess("admin","manager","superadmin"),
    upload.single("video"),
    uploadFile,
    lessonValidation,
    errorValidation,
    createLesson
)

lessonsRouter.route('/:id') // => id => lessonId
.get(verifyToken,getLessonById)
.put(
    verifyToken,
    allowToProcess("admin","manager","superadmin"),
    upload.single("video"),
    uploadFile,
    updateLesson
)
.delete(verifyToken,allowToProcess("admin","manager","superadmin"),deleteLesson)