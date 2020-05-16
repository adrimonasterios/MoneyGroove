const express = require('express');
const router = express.Router();

router.use('/users', require('./users/users.routes.js'));
router.use('/products', require('./products/products.routes.js'));
router.use('/bills', require('./bills/bills.routes.js'));

// 404
// router.use('*', require('./404'));

module.exports = router;
