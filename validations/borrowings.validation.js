import { body } from 'express-validator'

export const borrowingValidation = [
  body('userId')
    .isNumeric()
    .withMessage('User ID must be a number')
    .notEmpty()
    .withMessage('User ID is required')
    .toInt(),
  body('bookId')
    .isNumeric()
    .withMessage('Book ID must be a number')
    .notEmpty()
    .withMessage('Book ID is required')
    .toInt(),
]
