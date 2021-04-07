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
router.post('/update/photo', function (req, res, next) {
	management.updatePhoto(req, res);
});

router.post('/updatePW', function (req, res, next) {
	management.updatePW(req, res);
});
router.post('/delete', function (req, res, next) {
	management.delete(req, res);
});

// 팔로우
router.post('/follow', function (req, res, next) {
	management.follow(req, res);
});
router.post('/followingList', function (req, res, next) {
	management.followList(req, res);
});
router.post('/followerList/', function (req, res, next) {
	management.followerList(req, res);
});
router.get('/follow', function (req, res, next) {
	management.followList(req, res);
});

//
router.get('/list', function (req, res, next) {
	management.list(req, res);
});
router.get('/:id', function (req, res, next) {
	management.find(req, res);
});
router.post('/search', function (req, res, next) {
	management.search(req, res);
});
router.post('/searchHost', function (req, res, next) {
	management.searchHost(req, res);
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

router.get('/host/request/list', function (req, res, next) {
	management.listOfRequestedHost(req, res);
});

router.post('/host/request', function (req, res, next) {
	management.requestHost(req, res);
});
router.post('/host/allow', function (req, res, next) {
	management.allowHost(req, res);
});
router.post('/host/deny', function (req, res, next) {
	management.denyHost(req, res);
});
router.post('/host/demote', function (req, res, next) {
	management.demote(req, res);
});

router.post('/block', function (req, res, next) {
	management.block(req, res);
});

module.exports = router;
