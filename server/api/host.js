const mysql = require('../db/mysql');
const userApi = require('./user');
// 호스트 관련된 API를 작성하세요
const formatDate = date => {
	const day = new Date(date);
	const now = new Date();
	// 날짜가 오늘이면 hh:mm

	const yyyy = day.getFullYear();
	const MM = day.getMonth() < 9 ? `0${day.getMonth() + 1}` : day.getMonth() + 1;
	const dd = day.getDate() < 9 ? `0${day.getDate()}` : day.getDate();
	return `${yyyy}-${MM}-${dd}`;
};

module.exports.hostMapping = host => {
	return {
		id: host.host_user_id || host.user_id,
		name: host.host_name || host.name,
		email: host.email,
		nickname: host.nickname,
		sex: host.sex,
		phone: host.phone,
		address: host.user_address || host.address,
		photo: host.photo || '',
		description: host.host_description || host.description,
		reqCountry: host.reqcountry || 0,
		createTime: formatDate(host.create_time) || '',
		languages: [host.language1, host.language2, host.language3],
		rating: host.host_rating || host.rating,
		on: Boolean(host.on),
		place: {
			formatted_address:
				host.formattedAddress || host.host_address || host.address,
			geometry: {
				location: {
					lat: host.host_latitude || host.latitude,
					lng: host.host_longitude || host.longitude,
				},
				distance: host.distance,
			},
			name: host.formattedAddress || host.host_address || host.address,
		},
		follower: host.followerNum || host.follower,
	};
};

module.exports.hostListMapping = hostList => {
	return hostList.map(host => this.hostMapping(host));
};

module.exports.reviewMapping = review => {
	return {
		id: review.review_id || review.id,
		user: userApi.userMapping(review),
		rating: review.review_rating || review.rating,
		description: review.review_description || review.description,
		createTime: formatDate(review.create_time),
	};
};
module.exports.applicationMapping = app => {
	return {
		id: app.appId || app.app_id || app.id,
		user: userApi.userMapping(app),
		date: formatDate(app.create_time),
		status: app.status,
	};
};
module.exports.preApplicationMapping = preApp => {
	return {
		id: preApp.appId || preApp.app_id || preApp.id,
		user: userApi.userMapping(preApp),
		place: {
			formatted_address:
				preApp.formattedAddress || preApp.preApp_address || preApp.address,
			geometry: {
				location: {
					lat: preApp.app_latitude || preApp.latitude,
					lng: preApp.app_longitude || preApp.longitude,
				},
			},
			name: preApp.formattedAddress || preApp.preApp_address || preApp.address,
		},
		date: formatDate(preApp.create_time),
		status: preApp.status,
		review: this.reviewMapping(preApp),
	};
};

module.exports.list = (req, res) => {
	// host의 host정보 불러오기
	const sql = `select *, host.address AS formattedAddress, host.latitude AS host_latitude, host.longitude AS host_longitude from host left join user on user.id = host.user_id`;

	mysql.query(sql, (err, rows) => {
		if (err) console.log('list err', err);

		const hosts = this.hostListMapping(rows);
		res.json({ success: true, list: hosts });
	});
};

module.exports.listOfRequestedHost = (req, res) => {
	const sql = `SELECT *, h.address AS formattedAddress, h.latitude AS host_latitude, h.longitude AS host_longitude FROM host_request h LEFT JOIN user ON h.user_id=user.id`;

	mysql.query(sql, (err, rows) => {
		if (err) return console.log(err);
		console.log(rows);
		const requestedHosts = this.hostListMapping(rows);
		console.log(requestedHosts);
		res.status(200).json({ success: true, requestedHosts });
	});
};

