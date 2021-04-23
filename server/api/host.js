const mysql = require('../db/mysql');
// 호스트 관련된 API를 작성하세요

module.exports.list = (req, res) => {
	// host의 host정보 불러오기
	const sql = `select *, host.address AS formattedAddress, host.latitude AS host_latitude, host.longitude AS host_longitude from host left join user on user.id = host.user_id`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) console.log('list err', err);

		const host = rows.map(rows => {
			return {
				id: rows.user_id,
				name: rows.name,
				nickname: rows.nickname,
				sex: rows.sex,
				email: rows.email,
				photo: rows.photo,
				description: rows.description,
				languages: [rows.language1, rows.language2, rows.language3],
				place: {
					formatted_address: rows.formattedAddress,
					geometry: {
						location: { lat: rows.host_latitude, lng: rows.host_longitude },
					},
					name: rows.address,
				},
			};
		});
		res.json({ success: true, list: host });
	});
};

module.exports.listOfRequestedHost = (req, res) => {
	const sql = `SELECT * FROM host_request LEFT JOIN user ON host_request.user_id=user.id`;

	mysql.query(sql, (err, rows) => {
		if (err) return console.log(err);

		res.status(200).json({ success: true, requestedHosts: rows });
	});
};

module.exports.requestHost = (req, res) => {
	const userId = req.body.userId;
	const hostInfo = req.body.hostInfo;

	let languages = [...hostInfo.languages];
	for (let i = languages.length; i < 3; i++) {
		languages = [...languages, null];
	}

	const sql = `SELECT * FROM host_request WHERE user_id = ?`;
	const insert = `INSERT INTO host_request(user_id,language1,language2,language3,description,latitude,longitude,address) VALUES(?,?,?,?,?,?,?,?)`;

	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log(err);
		if (rows[0])
			res.json({ success: false, message: '이미 신청한 상태입니다.' });
		mysql.query(
			insert,
			[
				userId,
				...languages,
				hostInfo.description,
				hostInfo.place.geometry.location.lat,
				hostInfo.place.geometry.location.lng,
				`${hostInfo.place.formatted_address}(${hostInfo.place.name})`,
			],
			err => {
				if (err) return console.log(err);

				res.status(200).json({
					success: true,
					message:
						'호스트 신청이 완료되었습니다. 관리자 승인 후 활동 가능합니다.',
				});
			},
		);
	});
};

module.exports.allowHost = (req, res) => {
	// 호스트 승인
	const userId = req.body.userId;
	const sql = `SELECT * FROM host_request WHERE user_id = ?`;
	const insert = `INSERT INTO host(user_id,language1,language2,language3,description,latitude,longitude,address) VALUES(?,?,?,?,?,?,?,?)`;
	const del = `DELETE FROM host_request WHERE user_id = ?`;
	const update = `UPDATE user SET ishost=1 WHERE id = ?`;

	// 신청 테이블에서 검색
	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log('err:', err);

		// 호스트 테이블로 복사
		mysql.query(
			insert,
			[
				rows[0].user_id,
				rows[0].language1,
				rows[0].language2,
				rows[0].language3,
				rows[0].description,
				rows[0].latitude,
				rows[0].longitude,
				rows[0].address,
			],
			(err, rows) => {
				if (err) return console.log('insert err: ', err);

				// 신청 테이블에서 삭제
				mysql.query(del, userId, err => {
					if (err) return console.log('delete err: ', err);

					// 유저 테이블에 isHost = 1 로 업데이트
					mysql.query(update, userId, err => {
						res.json({
							success: true,
							message: '호스트 승인이 완료되었습니다.',
						});
					});
				});
			},
		);
	});
};
module.exports.denyHost = (req, res) => {
	// 신청한 회원을 거부
	const userId = req.body.userId;
	const sql = `DELETE FROM host_request WHERE user_id = ?`;

	mysql.query(sql, userId, err => {
		if (err) return console.log(err);

		res
			.status(200)
			.json({ success: true, message: '호스트 신청을 거절했습니다.' });
	});
};
module.exports.demote = (req, res) => {
	// 기존 호스트 회원을 일반회원으로 강등
	const userId = req.body.userId;

	const sql = `DELETE FROM host WHERE user_id = ?`;
	const update = `UPDATE user SET ishost = 0 WHERE id= ?`;

	mysql.query(sql, userId, err => {
		if (err) return console.log(err);
		mysql.query(update, userId, err => {
			if (err) return console.log('err: ', err);

			res.status(200).json({
				success: true,
				message: `id: ${userId} 호스트 회원이 강등되었습니다.`,
			});
		});
	});
};

