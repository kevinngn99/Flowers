const SQLite = require('../controllers/SQLite.server.controller.js');
const express = require('express');
const router = express.Router();

router.route('/files').post(SQLite.getFiles);
router.route('/flowers').post(SQLite.getFlowers);
router.route('/sightings').post(SQLite.getSightings);
router.route('/updateFlowers').post(SQLite.flowersUpdate);
router.route('/updateSightings').post(SQLite.sightingsUpdate);
router.route('/insertSightings').post(SQLite.sightingsInsert);
router.route('/insertFlowers').post(SQLite.flowersInsert);
router.route('/insertFiles').post(SQLite.filesInsert);
router.route('/deleteSightings').post(SQLite.sightingsDelete);
router.route('/deleteFlowers').post(SQLite.flowersDelete);
router.route('/deleteFiles').post(SQLite.filesDelete);

module.exports = router;
