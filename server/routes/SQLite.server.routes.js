const SQLite = require('../controllers/SQLite.server.controller.js');
const express = require('express');
const router = express.Router();

router.route('/retrieve').post(SQLite.getData);

module.exports = router;
