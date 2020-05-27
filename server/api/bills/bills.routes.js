const express = require("express");
const router = express.Router();
const passport = require("passport");
const BillsController = require('./bills.controller.js');


// @route POST api/bills/create
// @desc Create Bill
router.post('/create', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let data = request.body;

  if (request.user) {
    data.userId = request.user.id
    data.lastUpdatedBy = request.user.email;
    data.lastUpdated = new Date();
  }

  BillsController.create(data)
    .then(products => response.json(products))
    .catch(err => next(err));
});

// @route GET api/bills
// @desc Get Bills
router.get('/', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let userId = ''

  if (request.user) {
    userId = request.user.id
  }

  BillsController.getAll(userId)
    .then(bills => response.json(bills))
    .catch(err => next(err));
});

// @route GET api/bills/metrics
// @desc Get Bills
router.get('/metrics', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let userId = ''

  if (request.user) {
    userId = request.user.id
  }

  BillsController.getMetrics(userId)
    .then(bills => response.json(bills))
    .catch(err => next(err));
});

// @route GET api/bills/shoppingList
// @desc Get shopping list items
router.get('/shoppingList', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let userId = ''

  if (request.user) {
    userId = request.user.id
  }

  BillsController.getShoppingListData(userId)
    .then(data => response.json(data))
    .catch(err => next(err));
});

// @route PUT api/bills/:id
// @desc Update Bill
router.put('/:id', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let data = request.body;
  if (request.user) {
    data.lastUpdatedBy = request.user.email;
    data.lastUpdated = new Date();
  }

  BillsController.update(request.params.id, data)
    .then(bills => response.sendStatus(200))
    .catch(err => next(err));
});

// @route DELETE api/bills/:id
// @desc Delete Bill
router.delete('/:id', passport.authenticate('jwt', {session: false}), function(request, response, next) {

  BillsController.delete(request.params.id)
    .then(bills => response.sendStatus(200))
    .catch(err => next(err));
});


module.exports = router;
