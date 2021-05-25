var AWS = require('aws-sdk');
var fs = require('fs');
const multer = require('multer');
const password = require('../db/password');
AWS.config.region = 'ap-northeast-2';

var s3 = new AWS.S3(password.s3);

module.exports.upload = (req, res) => {
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
		res.json({ success: true, url: data.Location });
	});
};

<<<<<<< HEAD
module.exports.multiUpload = (req, res) => {
	const file = req.files;
	let uploadArr = [];
	const filesLen = Object.keys(file).length;
=======
module.exports.imageMultiUpload = (req, res, name) => {
	let file = req.files.file;
	if (typeof file.length === 'undefined') {
		file = [file];
	}

	let uploadArr = [];
	const filesLen = file.length;
>>>>>>> fb90cdc7fba1c0761dcdb65e63ce0c1f349c393e

	let i = 0;
	for (let key in file) {
		var params = {
			Bucket: 'localhostphoto3',
			Key: `test_${i}.${file[key].mimetype.split('/')[1]}`,
			ACL: 'public-read',
			Body: file[key].data,
			ContentType: file[key].mimetype,
		};
		i++;
		s3.upload(params, function (err, data) {
			if (err) console.log('multi update err', err);
			uploadArr.push(data);
			if (uploadArr.length === filesLen) {
				res.json({ success: true, data: uploadArr });
			}
		});
	}
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
