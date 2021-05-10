const express = require('express');
const router = express.Router();
const management = require('../api/auth');

router.post('/login', function (req, res, next) {
	management.login(req, res);
});

// 페이지 인증
router.get('/check', function (req, res, next) {
	management.checkToken(req, res);
});
// 로그아웃
router.get('/logout', function (req, res, next) {
	management.logout(req, res);
});

module.exports = router;
