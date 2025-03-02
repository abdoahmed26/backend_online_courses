import { body } from "express-validator";

export const registerValidation = [
    body("full_name")
        .notEmpty()
        .withMessage("full_name is required"),
    body("email")
        .notEmpty()
        .withMessage("full_name is required")
        .isEmail()
        .withMessage("email is required"),
    body("password")
        .notEmpty()
        .withMessage("password is required")
]