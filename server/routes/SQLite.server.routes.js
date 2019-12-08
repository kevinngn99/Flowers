const SQLite = require('../controllers/SQLite.server.controller.js');
const express = require('express');
const router = express.Router();

router.route('/flowers').post(SQLite.getFlowers);
router.route('/sightings').post(SQLite.getSightings);
router.route('/updateFlowers').post(SQLite.flowersUpdate);
router.route('/updateSightings').post(SQLite.sightingsUpdate);

module.exports = router;
