const express = require('express');
const router = express.Router();
const management = require('../api/map');
const cors = require('cors');

router.use(cors());

router.get('/searchPlaces', function (req, res, next) {
  management.searchPlaces(req, res);
});

module.exports = router;
