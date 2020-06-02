const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');
const ProductsController = require('./products.controller.js');


// @route POST api/products/create
// @desc Create Product
router.post('/create', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let data = request.body;

  if (request.user) {
    data.userId = request.user.id;
    data.lastUpdatedBy = request.user.email;
    data.lastUpdated = new Date();
  }

  ProductsController.create(data)
    .then(products => response.json(products))
    .catch(err => next(err));
});

// @route GET api/products
// @desc Get Products
router.get('/', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let userId = ''

  if (request.user) {
    userId = request.user.id;
  }

  ProductsController.getAll(userId)
    .then(products => response.json(products))
    .catch(err => next(err));
});

// @route PUT api/products
// @desc Update Products
router.put('/', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let data = request.body

  if (request.user) {
    data.forEach(item => {
        item.lastUpdatedBy = request.user.email;
        item.lastUpdated = new Date();
    })
  }

  ProductsController.update(data)
    .then(bills => response.sendStatus(200))
    .catch(err => next(err));
});

// @route DELETE api/products/:id
// @desc Delete Products
router.delete('/:ids', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  console.log(JSON.stringify(request.params.ids));
  let idsToDelete = request.params.ids.split(',').map(id => new mongoose.Types.ObjectId(id))

  ProductsController.delete(idsToDelete)
    .then(products => response.sendStatus(200))
    .catch(err => next(err));
});


module.exports = router;
