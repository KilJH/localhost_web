var AWS = require('aws-sdk');
var fs = require('fs');
const multer = require('multer');
const password = require('../db/password');
AWS.config.region = 'ap-northeast-2';

var s3 = new AWS.S3(password.s3);

function getCurrentDate() {
	var date = new Date();
	var year = date.getFullYear().toString();

	var month = date.getMonth() + 1;
	month = month < 10 ? '0' + month.toString() : month.toString();

	var day = date.getDate();
	day = day < 10 ? '0' + day.toString() : day.toString();

	var hour = date.getHours();
	hour = hour < 10 ? '0' + hour.toString() : hour.toString();

	var minites = date.getMinutes();
	minites = minites < 10 ? '0' + minites.toString() : minites.toString();

	var seconds = date.getSeconds();
	seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

	return year + month + day + hour + minites + seconds;
}

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

module.exports.imageMultiUpload = (req, res, name) => {
	let file = req.files.file;
	if (typeof file.length === 'undefined') {
		file = [file];
	}

	let uploadArr = [];
	const filesLen = file.length;

	for (let i = 0; i < filesLen; i++) {
		var params = {
			Bucket: 'localhostphoto3',
			Key: `${name}_${i}.${file[i].mimetype.split('/')[1]}`,
			ACL: 'public-read',
			Body: file[i].data,
			ContentType: file[i].mimetype,
		};
		s3.upload(params, function (err, data) {
			if (err) console.log('multi update err', err);
			uploadArr.push(data.Location);
			if (uploadArr.length === filesLen) {
				res.json({ success: true, urls: uploadArr });
			}
		});
	}
};

module.exports.planImageUpload = (req, res) => {
	const userId = req.body.userId;
	const now = new Date().getTime();
	const name = `temp_${userId}_${now}`;

	this.imageMultiUpload(req, res, name);
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
