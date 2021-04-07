const express = require('express');
const router = express.Router();
const management = require('../api/plan');
const cors = require('cors');

router.use(cors());

router.get('/list', function (req, res, next) {
	management.list(req, res);
});

router.post('/load', function (req, res, next) {
	management.load(req, res);
});

router.post('/timeWrite', function (req, res, next) {
	management.timeWrite(req, res);
});

router.post('/dayWrite', function (req, res, next) {
	management.dayWrite(req, res);
});

router.post('/planWrite', function (req, res, next) {
	management.planWrite(req, res);
});


module.exports = router;
