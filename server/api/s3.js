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
	const name = `plan_${userId}_${now}`;
	this.imageMultiUpload(req, res, name);
};

module.exports.load = (req, res) => {
	s3.listObjects({ Bucket: 'localhostphoto3' })
		.on('success', function handlePage(response) {
			const id = req.body.id;

			for (var name in response.data.Contents) {
				const file = response.data.Contents[name].Key;
				if (file.includes(`temp_${id}`)) {
					console.log(file);
				}
			}

			if (response.hasNextPage()) {
				response.nextPage().on('success', handlePage).send();
			}
		})
		.send();
};

module.exports.copy = (req, res) => {
	const id = req.body.id;
	const planId = req.body.planId;
	const date = req.body.date;
	const time = req.body.time;

	s3.listObjectsV2(
		{ Bucket: `localhostphoto3`, MaxKeys: 1000 },
		async (err, data) => {
			const { Contents } = data;
			const keys = Contents.map(info => info.Key);
			const files = keys.filter(file => {
				return file.includes(`temp_${id}`);
			});

			let filesLen = files.length;
			let copyArr = [];

			console.log(files);
			for (let i = 0; i < filesLen; i++) {
				const info = {
					Bucket: 'localhostphoto3',
					CopySource: `/localhostphoto3/${files[i]}`,
					Key: `plan_${planId}_${date}_${time}_${i}`,
				};

				s3.copyObject(info, async (err, data) => {
					//if (err) console.log(err, err.stack);

					const params = {
						Bucket: 'localhostphoto3',
						Key: `${files[i]}`,
					};

					copyArr.push(data);
					if (copyArr.length === filesLen) {
						res.json({ success: true });
					}
				});
			}
		},
	);
};