module.exports.requestHost = (req, res) => {
	const { userId, hostInfo } = req.body;

	let languages = [...hostInfo.languages];
	for (let i = languages.length; i < 3; i++) {
		languages = [...languages, null];
	}

	const sql = `SELECT * FROM host_request WHERE user_id = ?`;
	const insert = `INSERT INTO host_request(user_id,language1,language2,language3,description,reqcountry,latitude,longitude,address) VALUES(?,?,?,?,?,?,?,?,?)`;

	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log(err);
		if (rows[0]) {
			res.json({ success: false, message: '이미 신청한 상태입니다.' });
			return;
		}
		mysql.query(
			insert,
			[
				userId,
				...languages,
				hostInfo.description,
				hostInfo.reqCountry,
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
	const insert = `INSERT INTO host(user_id,language1,language2,language3,description,reqcountry,latitude,longitude,address) VALUES(?,?,?,?,?,?,?,?,?)`;
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
				rows[0].reqcountry,
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

		const searchedHosts = this.hostListMapping(rows);

		res.status(200).json({ success: true, searchedHosts });
	});
};

module.exports.load = (req, res) => {
	// 특정 host를 불러오는 API
	const id = req.body.id; // userId

	const hostSql = `SELECT *, host.address AS formattedAddress, host.latitude AS host_latitude, host.longitude AS host_longitude, host.id AS host_id, user.id user_id FROM host LEFT JOIN user ON user.id = host.user_id WHERE user_id = ${id};`;
	mysql.query(hostSql, (err, hostRows) => {
		if (err) return console.log('hostSql err', err);

		const request = hostRows[0].request_count;
		const hosting = hostRows[0].hosting_count;

		const data = {
			hostingCount: hosting,
			probability: Math.floor((hosting / request) * 100),
		};
		const reviewSql = `SELECT r.*,u.nickname, u.photo FROM host_review r LEFT JOIN host_user_apply a ON a.id = r.host_user_apply_id LEFT JOIN user u ON u.id = a.user_user_id WHERE a.host_user_id = ${hostRows[0].user_id};`;
		mysql.query(reviewSql, (err2, reviewRows) => {
			if (err2) return console.log('hostReviews err', err2);

			const host = this.hostMapping(hostRows[0]);
			const reviews = reviewRows.map(review => this.reviewMapping(review));

			res.json({ success: true, host, reviews, data });
		});
	});
};

module.exports.update = (req, res) => {
	// host정보를 수정하는 API
	const {
		id,
		language1,
		language2,
		language3,
		description,
		reqCountry,
		latitude,
		longitude,
		address,
	} = req.body;

	const sql = `UPDATE host SET language1 = "${language1}", language2 = "${language2}", language3 = "${language3}", description = "${description}"
  , reqcountry = "${reqCountry}", latitude="${latitude}", longitude="${longitude}", address="${address}" WHERE user_id = "${id}";`;

	mysql.query(sql, err => {
		if (err) return console.log('host update err', err);
		res.json({ success: true });
	});
};

module.exports.nearbyList = (req, res) => {
	// 사용자와 호스트의 거리를 구하는 API
	const { latitude, longitude } = req.body;
	const distance = req.body.distance || 4;

	const sql = `SELECT user.*, host.*, COUNT(follow.follower_id) AS followerNum, host.address AS formattedAddress,host.latitude AS host_latitude, host.longitude AS host_longitude, (6371*acos(cos(radians(${latitude}))*cos(radians(host.latitude))*cos(radians(host.longitude)-radians(${longitude}))+sin(radians(${latitude}))*sin(radians(host.latitude)))) AS distance FROM host LEFT JOIN user ON user.id = host.user_id LEFT JOIN follow ON follow.user_id = user.id WHERE host.on = 1 GROUP BY host.id HAVING distance <= ${distance} ORDER BY distance`;
	mysql.query(sql, (err, rows) => {
		if (err) console.log('nearby err', err);

		const nearbyhosts = this.hostListMapping(rows);
		res.json({ success: true, nearbyhosts });
	});
};

module.exports.status = (req, res) => {
	// host 상태 설정 API
	const { id, on } = req.body; // userId;

	const sql = `UPDATE host SET host.on="${on}" WHERE user_id = "${id}";`;
	mysql.query(sql, err => {
		if (err) console.log('status err', err);

		res.json({ success: true });
	});
};

