const {
	default: formatDistanceStrictWithOptions,
} = require('date-fns/fp/formatDistanceStrictWithOptions');
const mysql = require('../db/mysql');

module.exports.list = (req, res) => {
	// 전체 게시글
	const sql = `SELECT * FROM board`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('select err: ', err);

		rows.sort((a, b) => {
			if (a.id > b.id) return -1;
			else return 1;
		});

		const userSql = `SELECT * FROM user`;
		mysql.query(userSql, (err, rows2, fields2) => {

			const boards = rows.map((board) => {
				const user = rows2.filter((user) => {
					return user.id === board.user_id;
				})[0];

				return { ...board, createTime: board.create_time, author: user };
			});
			res.status(200).send({ success: true, list: boards });
		});
	});
};

module.exports.write = (req, res) => {
	// 게시글 작성
	const userId = req.body.userId;
	const title = req.body.title;
	const description = req.body.description;
	const sql = `INSERT INTO board(user_id, title, description) VALUES("${userId}", "${title}", "${description}");`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('write err: ', err);

		res.status(200).send({ success: true });
	});
};

module.exports.load = (req, res) => {
	// 게시글 불러오기
	const id = req.body.id; // board id
	const sql = `SELECT * FROM board WHERE id = ${id};`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('load err: ', err);
		const hit = rows[0].hit + 1;
		const hitSql = `UPDATE board SET hit = ${hit} WHERE id = ${id}`;
		
		mysql.query(hitSql, (err)=>{
			if (err) return err;
		});

		const replySql = `SELECT * FROM board_reply where id = ${id};`;
		mysql.query(replySql, (err, rows2, fields2) => {
			if(err) return console.log(err);
			
			if(rows2.length!=0){}
			res.status(200).send({ success: true , board: rows[0], reply: rows2[0]});
		})
	});
};

module.exports.update = (req, res) => {
	const id = req.body.id; // board id
	const title = req.body.title;
	const description = req.body.description;

	const sql = `UPDATE board SET title = "${title}", description = "${description}" WHERE id = "${id}";`;

	mysql.query(sql, (err) => {
		if (err) return err;

		res.status(200).send({ success: true });
	});
};

module.exports.delete = (req, res) => {
	const id = req.body.id; // board id

	const sql = `DELETE FROM board WHERE id = ${id}`;

	mysql.query(sql, (err) => {
		if (err) {
			res.send({
				success: false,
				message: 'SQL 오류로 회원 삭제에 실패했습니다.',
			});
			console.log('DELETE err: ', err);
		}

		res.send({ success: true });
	});
};
