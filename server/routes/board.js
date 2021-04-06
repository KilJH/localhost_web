const express = require('express');
const router = express.Router();
const management = require('../api/board');
const cors = require('cors');

router.use(cors());

router.post('/write', function (req, res, next) {
	management.write(req, res);
});

module.exports = router;