module.exports.doneHosting = (req, res) => {
	// 끝난 호스트를 불러오는 API default는 hostUserId
	const { userId, hostUserId } = req.body;

	if (userId && hostUserId) return console.log('값 하나만 입력하세요');

	let sql = ``;
	if (userId)
		sql = `SELECT a.*,u.*,r.*,a.id appId, h.address app_address, h.latitude app_latitude, h.longitude app_longitude FROM host_user_apply a LEFT JOIN user u ON u.id = a.host_user_id LEFT JOIN host h ON h.user_id = a.host_user_id LEFT JOIN host_review r ON r.host_user_apply_id = a.id WHERE a.user_user_id = ${userId} && a.status = ${4} ;`;
	else if (hostUserId)
		sql = `SELECT a.*,u.*,r.*,a.id appId, h.address app_address, h.latitude app_latitude, h.longitude app_longitude FROM host_user_apply a LEFT JOIN user u ON u.id = a.user_user_id LEFT JOIN host h ON h.user_id = a.host_user_id LEFT JOIN host_review r ON r.host_user_apply_id = a.id WHERE a.host_user_id = ${hostUserId} && a.status = ${4} ;`;

	mysql.query(sql, (err, rows) => {
		if (err) console.log('doneHosting err', err);
		const previousApplicant = rows.map(row => this.preApplicationMapping(row));
		res.json({ success: true, previousApplicant });
	});
};

module.exports.showHosting = (req, res) => {
	// applyHosting list를 불러오는 API
	const { userId, hostUserId } = req.body;

	if (userId && hostUserId) return console.log('값 하나만 입력하세요');
	let sql = ``;
	if (userId)
		sql = `select *,h.date day, h.id appId from host_user_apply h LEFT JOIN user u ON u.id = h.host_user_id WHERE h.user_user_id = ${userId} && NOT status = 4`;
	else if (hostUserId)
		sql = `select *, h.date day, h.id appId from host_user_apply h LEFT JOIN user u ON u.id = h.user_user_id WHERE h.host_user_id = ${hostUserId} && NOT status = 4`;

	mysql.query(sql, (err, rows) => {
		if (err) console.log('applyList err', err);
		const applicant = rows.map(row => this.applicationMapping(row));

		res.json({ success: true, applicant });
	});
};

module.exports.applyHosting = (req, res) => {
	// user가 host에게 호스팅 신청하는 API
	const { id, hostUserId, date } = req.body;

	const sql = `INSERT INTO host_user_apply(host_user_id, user_user_id, date) VALUES("${hostUserId}", "${id}", "${date}");`;

	mysql.query(sql, err => {
		if (err) console.log('applyHosting err', err);

		const updateSql = `UPDATE host SET request_count = request_count + 1  WHERE user_id = ?`;
		mysql.query(updateSql, hostUserId, err => {
			if (err) return console.log('request update err');
		});

		res.json({ success: true });
	});
};

module.exports.approveHosting = (req, res) => {
	// host 가 user의 신청을 승인하는 API
	const { id, hostUserId } = req.body; // requestUserId

	const updateSql = `UPDATE host_user_apply SET status=${1} WHERE user_user_id = ${id} && host_user_id = ${hostUserId};`;
	mysql.query(updateSql, err => {
		if (err) return console.log('approveHosting err', err);

		res.json({ success: true });
	});
};

module.exports.setLocationHosting = (req, res) => {
	// host 가 user의 신청을 승인하는 API
	const { id, address } = req.body; // requestUserId

	const updateSql = `UPDATE host_user_apply SET address= ? WHERE id = ?;`;
	mysql.query(updateSql, [address, id], err => {
		if (err) return console.log('setLocation err', err);

		res.json({ success: true });
	});
};

module.exports.denyHosting = (req, res) => {
	// host 가 user의 신청을 취소하는 API
	const id = req.body.id; // application ID

	const updateSql = `UPDATE host_user_apply SET status=${2} WHERE id = ${id};`;
	mysql.query(updateSql, err => {
		if (err) return console.log('updateSql err', err);

		res.json({ success: true });
	});
};

