const mysql = require('../db/mysql');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { redirect } = require('next/dist/next-server/server/api-utils');

// .env 파일로 빼서 gitignore하고 환경변수로 사용
const SECRET_KEY = 'wearelocalhost';

module.exports.createToken = (user, res) => {
	const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1d' });

	// res.cookie('user', token);
	// 리턴? 센드?
	return token;
};

module.exports.login = (req, res) => {
	// 로그인
	if (!req.body.email)
		res.json({ success: false, message: '아이디를 입력해주세요' });
	if (!req.body.pw)
		res.json({ success: false, message: '비밀번호를 입력해주세요' });

	const email = req.body.email || req.query.email;
	const pw = req.body.pw || req.query.pw;
	const sql = `SELECT * FROM user WHERE email = ?`;
	const hashPW = crypto.createHash('sha512').update(pw).digest('hex');

	mysql.query(sql, email, (err2, rows, fields) => {
		if (err2) return console.log('err2: ', err2);
		if (rows == '') {
			res.json({ success: false, message: '등록되지 않은 이메일 입니다.' });
		} else {
			if (hashPW === rows[0].pw) {
				const updateSql = `UPDATE user SET token = ? WHERE id = ?`;
				const user = {
					id: rows[0].id,
					email: rows[0].email,
					password: rows[0].pw,
					name: rows[0].name,
					nickname: rows[0].nickname,
					phone: rows[0].phone,
					address: rows[0].address,
				};
				const token = this.createToken(user, res);
				// 여기서 토큰 검사해야 됨
				mysql.query(updateSql, [token, rows[0].id], err3 => {
					if (err3) return console.log('input token err: ', err3);
					else {
						res
							.cookie('token', token, {
								httpOnly: true,
							})
							.status(200)
							.json({ success: true, message: '로그인 성공', user: rows[0] });
					}
				});
			} else {
				res.json({ success: false, message: '비밀번호가 틀립니다.' });
			}
		}
	});
};

// 페이지 인증
module.exports.checkToken = (req, res) => {
	jwt.verify(req.body.token, SECRET_KEY, (err, decoded) => {
		if (err) return res.json({ success: false, message: err });

		const sql = `SELECT * FROM user WHERE id = ?`;
		mysql.query(sql, decoded.id, (err2, rows) => {
			if (err2) return err2;
			if (rows[0].token === req.body.token) {
				const user = {
					...rows[0],
					isAdmin: rows[0].isadmin,
					isHost: rows[0].ishost,
				};

				res.status(200).json({ success: true, message: '로그인', user: user });
			} else {
				res.json({ success: false, message: '로그인 토큰 만료' });
			}
		});
	});
};

// 로그아웃

module.exports.logout = (req, res) => {
	jwt.verify(req.cookies.token, SECRET_KEY, (err, decoded) => {
		if (err) return res.json({ success: false, message: err });

		const sql = `UPDATE user SET token = ? WHERE id = ?`;
		mysql.query(sql, ['', decoded.id], err => {
			if (err) return err;
			else res.json({ success: true });
		});
	});
};
