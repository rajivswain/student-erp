import { body } from 'express-validator';

export const studentValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

  body('roll_number')
    .notEmpty().withMessage('Roll number is required')
    .isAlphanumeric().withMessage('Roll number must be alphanumeric'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('class')
    .notEmpty().withMessage('Class is required'),

  body('section')
    .optional()
    .isLength({ max: 1 }).withMessage('Section must be a single character'),

  body('dob')
    .optional()
    .isISO8601().withMessage('Date of birth must be a valid date'),
];
