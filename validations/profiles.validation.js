import { body } from 'express-validator'

export const profileValidation = [
  body('userId')
    .isNumeric()
    .withMessage('User ID must be a number')
    .notEmpty()
    .withMessage('User ID is required')
    .toInt(),
  body('address')
    .isString()
    .withMessage('Address must be a string')
    .notEmpty()
    .withMessage('Address is required'),
  body('phone')
    .isString()
    .withMessage('Phone must be a string')
    .notEmpty()
    .withMessage('Phone is required'),
]

export const updateProfileValidation = [
  body('address')
    .optional()
    .isString()
    .withMessage('Address must be a string')
    .notEmpty()
    .withMessage('Address cannot be empty if provided'),
  body('phone')
    .optional()
    .isString()
    .withMessage('Phone must be a string')
    .notEmpty()
    .withMessage('Phone cannot be empty if provided'),
]

export const avatarValidation = [
  body('avatar').custom((value, { req }) => {
    const avatar = req.file

    if (!avatar) {
      throw new Error('Avatar file is required')
    }

    // Check file type
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(avatar.mimetype)) {
      throw new Error('Avatar must be a PNG or JPEG image')
    }

    // Check file size (max 5MB)
    if (avatar.size > 5 * 1024 * 1024) {
      throw new Error('Avatar must be less than 5MB')
    }

    return true
  }),
]
