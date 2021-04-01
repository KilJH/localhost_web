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
	const pw = req.body.pw || null;
	const nickname = req.body.nickname || null;
	const phone = req.body.phone || null;
	const address = req.body.address || null;

	const sql = `SELECT * FROM user WHERE email = ?`;

	mysql.query(sql, email, (err, rows, fields) => {
		if (err) return console.log('여기서 err', err);

		const hashPW = crypto.createHash('sha512').update(pw).digest('hex');

		const update = `UPDATE user SET pw = "${hashPW}", nickname = "${nickname}", phone = "${phone}", address = "${address}" WHERE id = "${rows[0].id}";`;

		mysql.query(update, (err, rows2, field2) => {
			if (err) return console.log(err);
			console.log('변경 성공');
			res.send({ message: '변경 대성공' });
		});
	});
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
	if (!req.userId) {
		res.send({ success: false, message: '비정상적인 요청입니다.' });
	}

	const userId = req.body.userId;

	const sql = `SELECT * FROM follow WHERE follower_id = ?`;
	// 팔로우 리스트 가져오기
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

module.exports.approveHost = (req, res) => {
	const userId = res.body.userId;

	// 신청 테이블에서 호스트 테이블로 옮기기
	// const sql = `SELECT * FROM user WHERE ishost = 1`;

	// mysql.query(sql, (err, rows) => {
	// 	if (err) return console.log(err);

	// 	res.status(200).send({ success: true, hosts: rows });
	// });
};

module.exports.requestHost = (req, res) => {
	const userId = req.body.userId;
	const hostInfo = req.body.hostInfo;

	const sql = `SELECT * FROM host_request WHERE user_id = ?`;
	const insert = `INSERT INTO host_request(user_id,country,language1,language2,language3,description) VALUES(?,?,?,?,?,?)`;

	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log(err);
		if (rows[0])
			res.send({ success: false, message: '이미 신청한 상태입니다.' });
		mysql.query(
			insert,
			[userId, hostInfo.country, ...hostInfo.languages, hostInfo.description],
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
