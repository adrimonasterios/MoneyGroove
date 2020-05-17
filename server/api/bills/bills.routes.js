const express = require("express");
const router = express.Router();
const passport = require("passport");
const BillsController = require('./bills.controller.js');


// @route POST api/billss/create
// @desc Create Bill
router.post('/create', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let data = request.body;
  console.log(data);
  if (request.user) {
    data.userId = request.user.id
    data.lastUpdatedBy = request.user.email;
    data.lastUpdated = new Date();
  }

  BillsController.create(data)
    .then(products => response.json(products))
    .catch(err => next(err));
});

// @route GET api/billss
// @desc Get Bills
router.get('/', passport.authenticate('jwt', {session: false}), function(request, response, next) {

  BillsController.getAll()
    .then(products => response.json(products))
    .catch(err => next(err));
});


module.exports = router;