module.exports.searchHost = (req, res) => {
	// 호스트 회원 검색
	const type = req.body.type || 'nickname';
	const item = req.body.item;
	let sql = '';
	switch (type) {
		case 'name':
			sql = `SELECT *, host.address AS formattedAddress, host.latitude AS host_latitude, host.longitude AS host_longitude FROM host LEFT JOIN user ON host.user_id=user.id WHERE user.name LIKE "%${item}%"`;
			break;
		case 'nickname':
			sql = `SELECT *, host.address AS formattedAddress, host.latitude AS host_latitude, host.longitude AS host_longitude FROM host LEFT JOIN user ON host.user_id=user.id WHERE user.nickname LIKE "%${item}%"`;
			break;
		case 'email':
			sql = `SELECT *, host.address AS formattedAddress, host.latitude AS host_latitude, host.longitude AS host_longitude FROM host LEFT JOIN user ON host.user_id=user.id WHERE user.email LIKE "%${item}%"`;
			break;
		default:
			sql = `SELECT *, host.address AS formattedAddress, host.latitude AS host_latitude, host.longitude AS host_longitude FROM host LEFT JOIN user ON host.user_id=user.id`;
			break;
	}

	mysql.query(sql, (err, rows) => {
		if (err) return console.log(err);

		const searchedHosts = rows.map(rows => {
			return {
				id: rows.user_id,
				name: rows.name,
				nickname: rows.nickname,
				sex: rows.sex,
				email: rows.email,
				photo: rows.photo,
				description: rows.description,
				languages: [rows.language1, rows.language2, rows.language3],
				place: {
					formatted_address: rows.formattedAddress,
					geometry: {
						location: { lat: rows.host_latitude, lng: rows.host_longitude },
					},
					name: rows.address,
				},
			};
		});

		res.status(200).json({ success: true, searchedHosts: searchedHosts });
	});
};

module.exports.load = (req, res) => {
	// 특정 host를 불러오는 API
	const id = req.body.id; // userId

	const hostSql = `SELECT *, host.address AS formattedAddress, host.latitude AS host_latitude, host.longitude AS host_longitude, host.id AS host_id, user.id user_id FROM host LEFT JOIN user ON user.id = host.user_id WHERE user_id = ${id};`;
	mysql.query(hostSql, (err, host) => {
		if (err) return console.log('hostSql err', err);
		const reviewSql = `SELECT *, host_review.user_id AS reviewerId ,host_review.id AS reviewId FROM host_review LEFT JOIN host ON host.id = host_review.host_user_id LEFT JOIN user ON user.id = host.user_id WHERE host_user_id = ${host[0].host_id};`;
		mysql.query(reviewSql, (err2, reviewsRows) => {
			if (err2) return console.log('hostReviews err', err2);

			const hosts = host.map(rows => {
				return {
					id: rows.user_id,
					name: rows.name,
					nickname: rows.nickname,
					sex: rows.sex,
					email: rows.email,
					photo: rows.photo,
					description: rows.description,
					languages: [rows.language1, rows.language2, rows.language3],
					on: Boolean(rows.on),
					place: {
						formatted_address: rows.formattedAddress,
						geometry: {
							location: { lat: rows.host_latitude, lng: rows.host_longitude },
							distance: rows.distance,
						},
						name: rows.address,
					},
				};
			});
			const reviews = reviewsRows.map(reviewsRow => {
				return {
					id: reviewsRow.reviewId,
					user: {
						id: reviewsRow.reviewerId,
						name: reviewsRow.name,
						email: reviewsRow.email,
						nickname: reviewsRow.nickname,
						sex: reviewsRow.sex,
						country: reviewsRow.country,
						photo: reviewsRow.photo,
					},
				};
			});

			res.json({ success: true, host: hosts[0], reviews });
		});
	});
};

module.exports.update = (req, res) => {
	// host정보를 수정하는 API
	const id = req.body.id; // user_id
	const country = req.body.country;
	const language1 = req.body.language1;
	const language2 = req.body.language2;
	const language3 = req.body.language3;
	const description = req.body.description;
	const reqCountry = req.body.reqCountry;
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;
	const address = req.body.address;
	const sql = `UPDATE host SET country = "${country}", language1 = "${language1}", language2 = "${language2}", language3 = "${language3}", description = "${description}"
  , reqcountry = "${reqCountry}", latitude="${latitude}", longitude="${longitude}", address="${address}" WHERE user_id = "${id}";`;

	mysql.query(sql, err => {
		if (err) return console.log('host update err', err);
		res.json({ success: true });
	});
};

