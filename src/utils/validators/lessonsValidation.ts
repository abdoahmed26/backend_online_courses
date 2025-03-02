import { body, param } from "express-validator";

export const lessonValidation = [
    body("title")
        .notEmpty()
        .withMessage("title is required"),
    body("description")
        .notEmpty()
        .withMessage("description is required"),
    body("video")
        .notEmpty()
        .withMessage("video is required"),
    param("id")
        .notEmpty()
        .withMessage("courseId is required in params")
]