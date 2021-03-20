const express = require('express');
const router = express.Router();
const management = require("../management");

router.post('/register', function(req, res, next) {
    management.register(req, res);
});

router.post('/login_check', function(req, res, next) {
    management.login(req, res);
});

router.post('/update', function(req, res, next) {
    management.update(req, res);
});

module.exports = router;