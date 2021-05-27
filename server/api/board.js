const {
	default: formatDistanceStrictWithOptions,
} = require('date-fns/fp/formatDistanceStrictWithOptions');
const mysql = require('../db/mysql');

// DATE formatting function
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
	// 전체 게시글
	// 전체 게시물과 유저정보를 불러온다.
	// id 컬럼이 중복되기때문에 board.id를 board_id로 별칭을 지어준다 Alias
	// ORDER BY로 create_time의 역순대로
	// GROUP BY와 COUNT()를 통해 댓글 수를 카운팅해준다.
	// comment 내용은 필요없기 때문에 JOIN을 하되 SELECT 하지않는다.
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
			return {
				id: board.board_id,
				title: board.title,
				description: board.description,
				createTime: formatDate(board.create_time),
				hit: board.hit,
				author: {
					id: board.user_id,
					name: board.name,
					email: board.email,
					nickname: board.nickname,
					photo: board.photo,
				},
				numOfComment: board.num_comment,
			};
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

module.exports.write = (req, res) => {
	// 게시글 작성
	const { userId, title, description } = req.body;
	const sql = `INSERT INTO board(user_id, title, description) VALUES("${userId}", "${title}", "${description}");`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('write err: ', err);

		res.status(200).json({ success: true });
	});
};

module.exports.load = (req, res) => {
	// 게시글 불러오기
	const id = req.body.id; // board id

	// 0. 조회수 1 증가
	const hitSql = `UPDATE board SET hit = hit+1 WHERE id = ?`;
	mysql.query(hitSql, id, err3 => {
		if (err3) return console.log('조회수 증가 실패', err3);
	});

	// 1. 해당 id의 게시물과 유저정보를 불러온다.
	// 결과값이 행 한 개 -> rows[0] 해줘야됨
	const boardSql = `SELECT *, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id WHERE board.id = ${id};`;
	mysql.query(boardSql, (err, boardRows) => {
		if (err) return console.log(err);

		// 2. 해당 board_id의 코멘트와 유저정보를 불러온다.
		// 결과값을 배열 그대로 넘겨준다.
		const commentSql = `SELECT *, board_comment.id AS comment_id FROM board_comment LEFT JOIN user ON board_comment.user_id = user.id WHERE board_comment.board_id = ${id}`;
		mysql.query(commentSql, (err2, commentsRows) => {
			if (err2) return console.log(err2);

			// 게시물 객체 생성
			const board = {
				id: boardRows[0].board_id,
				title: boardRows[0].title,
				description: boardRows[0].description,
				createTime: formatDate(boardRows[0].create_time),
				hit: boardRows[0].hit,
				author: {
					id: boardRows[0].user_id,
					name: boardRows[0].name,
					email: boardRows[0].email,
					nickname: boardRows[0].nickname,
					photo: boardRows[0].photo,
				},
				numOfComment: commentsRows.length,
			};

			// 댓글 배열 생성
			const comments = commentsRows.map(comment => {
				return {
					id: comment.comment_id,
					description: comment.description,
					createTime: formatDate(comment.create_time),
					user: {
						id: comment.user_id,
						name: comment.name,
						email: comment.email,
						nickname: comment.nickname,
						photo: comment.photo,
					},
				};
			});

			// 3. Board와 Comment[] 객체를 넘겨준다.( 불필요 정보 없어도 됨 )
			// 객체의 키 값은 client/interfaces/index.ts 참조
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
		if (err) {
			res.json({
				success: false,
				message: 'SQL 오류로 공지 삭제에 실패했습니다.',
			});
			console.log('DELETE err: ', err);
		}

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
			return {
				id: board.board_id,
				title: board.title,
				description: board.description,
				createTime: formatDate(board.create_time),
				hit: board.hit,
				author: {
					id: board.user_id,
					name: board.name,
					email: board.email,
					nickname: board.nickname,
					photo: board.photo,
				},
				numOfComment: board.num_comment,
			};
		});

		res.status(200).json({ success: true, list: boards });
	});
};