module.exports.cancleHosting = (req, res) => {
	// user 가 호스팅을 취소하는 API
	const id = req.body.id; // application ID

	const updateSql = `UPDATE host_user_apply SET status=${3} WHERE id = ${id};`;
	mysql.query(updateSql, err => {
		if (err) return console.log('updateSql err', err);

		res.json({ success: true });
	});
};

module.exports.completeHosting = (req, res) => {
	// user 가 호스팅을 취소하는 API
	const id = req.body.id; // application ID

	const updateSql = `UPDATE host_user_apply SET status=${4} WHERE id = ${id};`;
	mysql.query(updateSql, err => {
		if (err) return console.log('updateSql err', err);

		const sql = `select a.host_user_id, h.hosting_count from host_user_apply a LEFT JOIN host h ON h.user_id = a.host_user_id WHERE a.id = ?;`;
		mysql.query(sql, id, (err, rows) => {
			if (err) return console.log('select err');

			const update2Sql = `UPDATE host SET hosting_count = hosting_count + 1  WHERE user_id = ?;`;
			mysql.query(update2Sql, rows[0].host_user_id, err => {
				if (err) return console.log('request update err');
			});
		});

		res.json({ success: true });
	});
};

module.exports.getApplicationId = (req, res) => {
	const { hostUserId, userId } = req.body; // host_user_id, user_user_id

	const sql = `SELECT id FROM host_user_apply WHERE host_user_id = ${hostUserId} AND user_user_id = ${userId};`;
	mysql.query(sql, (err, rows) => {
		if (err) return console.log('select err');

		const applicationId = rows[0].id;
		res.json({ success: true, applicationId: applicationId });
	});
};

module.exports.getHostingAddress = (req, res) => {
	const { hostUserId, userId } = req.body; // host_user_id, user_user_id

	const sql = `SELECT address FROM host_user_apply WHERE host_user_id = ${hostUserId} AND user_user_id = ${userId};`;
	mysql.query(sql, (err, rows) => {
		if (err) return console.log('select err');

		const hostingAddress = rows[0].id;
		res.json({ success: true, hostingAddress: hostingAddress });
	});
};

module.exports.setHostingAddress = (req, res) => {
	const { hostingAddress, hostUserId, userId } = req.body; // host_user_id, user_user_id

	const sql = `UPDATE host_user_apply SET address = ${hostingAddress} WHERE host_user_id = ${hostUserId} AND user_user_id = ${userId};`;
	mysql.query(sql, (err, rows) => {
		if (err) return console.log('select err');

		res.json({ success: true });
	});
};

// 수정중입니다*/
module.exports.reviewWrite = (req, res) => {
	// host review작성 API
	const { id, description, rating } = req.body; // host_user_apply id를 입력해야합니다!!

	const sql = `INSERT INTO host_review(host_user_apply_id, description , rating) VALUES("${id}","${description}","${rating}")`;

	mysql.query(sql, (err, rows) => {
		if (err) console.log('reviewWrite err', err);
	});
	const selectSql = `SELECT host_user_id FROM host_user_apply WHERE id = ?`;
	mysql.query(selectSql, id, (err, rows, fields) => {
		if (err) return console.log('insert err', err);

		const select2Sql = `SELECT AVG(r.rating) AVG FROM host_user_apply a LEFT JOIN host h ON a.host_user_id = h.user_id LEFT JOIN host_review r ON r.host_user_apply_id = a.id  WHERE h.user_id = ?`;
		mysql.query(select2Sql, rows[0].host_user_id, (err, rows2) => {
			if (err) return console.log('update err', err);

			const updateSql = `UPDATE host SET rating = ? WHERE user_id = ?`;
			mysql.query(updateSql, [rows2[0].AVG, rows[0].host_user_id], err => {
				if (err) return console.log('AVG update err', err);

				res.json({ success: true, test: rows2[0].AVG });
			});
		});
	});
};
