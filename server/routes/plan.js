const express = require('express');
const router = express.Router();
const management = require('../api/plan');
const cors = require('cors');

router.use(cors());

router.get('/list', function (req, res, next) {
	management.list(req, res);
});
router.post('/list/myPlan', function (req, res, next) {
	management.myPlanList(req, res);
});
router.post('/load', function (req, res, next) {
	management.load(req, res);
});
router.post('/write', function (req, res, next) {
	management.write(req, res);
});
router.post('/delete', function (req, res, next) {
	management.delete(req, res);
});
router.post('/timeUpdate', function (req, res, next) {
	management.timeUpdate(req, res);
});
router.post('/dayUpdate', function (req, res, next) {
	management.dayUpdate(req, res);
});
router.post('/planUpdate', function (req, res, next) {
	management.planUpdate(req, res);
});
router.post('/search', function (req, res, next) {
	management.search(req, res);
});

router.post('/comment/write', function (req, res, next) {
	management.writeComment(req, res);
});
router.post('/comment/delete', function (req, res, next) {
	management.deleteComment(req, res);
});

router.post('/wishList', function (req, res, next) {
	management.getWishList(req, res);
});
router.post('/wishList/add', function (req, res, next) {
	management.addWishList(req, res);
});
router.post('/wishList/delete', function (req, res, next) {
	management.deleteWishList(req, res);
});
module.exports = router;
