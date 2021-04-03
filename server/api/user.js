// const { DataUsage } = require('@material-ui/icons');
const crypto = require('crypto');
const mysql = require('../db/mysql');

module.exports.register = (req, res) => {
	// 회원가입
	const email = req.body.email || req.query.email;
	const pw = req.body.pw || req.query.pw;
	const name = req.body.name || req.query.name;
	const sex = req.body.sex || req.query.sex;
	const nickname = req.body.nickname || req.query.nickname;
	const phone = req.body.phone || req.query.phone;
	const address = req.body.address || req.query.address;
	const sql = `SELECT * FROM user WHERE email = ?`;
	const hashPW = crypto.createHash('sha512').update(pw).digest('hex');

	if (email == null) return console.log('아이디를 입력하세요');

	mysql.query(sql, email, (err2, rows, fields) => {
		if (err2) return console.log('register err: ', err2);

		if (rows == '') {
			// res.send({ message: '사용할 수 있는 이메일입니다.' });
			const insert = `INSERT INTO user(email, pw, name, sex, nickname, phone, address) VALUES("${email}", "${hashPW}", "${name}", "${sex}", "${nickname}", "${phone}", "${address}");`;

			mysql.query(insert, (err3, rows, fields) => {
				if (err3) return console.log('err3: ', err3);

				console.log('계정 생성 성공');
			});
			res.status(200).send({ success: true, message: '회원가입 완료' });
		} else {
			res.send({ success: false, message: '이미 등록 된 이메일입니다.' });
		}
	});
};

module.exports.update = (req, res) => {
	// 정보수정
	const email = req.body.email || req.query.email;
	const nickname = req.body.nickname || '';
	const phone = req.body.phone || '';
	const address = req.body.address || '';

	const update = `UPDATE user SET nickname = "${nickname}", phone = "${phone}", address = "${address}" WHERE email = "${email}";`;

	mysql.query(update, (err, rows) => {
		if (err) return console.log(err);
		console.log('변경 성공');
		res.send({ success: true, message: '변경 대성공' });
	});
};

module.exports.updatePhoto = (req, res) => {
	// 프로필 이미지 수정
	const url = req.body.url;
	const userId = req.body.id;
	const sql = `UPDATE user SET photo = "${url}" WHERE id = "${userId}"`;

	mysql.query(sql, (err) => {
		if (err) return console.log(err);

		res.send({ success: true, message: '프로필 이미지 변경' });
	});
};

module.exports.updatePW = (req, res) => {
	// const hashPW = crypto.createHash('sha512').update(pw).digest('hex');
};

module.exports.delete = (req, res) => {
	const userId = req.body.userId;

	const sql = `DELETE FROM user WHERE id = ?`;

	mysql.query(sql, userId, (err) => {
		if (err) {
			res.send({
				success: false,
				message: 'SQL 오류로 회원 삭제에 실패했습니다.',
			});
			console.log('DELETE err: ', err);
		}

		res.send({ success: true, message: `id:${userId} 회원 삭제 완료` });
	});
};

module.exports.list = (req, res) => {
	// 전체회원
	const sql = `SELECT * FROM user`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('select err: ', err);
		console.log('검색된 회원수: ', rows.length);
		res.status(200).send({ success: true, users: rows });
	});
};
module.exports.find = (req, res) => {
	// 한명 검색
	const id = req.params.id;

	// const sql = `SELECT * FROM user WHERE id = "?"`;
	const sql = `SELECT * FROM user WHERE id = ?`;

	mysql.query(sql, id, (err, rows, fields) => {
		if (err) return console.log('select err: ', err);
		console.log('검색결과', rows);
		res.status(200).send({ success: true, user: rows[0] });
	});
};

module.exports.search = (req, res) => {
	// 회원 검색
	const type = req.body.type || 'nickname';
	const item = req.body.item;
	let sql = '';
	switch (type) {
		case 'name':
			sql = `SELECT * FROM user WHERE name LIKE "%${item}%"`;
			break;
		case 'nickname':
			sql = `SELECT * FROM user WHERE nickname LIKE "%${item}%"`;
			break;
		case 'email':
			sql = `SELECT * FROM user WHERE email LIKE "%${item}%"`;
			break;
		default:
			sql = `SELECT * FROM user`;
			break;
	}

	mysql.query(sql, (err, rows) => {
		if (err) return console.log(err);

		res.status(200).send({ success: true, users: rows });
	});
};

module.exports.follow = (req, res) => {
	// 팔로우, 팔로우 취소

	if (!req.body.userId || !req.body.followerId) {
		res.send({ success: false, message: '비정상적인 요청입니다.' });
		console.log('실패실패');
	}
	console.log('팔로우 시도');
	console.log(req.body.userId, req.body.followerId);

	const userId = req.body.userId;
	const followerId = req.body.followerId;

	const sql = `SELECT * FROM follow WHERE user_id = ? AND follower_id = ?`;

	mysql.query(sql, [userId, followerId], (err, rows, fields) => {
		if (err) return console.log('select err: ', err);

		if (rows == '') {
			const insert = `INSERT INTO follow(user_id, follower_id) VALUES("${userId}", "${followerId}");`;
			mysql.query(insert, (err, rows, fields) => {
				if (err) return console.log('insert err: ', err);
				res.status(200).send({ success: true, message: ' 팔로우 성공' });
			});
		} else {
			const deleteSql = `DELETE FROM follow WHERE user_id = ? AND follower_id = ?`;
			mysql.query(deleteSql, [userId, followerId], (err, rows, fields) => {
				if (err) return console.log('delete err: ', err);
				res.status(200).send({ success: true, message: ' 팔로우 취소' });
			});
		}
	});
};

