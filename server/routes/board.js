const express = require('express');
const router = express.Router();
const management = require('../api/board');
const cors = require('cors');

router.use(cors());

<<<<<<< HEAD
=======
router.get('/list', function (req, res, next) {
	management.list(req, res);
});

>>>>>>> 6c7ecd3918a1cb34e61fd98503939eb0ac364af2
router.post('/write', function (req, res, next) {
	management.write(req, res);
});

<<<<<<< HEAD
=======
router.post('/load', function (req, res, next) {
	management.load(req, res);
});

>>>>>>> 6c7ecd3918a1cb34e61fd98503939eb0ac364af2
module.exports = router;
