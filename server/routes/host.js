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
router.post('/searchHost', function (req, res, next) {
	management.searchHost(req, res);
});
router.get('/requestList', function (req, res, next) {
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

module.exports = router;
