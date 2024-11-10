import { body, validationResult } from 'express-validator';

export const validateUserRegistration = [
  body('user_id').notEmpty().withMessage('User ID is required'),
  body('username').notEmpty().withMessage('Username is required'),  // Changed displayName to username
  body('email').isEmail().withMessage('Valid email is required') // Added email validation
    .normalizeEmail(),
  body('role').notEmpty().withMessage('Role is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('password').notEmpty().withMessage('Password is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUserLogin = [
  body('user_id').notEmpty().withMessage('User ID is required'),
  body('password').notEmpty().withMessage('Password is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
