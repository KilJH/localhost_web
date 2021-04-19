const express = require('express');
const router = express.Router();
const management = require('../api/host');
const cors = require('cors');

router.use(cors());

router.get('/list', function (req, res, next) {
  management.list(req, res);
});

router.post('/nearbyList', function (req, res, next) {
  management.nearbyList(req, res);
});

router.post('/load', function (req, res, next) {
  management.load(req, res);
});

router.post('/update', function (req, res, next) {
  management.update(req, res);
});

module.exports = router;
