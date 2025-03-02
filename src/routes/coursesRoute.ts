import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { allowToProcess } from '../middlewares/allowToProcess';
import { upload, uploadFile } from '../middlewares/uploadFile';
import { courseValidation } from '../utils/validators/coursesValidation';
import { errorValidation } from '../utils/validators/errorValidation';
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/coursesControllers';

export const coursesRoute = express.Router();

coursesRoute.route('/')
.get(verifyToken,getAllCourses)
.post(
    verifyToken,
    allowToProcess("admin","manager","superadmin"),
    upload.single("image"),
    uploadFile,
    courseValidation,
    errorValidation,
    createCourse
)

coursesRoute.route('/:id')
.get(verifyToken,getCourseById)
.put(
    verifyToken,
    allowToProcess("admin","manager","superadmin"),
    upload.single("image"),
    uploadFile,
    updateCourse
)
.delete(verifyToken,allowToProcess("admin","manager"),deleteCourse)