var AWS = require('aws-sdk');
var fs = require('fs');
const password = require('../db/password');
AWS.config.region = 'ap-northeast-2';

var s3 = new AWS.S3(password.s3);

module.exports.upload = (req, res) => {
	console.log(req.files.file);
	var param = {
		Bucket: 'localhostphoto3',
		Key: `${req.body.name}.${req.files.file.mimetype.split('/')[1]}`,
		ACL: 'public-read',
		Body: req.files.file.data,
		ContentType: req.files.file.mimetype,
	};

	s3.upload(param, function (err, data) {
		if (err) console.log(err);
		console.log('uplaod', data);
		res.send({ success: true, url: data.Location });
	});
};

module.exports.load = (req, res) => {
	s3.listObjects({ Bucket: 'localhostphoto3' })
		.on('success', function handlePage(response) {
			for (var name in response.data.Contents) {
				console.log(response.data.Contents[name].Key);
			}
			if (response.hasNextPage()) {
				response.nextPage().on('success', handlePage).send();
			}
		})
		.send();
};
