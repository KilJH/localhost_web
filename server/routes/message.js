const express = require('express');
const router = express.Router();
const management = require('../api/message');
const cors = require('cors');

router.use(cors());

router.post('/room/create', function (req, res, next) {
	management.createRoom(req, res);
});

router.post('/room/load', function (req, res, next) {
	management.loadRoom(req, res);
});

router.post('/room/exit', function (req, res, next) {
	management.exitRoom(req, res);
});

router.post('/write', function (req, res, next) {
	management.writeMessage(req, res);
});

router.post('/room/list', function (req, res, next) {
	management.getRoomList(req, res);
});

module.exports = router;
