import mysql from '../../../server/db/mysql';

export default async (_req: any, res: any) => {
	// 전체 게시글
	// 전체 게시물과 유저정보를 불러온다.
	// id 컬럼이 중복되기때문에 board.id를 board_id로 별칭을 지어준다 Alias
	// ORDER BY로 create_time의 역순대로
	// GROUP BY와 COUNT()를 통해 댓글 수를 카운팅해준다.
	// comment 내용은 필요없기 때문에 JOIN을 하되 SELECT 하지않는다.
	const sql = `SELECT board.id FROM board`;

	mysql.query(sql, (err, rows) => {
		if (err) return console.log('select err: ', err);

		res.status(200).send({
			success: true,
			idList: rows,
		});
	});
};
