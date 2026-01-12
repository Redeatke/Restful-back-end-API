const express = require('express');
const { check, validationResult } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const { register, login, getMe } = require('../controllers/authController');

const router = express.Router();

// Validation Rules
const registerValidation = [
    check('username', 'Username is required and must be at least 3 chars').isLength({ min: 3 }),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

const loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);

module.exports = router;
