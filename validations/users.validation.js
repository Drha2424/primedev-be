import { body } from 'express-validator'

export const userValidation = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .notEmpty()
    .withMessage('Password is required'),
  body('role')
    .optional()
    .isString()
    .withMessage('Role must be a string'),
]

export const updateUserValidation = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty if provided'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Must be a valid email address')
    .notEmpty()
    .withMessage('Email cannot be empty if provided'),
  body('password')
    .optional()
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isString()
    .withMessage('Role must be a string'),
]