module.exports.followList = (req, res) => {
	// 팔로우 리스트 가져오기
	if (!req.body.userId) {
		res.send({ success: false, message: '비정상적인 요청입니다.' });
	}

	const userId = req.body.userId;
	const sql = `SELECT * FROM follow WHERE follower_id = ?`;

	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log(err);
		// 팔로우 테이블의 정보로 모든 유저를 찾아야 함
		const idArr = [];
		rows.forEach((user) => {
			idArr.push(user.user_id);
		});

		const sqlUser = `SELECT * FROM user WHERE id IN (${idArr.join(',')})`;

		mysql.query(sqlUser, (err, rows2) => {
			if (err) return console.log(err);
			res.status(200).send({ success: true, followingUsers: rows2 });
		});
	});
};

module.exports.followerList = (req, res) => {
	// 팔로워 리스트 가져오기
	if (!req.body.userId) {
		res.send({ success: false, message: '비정상적인 요청입니다.' });
	}

	const userId = req.body.userId;
	const sql = `SELECT * FROM follow WHERE user_id = ?`;

	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log(err);
		// 팔로우 테이블의 정보로 모든 유저를 찾아야 함
		const idArr = [];
		rows.forEach((user) => {
			idArr.push(user.follower_id);
		});

		const sqlUser = `SELECT * FROM user WHERE id IN (${idArr.join(',')})`;

		mysql.query(sqlUser, (err, rows2) => {
			if (err) return console.log(err);
			res.status(200).send({ success: true, followers: rows2 });
		});
	});
};

module.exports.isFollowed = (req, res) => {
	const userId = req.body.userId;
	const followerId = req.body.followerId;

	const sql = `SELECT * FROM follow WHERE user_id = ? AND follower_id = ?`;

	mysql.query(sql, [userId, followerId], (err, rows) => {
		if (err) return console.log(err);
		if (rows == '') {
			res.send({ isFollowed: false });
		} else {
			res.send({ isFollowed: true });
		}
	});
};

module.exports.applyingHost = (req, res) => {
	const userId = req.body.userId;
};

module.exports.checkAuth = (req, res) => {
	const id = req.body.id;
	const sql = `select * from user where id = ?`;

	mysql.query(sql, id, (err, rows, fields) => {
		if (err) return err;

		if (rows[0].isadmin === 1 && rows[0].ishost === 1) {
			res.send({ auth: 3 });
		} else if (rows[0].isadmin === 1) {
			res.send({ auth: 2 });
		} else if (rows[0].ishost === 1) {
			res.send({ auth: 1 });
		} else {
			res.send({ auth: 0 });
		}
	});
};

module.exports.listOfHost = (req, res) => {
	const sql = `SELECT * FROM user WHERE ishost = 1`;

	mysql.query(sql, (err, rows) => {
		if (err) return console.log(err);

		res.status(200).send({ success: true, hosts: rows });
	});
};

module.exports.listOfRequestedHost = (req, res) => {
	const sql = `SELECT * FROM host_request`;

	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log(err);

		res.status(200).send({ success: true, requestedHosts: rows });
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
	const insert = `INSERT INTO host_request(user_id,country,language1,language2,language3,description) VALUES(?,?,?,?,?,?)`;

	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log(err);
		if (rows[0])
			res.send({ success: false, message: '이미 신청한 상태입니다.' });
		mysql.query(
			insert,
			[userId, hostInfo.country, ...languages, hostInfo.description],
			(err) => {
				if (err) return console.log(err);

				res.status(200).send({
					success: true,
					message:
						'호스트 신청이 완료되었습니다. 관리자 승인 후 활동 가능합니다.',
				});
			}
		);
	});
};

module.exports.allowHost = (req, res) => {
	// 호스트 승인
	const userId = req.body.userId;

	const sql = `SELECT * FROM host_request WHERE user_id = ?`;
	const insert = `INSERT INTO host(user_id,country,language1,language2,language3,description) VALUES(?,?,?,?,?,?)`;
	const del = `DELETE FROM host_request WHERE user_id = ?`;

	// 신청 테이블에서 검색
	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log('err:', err);

		// 호스트 테이블로 복사
		mysql.query(
			insert,
			[
				rows[0].user_id,
				rows[0].country,
				rows[0].languages1,
				rows[0].languages2,
				rows[0].languages3,
				rows[0].description,
			],
			(err, rows) => {
				if (err) return console.log('insert err: ', err);

				// 신청 테이블에서 삭제
				mysql.query(del, userId, (err) => {
					if (err) return console.log('delete err: ', err);

					res.send({ success: true, message: '호스트 승인이 완료되었습니다.' });
				});
			}
		);
	});
};
module.exports.denyHost = (req, res) => {
	// 신청한 회원을 거부
	const userId = req.body.userId;
	const sql = `DELETE FROM host_request WHERE user_id`;

	mysql.query(sql, userId, (err) => {
		if (err) return console.log(err);

		res
			.status(200)
			.send({ success: true, message: '호스트 신청을 거절했습니다.' });
	});
};
module.exports.demote = (req, res) => {
	// 기존 호스트 회원을 일반회원으로 강등
	const userId = req.body.userId;

	const sql = `DELETE FROM host WHERE user_id = ?`;
	const update = `UPDATE user SET ishost = 0 WHERE id= ?`;

	mysql.query(sql, userId, (err) => {
		if (err) return console.log(err);
		mysql.query(update, userId, (err) => {
			if (err) return console.log('err: ', err);

			res.status(200).send({
				success: true,
				message: `id: ${userId} 호스트 회원이 강등되었습니다.`,
			});
		});
	});
};
