var AWS = require('aws-sdk');
var fs = require('fs');
const password = require('../db/password');
AWS.config.region = 'ap-northeast-2';

var s3 = new AWS.S3(password.s3);

const name = `profile_userid.png`;

// var param = {
// 	Bucket: 'localhostphoto3',
// 	Key: name,
// 	ACL: 'public-read',
// 	Body: fs.createReadStream('94.png'),
// 	ContentType: 'image/png',
// };

module.exports.upload = (req, res) => {
	// console.log('API입니다.', req.body, req.file);
	console.log(req.file, req.name, req.body);

	const param = {
		Bucket: 'localhostphoto3',
		Key: req.body.name || name,
		ACL: 'public-read',
		Body: fs.createReadStream(req.body.file),
		ContentType: 'image/*',
	};

	s3.upload(param, function (err, data) {
		console.log(err);
		console.log('uplaod', data);
	});

	res.send('fff');
};
