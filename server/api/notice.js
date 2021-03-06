const mysql = require('../db/mysql');

// 공지사항에 관련된 API를 작성하세요

module.exports.parseDate = rows => {
	return rows.map(notice => {
		const date = new Date(notice.create_time);
		return {
			...notice,
			createTime: `${date.getFullYear()}-${
				date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
			}-${date.getDate() < 9 ? `0${date.getDate()}` : date.getDate()}`,
		};
	});
};

// 전체 R
module.exports.list = (req, res) => {
	// 전체회원
	const sql = `SELECT * FROM notice`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('select err: ', err);

		// 날짜 정보 추가 후 id 최근 순으로 나열
		const result = this.parseDate(rows).sort((a, b) => (a.id > b.id ? -1 : 1));

		res.status(200).json({ success: true, notices: result });
	});
};

// 하나 R
module.exports.find = (req, res) => {
	const id = req.params.id;

	const sql = `SELECT * FROM notice WHERE id = ?`;

	mysql.query(sql, id, (err, rows, fields) => {
		if (err) return console.log('select err: ', err);

		const result = this.parseDate(rows);

		res.status(200).json({ success: true, notice: result[0] });
	});
};

// C
module.exports.write = (req, res) => {
	const { title, description } = req.body;

	const sql = `INSERT INTO notice(title, description) VALUES(?,?)`;

	mysql.query(sql, [title, description], err => {
		if (err) return console.log(err);

		res.status(200).json({ success: true });
	});
};

// U
module.exports.update = (req, res) => {
	const { id, title, description } = req.body;

	const sql = `UPDATE notice SET title = ?, description = ? WHERE id =?`;

	mysql.query(sql, [title, description, id], err => {
		if (err) {
			res.json({
				success: false,
				message: 'SQL 오류로 공지 수정에 실패했습니다.',
			});
			console.log('DELETE err: ', err);
		}

		res.status(200).json({ success: true, message: `id:${id} 공지 수정 완료` });
	});
};

// D
module.exports.delete = (req, res) => {
	const id = req.body.id;
	const sql = `DELETE FROM notice WHERE id = ?`;

	mysql.query(sql, id, err => {
		if (err) {
			res.json({
				success: false,
				message: 'SQL 오류로 공지 삭제에 실패했습니다.',
			});
			console.log('DELETE err: ', err);
		}

		res.json({ success: true, message: `id:${id} 공지 삭제 완료` });
	});
};

// 검색
module.exports.search = (req, res) => {
	const type = req.body.type || 'title';
	const item = req.body.item;

	let sql = '';
	switch (type) {
		case 'title':
			sql = `SELECT * FROM notice WHERE title LIKE "%${item}%"`;
			break;
		case 'content':
			sql = `SELECT * FROM notice WHERE description LIKE "%${item}%"`;
			break;
		default:
			sql = `SELECT * FROM notice WHERE title LIKE "%${item}%" OR description LIKE "%${item}%"`;
			break;
	}

	mysql.query(sql, (err, rows) => {
		if (err) return console.log(err);

		res.status(200).json({ success: true, notices: rows });
	});
};
