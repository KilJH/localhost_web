const express = require('express');
const router = express.Router();
const management = require('../api/host');
const cors = require('cors');

router.use(cors());

router.get('/list', function (req, res, next) {
	management.list(req, res);
});
router.post('/applyList', function (req, res, next) {
	management.applyList(req, res);
});
router.post('/matchList', function (req, res, next) {
	management.matchList(req, res);
});
router.post('/nearbyList', function (req, res, next) {
	management.nearbyList(req, res);
});
router.post('/search', function (req, res, next) {
	management.searchHost(req, res);
});
router.get('/request/list', function (req, res, next) {
	management.listOfRequestedHost(req, res);
});
router.post('/request', function (req, res, next) {
	management.requestHost(req, res);
});
router.post('/allow', function (req, res, next) {
	management.allowHost(req, res);
});
router.post('/deny', function (req, res, next) {
	management.denyHost(req, res);
});
router.post('/demote', function (req, res, next) {
	management.demote(req, res);
});

router.post('/load', function (req, res, next) {
	management.load(req, res);
});

router.post('/update', function (req, res, next) {
	management.update(req, res);
});

router.post('/status', function (req, res, next) {
	management.status(req, res);
});

router.post('/applyHosting', function (req, res, next) {
	management.applyHosting(req, res);
});

router.post('/approveHosting', function (req, res, next) {
	management.approveHosting(req, res);
});

router.post('/denyHosting', function (req, res, next) {
	management.denyHosting(req, res);
});

router.post('/reviewWrite', function (req, res, next) {
	management.reviewWrite(req, res);
});
module.exports = router;
