const {
	default: formatDistanceStrictWithOptions,
} = require('date-fns/fp/formatDistanceStrictWithOptions');
const mysql = require('../db/mysql');

// DATE formatting function
const formatDate = (date) => {
	const day = new Date(date);
	// 날짜가 오늘이면 hh:mm
	// 아니면 yyyy-MM-dd hh:mm
};

module.exports.list = (req, res) => {
	// 전체 게시글
	// 전체 게시물과 유저정보를 불러온다.
	// id 컬럼이 중복되기때문에 board.id를 board_id로 별칭을 지어준다 Alias
	// ORDER BY로 create_time의 역순대로
	// GROUP BY와 COUNT()를 통해 댓글 수를 카운팅해준다.
	// comment 내용은 필요없기 때문에 JOIN을 하되 SELECT 하지않는다.
	const sql = `SELECT board.*, user.*, COUNT(board_reply.id) AS num_reply, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id LEFT JOIN board_reply ON board.id = board_reply.board_id GROUP BY board.id ORDER BY board.create_time DESC`;

	mysql.query(sql, (err, rows) => {
		if (err) return console.log('select err: ', err);

		const boards = rows.map((board) => {
			console.log(board.create_time);

			return {
				id: board.board_id,
				title: board.title,
				description: board.description,
				createTime: board.create_time,
				hit: board.hit,
				author: {
					id: board.user_id,
					name: board.name,
					email: board.email,
					nickname: board.nickname,
					photo: board.photo,
				},
				numOfComment: board.num_reply,
			};
		});

		console.log(boards);

		res.status(200).send({ success: true, list: boards });
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

	// 1. 해당 id의 게시물과 유저정보를 불러온다.
	// 결과값이 행 한 개 -> rows[0] 해줘야됨
	const boardSql = `SELECT * FROM board LEFT JOIN user ON board.user_id = user.id WHERE board.id = ${id};`;
	mysql.query(boardSql, (err, boardRows) => {
		if (err) return console.log(err);

		// 2. 해당 board_id의 코멘트와 유저정보를 불러온다.
		// 결과값을 배열 그대로 넘겨준다.
		const commentSql = `SELECT * FROM board_reply LEFT JOIN user ON board_reply.user_id = user.id WHERE board_reply.board_id = ${id}`;
		mysql.query(commentSql, (err2, commentsRows) => {
			if (err2) return console.log(err2);

			// 게시물 객체 생성
			const board = {
				id: boardRows[0].id,
				title: boardRows[0].title,
				description: boardRows[0].description,
				createTime: boardRows[0].create_time, // 수정 필요
				hit: boardRows.hit,
				author: {
					id: boardRows[0].user_id,
					name: boardRows[0].name,
					email: boardRows[0].email,
					nickname: boardRows[0].nickname,
					photo: boardRows[0].photo,
				},
			};

			// 댓글 배열 생성
			const comments = commentsRows.map((comment) => {
				return {
					id: comment.id,
					description: comment.description,
					createTiem: comment.create_time,
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
			res.status(200).send({ success: true, board, comments });
		});
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
