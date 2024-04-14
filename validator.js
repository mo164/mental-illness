const { body, validationResult } = require("express-validator");

// Validator middleware
const validateUserInput = [
  // Validate email
  body("email", "Invalid email").isEmail(),
  // Validate password
  body("password", "Password must be at least 6 characters long").isLength({
    min: 8,
  }),

  // Middleware to check the result of the validations
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUserInput;