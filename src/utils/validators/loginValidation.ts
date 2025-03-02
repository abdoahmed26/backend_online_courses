import { body } from "express-validator";

export const loginValidation = [
    body("email")
        .notEmpty()
        .withMessage("full_name is required")
        .isEmail()
        .withMessage("email is required"),
    body("password")
        .notEmpty()
        .withMessage("password is required")
]