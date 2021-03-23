const express = require('express');
const router = express.Router();
const management = require('../api/auth');
const cors = require('cors');

const corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
};

router.use(cors(corsOptions));

router.post('/login', function (req, res, next) {
	management.login(req, res);
});

// 페이지 인증

// 로그아웃

module.exports = router;
