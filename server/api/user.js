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
			// res.json({ message: '사용할 수 있는 이메일입니다.' });
			const insert = `INSERT INTO user(email, pw, name, sex, nickname, phone, address) VALUES("${email}", "${hashPW}", "${name}", "${sex}", "${nickname}", "${phone}", "${address}");`;

			mysql.query(insert, (err3, rows, fields) => {
				if (err3) return console.log('err3: ', err3);

				console.log('계정 생성 성공');
			});
			res.status(200).json({ success: true, message: '회원가입 완료' });
		} else {
			res.json({ success: false, message: '이미 등록 된 이메일입니다.' });
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
		res.json({ success: true, message: '변경 대성공' });
	});
};

module.exports.updatePhoto = (req, res) => {
	// 프로필 이미지 수정
	const url = req.body.url;
	const userId = req.body.id;
	const sql = `UPDATE user SET photo = "${url}" WHERE id = "${userId}"`;

	mysql.query(sql, err => {
		if (err) return console.log(err);

		res.json({ success: true, message: '프로필 이미지 변경' });
	});
};

module.exports.updatePW = (req, res) => {
	console.log('왔냐?');
	const email = req.body.email || req.query.email;
	const pw = req.body.pw || req.query.pw;
	const hashPW = crypto.createHash('sha512').update(pw).digest('hex');

	const update = `UPDATE user SET pw = "${hashPW}" WHERE email = "${email}";`;

	mysql.query(update, err => {
		if (err) return err;
		res.json({ success: true, message: '비밀번호 변경에 성공했습니다.' });
	});
};

module.exports.delete = (req, res) => {
	const userId = req.body.userId;

	const sql = `DELETE FROM user WHERE id = ?`;

	mysql.query(sql, userId, err => {
		if (err) {
			res.json({
				success: false,
				message: 'SQL 오류로 회원 삭제에 실패했습니다.',
			});
			console.log('DELETE err: ', err);
		}

		res.json({ success: true, message: `id:${userId} 회원 삭제 완료` });
	});
};

module.exports.list = (req, res) => {
	// 전체회원
	const sql = `SELECT * FROM user`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('select err: ', err);
		console.log('검색된 회원수: ', rows.length);
		res.status(200).json({ success: true, users: rows });
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
		res.status(200).json({ success: true, user: rows[0] });
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

		res.status(200).json({ success: true, users: rows });
	});
};

module.exports.follow = (req, res) => {
	// 팔로우, 팔로우 취소

	if (!req.body.userId || !req.body.followerId) {
		res.json({ success: false, message: '비정상적인 요청입니다.' });
	}

	const userId = req.body.userId;
	const followerId = req.body.followerId;

	const sql = `SELECT * FROM follow WHERE user_id = ? AND follower_id = ?`;

	mysql.query(sql, [userId, followerId], (err, rows, fields) => {
		if (err) return console.log('select err: ', err);

		if (rows == '') {
			const insert = `INSERT INTO follow(user_id, follower_id) VALUES("${userId}", "${followerId}");`;
			mysql.query(insert, (err, rows, fields) => {
				if (err) return console.log('insert err: ', err);
				res.status(200).json({ success: true, message: ' 팔로우 성공' });
			});
		} else {
			const deleteSql = `DELETE FROM follow WHERE user_id = ? AND follower_id = ?`;
			mysql.query(deleteSql, [userId, followerId], (err, rows, fields) => {
				if (err) return console.log('delete err: ', err);
				res.status(200).json({ success: true, message: ' 팔로우 취소' });
			});
		}
	});
};

module.exports.followList = (req, res) => {
	// 팔로우 리스트 가져오기
	if (!req.body.userId) {
		res.json({ success: false, message: '비정상적인 요청입니다.' });
	}

	const userId = req.body.userId;
	const sql = `SELECT * FROM follow LEFT JOIN user ON follow.user_id=user.id WHERE follow.follower_id = ?`;

	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log(err);

		const followingUsers = rows.map(user => {
			return {
				id: user.user_id,
				name: user.name,
				email: user.email,
				nickname: user.nickname,
				photo: user.photo,
			};
		});

		res.json({ success: true, followingUsers });
	});
};

module.exports.followerList = (req, res) => {
	// 팔로워 리스트 가져오기
	if (!req.body.userId) {
		res.json({ success: false, message: '비정상적인 요청입니다.' });
	}

	const userId = req.body.userId;
	const sql = `SELECT * FROM follow LEFT JOIN user ON follow.follower_id=user.id WHERE follow.user_id = ?`;

	mysql.query(sql, userId, (err, rows) => {
		if (err) return console.log(err);
		// 팔로우 테이블의 정보로 모든 유저를 찾아야 함
		const followers = rows.map(user => {
			return {
				id: user.user_id,
				name: user.name,
				email: user.email,
				nickname: user.nickname,
				photo: user.photo,
			};
		});

		res.json({ success: true, followers });
	});
};

module.exports.isFollowed = (req, res) => {
	const userId = req.body.userId;
	const followerId = req.body.followerId;

	const sql = `SELECT * FROM follow WHERE user_id = ? AND follower_id = ?`;

	mysql.query(sql, [userId, followerId], (err, rows) => {
		if (err) return console.log(err);
		if (rows == '') {
			res.json({ isFollowed: false });
		} else {
			res.json({ isFollowed: true });
		}
	});
};

module.exports.checkAuth = (req, res) => {
	const id = req.body.id;
	const sql = `select * from user where id = ?`;

	mysql.query(sql, id, (err, rows, fields) => {
		if (err) return err;

		if (rows[0].isadmin === 1 && rows[0].ishost === 1) {
			res.json({ auth: 3 });
		} else if (rows[0].isadmin === 1) {
			res.json({ auth: 2 });
		} else if (rows[0].ishost === 1) {
			res.json({ auth: 1 });
		} else {
			res.json({ auth: 0 });
		}
	});
};

module.exports.block = (req, res) => {
	const userId = req.body.userId;
	const reason = req.body.reason;

	const sql = `INSERT INTO ban(user_id, reason) VALUES(?,?)`;

	mysql.query(sql, [userId, reason], err => {
		if (err) return console.log(err);

		res.status(200).json({ success: true, message: '회원을 차단했습니다.' });
	});
};
