import mysql from '../../../server/db/mysql';

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

export default async (req: any, res: any) => {
	// 전체 게시글
	// 전체 게시물과 유저정보를 불러온다.
	// id 컬럼이 중복되기때문에 board.id를 board_id로 별칭을 지어준다 Alias
	// ORDER BY로 create_time의 역순대로
	// GROUP BY와 COUNT()를 통해 댓글 수를 카운팅해준다.
	// comment 내용은 필요없기 때문에 JOIN을 하되 SELECT 하지않는다.
	const sql = `SELECT board.*, user.*, COUNT(board_comment.id) AS num_comment, board.id AS board_id FROM board LEFT JOIN user ON board.user_id = user.id LEFT JOIN board_comment ON board.id = board_comment.board_id GROUP BY board.id ORDER BY board.create_time DESC`;
	const page = req.query.page || 1;

	console.log('넥스트 API');

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

		res.status(200).send({
			success: true,
			pagedBoards: results,
			lastIdx: Math.floor(boards.length / 10) + 1,
			page: page,
		});
	});
};
