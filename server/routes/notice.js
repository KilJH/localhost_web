const express = require('express');
const router = express.Router();
const management = require('../api/notice');
const cors = require('cors');

router.use(cors());

router.get('/list', function (req, res, next) {
	management.list(req, res);
});
router.post('/write', function (req, res, next) {
	management.write(req, res);
});
router.post('/update', function (req, res, next) {
	management.update(req, res);
});
router.post('/delete', function (req, res, next) {
	management.delete(req, res);
});
router.get('/:id', function (req, res, next) {
	management.find(req, res);
});
router.post('/search', function (req, res, next) {
	management.search(req, res);
});

module.exports = router;
