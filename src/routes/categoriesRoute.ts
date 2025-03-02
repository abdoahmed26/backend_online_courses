import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { allowToProcess } from '../middlewares/allowToProcess';
import { upload, uploadFile } from '../middlewares/uploadFile';
import { categoryValidations } from '../utils/validators/categoryValidation';
import { errorValidation } from '../utils/validators/errorValidation';
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../controllers/categoriesController';

export const categoryRouter = express.Router();

categoryRouter.get("/",getAllCategories)
categoryRouter.get("/:id",getCategory)
categoryRouter.post("/",
    verifyToken,allowToProcess("admin","manager","superadmin"),
    upload.single("image"),
    uploadFile,
    categoryValidations,
    errorValidation,
    createCategory
)
categoryRouter.put("/:id",
    verifyToken,allowToProcess("admin","manager","superadmin"),
    upload.single("image"),
    uploadFile,
    updateCategory
)
categoryRouter.delete("/:id",verifyToken,allowToProcess("admin","manager"),deleteCategory)