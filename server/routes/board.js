const express = require('express');
const router = express.Router();
const management = require('../api/board');
const cors = require('cors');

router.use(cors());

router.get('/list', function (req, res, next) {
	management.list(req, res);
});
router.post('/list/myboard', function (req, res, next) {
	management.myBoardList(req, res);
});
router.post('/write', function (req, res, next) {
	management.write(req, res);
});
router.post('/load', function (req, res, next) {
	management.load(req, res);
});
router.post('/update', function (req, res, next) {
	management.update(req, res);
});
router.post('/delete', function (req, res, next) {
	management.delete(req, res);
});
router.post('/comment', function (req, res, next) {
	management.comment(req, res);
});
router.post('/search', function (req, res, next) {
	management.search(req, res);
});

module.exports = router;
