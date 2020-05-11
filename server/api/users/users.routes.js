const express = require("express");
const router = express.Router();
const UsersController = require('./users.controller.js');

const validateRegistration = require("../middleware/validation/registration");
const validateLogin = require("../middleware/validation/login");


// @route POST api/users/register
// @desc Register user
router.post('/register', function(request, response, next) {
  // Form validation
  const { errors, isValid } = validateRegistration(request.body);
  console.log('=======================1====================');
  console.log(errors);
  console.log(isValid);
  // Check validation
  if (!isValid) {
    return response.status(400).json(errors);
  }

  UsersController.create(request, response, next)
});


// @route POST api/users/login
// @desc Login user and return JWT token
router.post('/login', function(request, response, next) {
  // Form validation
  const { errors, isValid } = validateLogin(request.body);

  // Check validation
  if (!isValid) {
    return response.status(400).json(errors);
  }

  UsersController.authenticate(request, response, next)
});


module.exports = router;