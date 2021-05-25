const express = require('express');
const router = express.Router();
const management = require('../api/s3');
const cors = require('cors');

router.use(cors());

router.post('/upload', function (req, res, next) {
	management.upload(req, res);
});
router.post('/upload/plan/image', function (req, res, next) {
	management.planImageUpload(req, res);
});
router.post('/load', function (req, res, next) {
	management.load(req, res);
});
router.post('/copy', function (req, res, next) {
	management.copy(req, res);
});

module.exports = router;
