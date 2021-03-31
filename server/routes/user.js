const express = require('express');
const router = express.Router();
const management = require('../api/user');
const cors = require('cors');

router.use(cors());

router.post('/register', function (req, res, next) {
	management.register(req, res);
});

router.post('/update', function (req, res, next) {
	management.update(req, res);
});
router.post('/delete', function (req, res, next) {
	management.delete(req, res);
});
router.post('/follow', function (req, res, next) {
	management.follow(req, res);
});
router.get('/follow', function (req, res, next) {
	management.followList(req, res);
});
router.get('/list', function (req, res, next) {
	management.list(req, res);
});
router.get('/:id', function (req, res, next) {
	management.find(req, res);
});
router.post('/follow_check', function (req, res, next) {
	management.isFollowed(req, res);
});

router.post('/checkAuth', function (req, res, next) {
	management.checkAuth(req, res);
});

router.get('/host/list', function (req, res, next) {
	management.listOfHost(req, res);
});

router.post('/host/approve', function (req, res, next) {
	management.approveHost(req, res);
});

module.exports = router;
