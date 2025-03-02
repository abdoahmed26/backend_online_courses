import { body } from "express-validator";

export const paymentValidation = [
    body("amount")
        .notEmpty()
        .withMessage("amount is required")
        .isNumeric()
        .withMessage("amount must be a number"),
    body("currency")
        .notEmpty()
        .withMessage("currency is required")
        .isIn(["usd","egp"])
        .withMessage("currency must be usd or egp"),
]

export const confirmPaymentValidation = [
    body("planId")
        .notEmpty()
        .withMessage("planId is required")
        .isNumeric()
        .withMessage("planId must be a number"),
]