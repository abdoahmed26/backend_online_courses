import { body } from "express-validator";

export const reviewValidation = [
    body("reviewableId")
        .notEmpty()
        .withMessage("reviewableId is required")
        .isNumeric()
        .withMessage("reviewableId must be a number"),
    body("reviewableType")
        .notEmpty()
        .withMessage("reviewableType is required")
        .isIn(["course", "lesson"]) 
        .withMessage("reviewableType must be course or lesson"),
    body("rating")
        .notEmpty()
        .withMessage("rating is required")
        .isNumeric()
        .withMessage("rating must be a number")
        .isIn([1, 2, 3, 4, 5])
        .withMessage("rating must be between 1 and 5"),
    body("comment")
        .notEmpty()
        .withMessage("comment is required"),
]