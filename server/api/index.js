const express = require('express');
const router = express.Router();

router.use('/users', require('./users/users.routes.js'));

// 404
// router.use('*', require('./404'));

module.exports = router;
