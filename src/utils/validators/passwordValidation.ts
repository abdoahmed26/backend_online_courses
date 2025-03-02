import { body } from "express-validator";

export const updateValidation = [
    body("oldPassword")
        .notEmpty()
        .withMessage("oldPassword is required"),
    body("newPassword")
        .notEmpty()
        .withMessage("newPassword is required"),
]

export const forgotValidation = [
    body("email")
        .notEmpty()
        .withMessage("email is required"),
]

export const resetValidation = [
    body("password")
        .notEmpty()
        .withMessage("password is required"),
]