import { body } from "express-validator";

export const courseValidation = [
    body("title")
    .notEmpty()
    .withMessage("title is required"),
    body("description")
    .notEmpty()
    .withMessage("description is required"),
    body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number"),
    body("image")
    .notEmpty()
    .withMessage("image is required"),
    body("level")
    .notEmpty()
    .withMessage("level is required"),
    body("author")
    .notEmpty()
    .withMessage("author is required"),
    body("categoryId")
    .notEmpty()
    .withMessage("categoryId is required")
    .isNumeric()
    .withMessage("categoryId must be a number"),
]