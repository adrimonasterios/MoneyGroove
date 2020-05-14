const express = require("express");
const router = express.Router();
const passport = require("passport");
const ProductsController = require('./products.controller.js');


// @route POST api/products/create
// @desc Create Product
router.post('/create', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  let data = request.body;

  if (request.user) {
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

  ProductsController.getAll()
    .then(products => response.json(products))
    .catch(err => next(err));
});


module.exports = router;
