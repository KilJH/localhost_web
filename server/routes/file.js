const express = require('express');
const router = express.Router();
const management = require('../api/s3_upload');
const cors = require('cors');

const corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
};

router.use(cors(corsOptions));

router.post('/upload', function (req, res, next) {
	management.upload(req, res);
});

module.exports = router;
