import { body } from "express-validator";

export const categoryValidations = [
    body("name")
        .notEmpty()
        .withMessage("name is required"),
    body("description")
        .notEmpty()
        .withMessage("description is required"),
    body("image")
        .notEmpty()
        .withMessage("image is required"),
]