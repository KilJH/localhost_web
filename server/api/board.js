const {
	default: formatDistanceStrictWithOptions,
} = require('date-fns/fp/formatDistanceStrictWithOptions');
const mysql = require('../db/mysql');
const userApi = require('./user');

module.exports.boardMapping = board => {
	return {
		id: board.board_id || board.id,
		title: board.title,
		description: board.description,
		createTime: formatDate(board.create_time),
		hit: board.hit,
		author: userApi.userMapping(board),
		numOfComment: board.num_comment,
	};
};

module.exports.commentMapping = comment => {
	return {
		id: comment.comment_id,
		user: userApi.userMapping(comment),
		description: comment.description,
		createTime: formatDate(comment.create_time),
	};
};

const formatDate = date => {
	const day = new Date(date);
	const now = new Date();
	// 날짜가 오늘이면 hh:mm

	const yyyy = day.getFullYear();
	const MM = day.getMonth() < 9 ? `0${day.getMonth() + 1}` : day.getMonth() + 1;
	const dd = day.getDate() < 9 ? `0${day.getDate()}` : day.getDate();

	const hh = day.getHours() < 10 ? `0${day.getHours()}` : day.getHours();
	const mm = day.getMinutes() < 10 ? `0${day.getMinutes()}` : day.getMinutes();

	if (
		!(
			now.getFullYear() - day.getFullYear() ||
			now.getMonth() - day.getMonth() ||
			now.getDate() - day.getDate()
		)
	) {
		return `${hh} : ${mm}`;
	} else {
		// 아니면 yyyy-MM-dd hh:mm

		return `${yyyy}-${MM}-${dd} ${hh} : ${mm}`;
	}
};

module.exports.list = (req, res) => {
	const type = req.query.type || 'title';
	const item = req.query.item || '';
	let sql = ``;

	switch (type) {
		case 'title':
			sql = `SELECT board.*, user.*, COUNT(board_comment.id) AS num_comment, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id 
			LEFT JOIN board_comment ON board.id = board_comment.board_id WHERE title LIKE "%${item}%" GROUP BY board.id ORDER BY board.create_time DESC;`;
			break;
		case 'nickname':
			sql = `SELECT board.*, user.*, COUNT(board_comment.id) AS num_comment, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id 
			LEFT JOIN board_comment ON board.id = board_comment.board_id WHERE nickname LIKE "%${item}%" GROUP BY board.id ORDER BY board.create_time DESC;`;
			break;
		case 'description':
			sql = `SELECT board.*, user.*, COUNT(board_comment.id) AS num_comment, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id 
			LEFT JOIN board_comment ON board.id = board_comment.board_id WHERE board.description LIKE "%${item}%" GROUP BY board.id ORDER BY board.create_time DESC;`;
			break;
	}

	const page = req.query.page || 1;

	mysql.query(sql, (err, rows) => {
		if (err) return console.log('select err: ', err);

		const boards = rows.map(board => {
			return this.boardMapping(board);
		});

		const results = boards.slice((page - 1) * 10, page * 10);

		res.status(200).json({
			success: true,
			pagedBoards: results,
			lastIdx: Math.ceil(boards.length / 10),
			page: page,
		});
	});
};

module.exports.myBoardList = (req, res) => {
	const { userId } = req.body;
	const sql = `SELECT * FROM board WHERE user_id = ? ORDER BY id DESC`;

	mysql.query(sql, userId, (err, boardsRes) => {
		if (err) return console.log('myBoardList err', err);

		const boards = boardsRes.map(board => ({
			...board,
			createTime: formatDate(board.create_time),
		}));
		res.json({ success: true, boards });
	});
};

module.exports.write = (req, res) => {
	const { userId, title, description } = req.body;
	const sql = `INSERT INTO board(user_id, title, description) VALUES("${userId}", "${title}", "${description}");`;

	mysql.query(sql, err => {
		if (err) return console.log('write err: ', err);

		res.status(200).json({ success: true });
	});
};

module.exports.load = (req, res) => {
	const id = req.body.id; // board id

	const hitSql = `UPDATE board SET hit = hit+1 WHERE id = ?`;
	mysql.query(hitSql, id, err => {
		if (err) return console.log('조회수 증가 실패', err);
	});

	const boardSql = `SELECT *, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id WHERE board.id = ${id};`;
	mysql.query(boardSql, (err, boardRows) => {
		if (err) return console.log(err);

		const commentSql = `SELECT *, board_comment.id AS comment_id FROM board_comment LEFT JOIN user ON board_comment.user_id = user.id WHERE board_comment.board_id = ${id}`;
		mysql.query(commentSql, (err2, commentsRows) => {
			if (err2) return console.log(err2);

			const board = this.boardMapping(boardRows[0]);

			const comments = commentsRows.map(comment => {
				return this.commentMapping(comment);
			});

			res.status(200).json({ success: true, board, comments });
		});
	});
};

module.exports.update = (req, res) => {
	const { id, title, description } = req.body; // board id

	const sql = `UPDATE board SET title = "${title}", description = "${description}" WHERE id = "${id}";`;

	mysql.query(sql, err => {
		if (err) return err;

		res.status(200).json({ success: true });
	});
};

module.exports.delete = (req, res) => {
	const id = req.body.id; // board id

	const sql = `DELETE FROM board WHERE id = ${id}`;

	mysql.query(sql, err => {
		if (err) console.log('DELETE err: ', err);

		res.json({ success: true });
	});
};

module.exports.comment = (req, res) => {
	const { id, userId, description } = req.body; // board id
	const sql = `INSERT INTO board_comment(board_id, user_Id, description) VALUES("${id}", "${userId}", "${description}");`;

	mysql.query(sql, err => {
		if (err) res.json({ success: false, message: '댓글 작성에 실패했습니다.' });
	});
	res.json({ success: true, message: '댓글 달기 성공' });
};

module.exports.search = (req, res) => {
	const type = req.body.type || 'title';
	const item = req.body.item;

	let sql = '';
	switch (type) {
		case 'title':
			sql = `SELECT board.*, user.*, COUNT(board_comment.id) AS num_comment, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id LEFT JOIN board_comment ON board.id = board_comment.board_id WHERE title LIKE "%${item}%" GROUP BY board.id ORDER BY board.create_time DESC `;
			break;
		case 'description':
			sql = `SELECT board.*, user.*, COUNT(board_comment.id) AS num_comment, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id LEFT JOIN board_comment ON board.id = board_comment.board_id WHERE board.description LIKE "%${item}%" GROUP BY board.id ORDER BY board.create_time DESC`;
			break;
		case 'nickname':
			sql = `SELECT board.*, user.*, COUNT(board_comment.id) AS num_comment, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id LEFT JOIN board_comment ON board.id = board_comment.board_id WHERE nickname LIKE "%${item}%" GROUP BY board.id ORDER BY board.create_time DESC`;
			break;
		default:
			sql = `SELECT board.*, user.*, COUNT(board_comment.id) AS num_comment, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id LEFT JOIN board_comment ON board.id = board_comment.board_id GROUP BY board.id ORDER BY board.create_time DESC`;
			break;
	}

	mysql.query(sql, (err, rows) => {
		if (err) return console.log('serach err: ', err);

		const boards = rows.map(board => {
			return this.boardMapping(board);
		});

		res.status(200).json({ success: true, list: boards });
	});
};