module.exports.nearbyList = (req, res) => {
	// 사용자와 호스트의 거리를 구하는 API
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;

	const sql = `SELECT user.*, host.*, COUNT(follow.follower_id) AS followerNum, host.address AS formattedAddress,host.latitude AS host_latitude, host.longitude AS host_longitude, (6371*acos(cos(radians(${latitude}))*cos(radians(host.latitude))*cos(radians(host.longitude)-radians(${longitude}))+sin(radians(${latitude}))*sin(radians(host.latitude)))) AS distance FROM host LEFT JOIN user ON user.id = host.user_id LEFT JOIN follow ON follow.user_id = user.id WHERE host.on = 1 GROUP BY host.id HAVING distance <= 4 ORDER BY distance`;
	mysql.query(sql, (err, rows, fields) => {
		if (err) console.log('nearby err', err);

		const nearbyhosts = rows.map(rows => {
			return {
				id: rows.user_id,
				name: rows.name,
				nickname: rows.nickname,
				sex: rows.sex,
				email: rows.email,
				photo: rows.photo,
				description: rows.description,
				languages: [rows.language1, rows.language2, rows.language3],
				on: rows.on,
				place: {
					formatted_address: rows.formattedAddress,
					geometry: {
						location: { lat: rows.host_latitude, lng: rows.host_longitude },
						distance: rows.distance,
					},
					name: rows.address,
				},
				follower: rows.followerNum,
			};
		});
		res.json({ success: true, nearbyhosts });
	});
};

module.exports.status = (req, res) => {
	// host 상태 설정 API
	const id = req.body.id; // userId;
	const on = req.body.on;
	const sql = `UPDATE host SET host.on="${on}" WHERE user_id = "${id}";`;
	mysql.query(sql, err => {
		if (err) console.log('status err', err);

		res.json({ success: true });
	});
};

module.exports.applyList = (req, res) => {
	// applyHosting list를 불러오는 API
	const hostUserId = req.body.hostUserId;
	const sql = `SELECT * FROM host_user_apply WHERE host_user_id = ${hostUserId}`;

	mysql.query(sql, (err, rows) => {
		if (err) console.log('applyList err', err);

		res.json({ success: true, applyList: rows });
	});
};

module.exports.matchList = (req, res) => {
	// applyHosting list를 불러오는 API
	const sql = `SELECT * FROM host_match`;

	mysql.query(sql, (err, rows) => {
		if (err) console.log('matchList err', err);

		res.json({ success: true, matchList: rows });
	});
};

module.exports.applyHosting = (req, res) => {
	// user가 host에게 호스팅 신청하는 API
	const id = req.body.id; // userId;
	const hostId = req.body.hostId;

	const sql = `INSERT INTO host_user_apply(host_user_id, user_user_id) VALUES("${hostId}", "${id}");`;

	mysql.query(sql, err => {
		if (err) console.log('applyHosting err', err);

		res.json({ success: true });
	});
};

module.exports.approveHosting = (req, res) => {
	// host 가 user의 신청을 승인하는 API
	const id = req.body.id; // requestUserId
	const hostId = req.body.hostId; // hostId

	const selectSql = `SELECT * FROM host_user_apply WHERE user_user_id = ${id} && host_user_id = ${hostId};`;
	mysql.query(selectSql, (err, user) => {
		if (err) console.log('selectSql err', err);

		const insertSql = `INSERT INTO host_match(host_user_id, user_user_id) VALUES("${hostId}", "${id}")`;

		mysql.query(insertSql, err => {
			if (err) console.log('InsertSql err', err);
		});

		const deleteSql = `DELETE FROM host_user_apply WHERE id = ${user[0].id}`;
		mysql.query(deleteSql, err => {
			if (err) console.log('deleteSql err', err);

			res.json({ success: true });
		});
	});
};

module.exports.denyHosting = (req, res) => {
	// host 가 user의 신청을 승인하는 API
	const id = req.body.id; // requestUserId
	const hostId = req.body.hostId; // hostId

	const selectSql = `SELECT * FROM host_user_apply WHERE user_user_id = ${id} && host_user_id = ${hostId}`;
	mysql.query(selectSql, (err, user) => {
		if (err) console.log('selectSql err', err);
		const deleteSql = `DELETE FROM host_user_apply WHERE id = ${user[0].id}`;

		mysql.query(deleteSql, err => {
			if (err) console.log('deleteSql err', err);

			res.json({ success: true });
		});
	});
};
// 수정중입니다
module.exports.reviewWrite = (req, res) => {
	// host review작성 API
	const id = req.body.id; // userId
	const hostId = req.body.hostId;
	const description = req.body.description;
	const rating = req.body.rating;

	const sql = `INSERT INTO host_review(user_id, description, host_user_id, rating) VALUES("${id}","${description}","${hostId}","${rating}")`;

	mysql.query(sql, err => {
		if (err) console.log('reviewWrite err', err);
	}).then;
	const selectSql = `SELECT * FROM host left join host_review on host_review.host_user_id = host.id WHERE host.user_id = ${hostId};`;
	mysql.query(selectSql, (err, rows) => {
		if (err) console.log('selectSql err', err);

		console.log(rows[0].review_count);
	});
};
