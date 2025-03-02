import { body } from "express-validator";

export const planValidation =  [
    body("name")
        .notEmpty()
        .withMessage("name is required"),
    body("price")
        .notEmpty()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("price must be a number"),
    body("features")
        .notEmpty()
        .withMessage("features is required")
        .isArray()
        .withMessage("features must be an array")
]