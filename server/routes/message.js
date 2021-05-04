const express = require('express');
const router = express.Router();
const management = require('../api/message');
const cors = require('cors');

router.use(cors());

router.post('/create/room', function (req, res, next) {
    management.createRoom(req, res);
});

router.post('/load/room', function (req, res, next) {
    management.loadRoom(req, res);
});

router.post('/exit/room', function (req, res, next) {
    management.exitRoom(req, res);
});

router.post('/write', function (req, res, next) {
    management.writeMessage(req, res);
});

module.exports = router;
