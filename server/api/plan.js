const {
	default: formatDistanceStrictWithOptions,
} = require('date-fns/fp/formatDistanceStrictWithOptions');
const mysql = require('../db/mysql');

// DATE formatting function
const formatDate = (date) => {
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
	// 전체 플랜
	// 전체 플랜과 유저정보를 불러온다.
	// description중첩이기 때문에 별칭을 지어준다 _desc
	// GROUP BY와 COUNT()를 통해 댓글 수를 카운팅해준다.
	// comment 내용은 필요없기 때문에 JOIN을 하되 SELECT 하지않는다.
	const sql = `SELECT plan.*, user.*, COUNT(plan_comment.id) AS num_comment, plan.id AS plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id 
    LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id GROUP BY plan.id ORDER BY create_time DESC;`;

	mysql.query(sql, (err, rows) => {
		if (err) return console.log('list err: ', err);

		const plans = rows.map((plan) => {
			return {
				id: plan.plan_id,
				title: plan.title,
				createTime: formatDate(plan.create_time),
				hit: plan.hit,
				author: {
					id: plan.user_id,
					name: plan.name,
					email: plan.email,
					nickname: plan.nickname,
					photo: plan.photo,
				},
				numOfComment: plan.num_comment,
			};
		});
		res.status(200).send({ success: true, list: plans });
	});
};

module.exports.load = (req, res) => {
	// 플랜불러오
	const id = req.body.id; // plan id
	const hitSql = `UPDATE plan SET hit = hit+1 WHERE id = ?`;

	mysql.query(hitSql, id, (err3) => {
		if (err3) return console.log('조회수 증가 실패', err3);
	});

	const sql = `SELECT *, plan_day.description AS day_desc FROM plan LEFT JOIN plan_day ON plan.id = plan_day.plan_id LEFT JOIN plan_time
    ON plan_day.id = plan_time.plan_day_id LEFT JOIN user ON plan.user_id = user.id WHERE plan.id = ${id}`;

	mysql.query(sql, (err, plansRows) => {
		if (err) return console.log('load err', err);

		const commentSql = `SELECT * FROM plan_comment LEFT JOIN user ON plan_comment.user_id = user.id WHERE plan_comment.plan_id = ${id}`;
		mysql.query(commentSql, (err2, commentsRows) => {
			if (err2) return console.log('load err2', err2);

			const plan = {
				id: plansRows[0].id,
				title: plansRows[0].title,
				createTime: formatDate(plansRows[0].create_time),
				hit: plansRows[0].hit,
				author: {
					id: plansRows[0].user_id,
					name: plansRows[0].name,
					email: plansRows[0].email,
					nickname: plansRows[0].nickname,
					photo: plansRows[0].photo,
				},
			};
			// 플랜 객체 생성
			const planDetail = plansRows.map((planRows) => {
				return {
					day: planRows.date,
					day_desc: planRows.day_desc,
					time_desc: planRows.description,
					price: planRows.price,
					time: planRows.time,
				};
			});

            const comments = commentsRows.map((comment) => {
				return {
					id: comment.id,
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

			res.status(200).send({ success: true, plan, planDetail, comments });
		});
	});
};

module.exports.timeWrite = (req, res) => {
	// 시간 작성
	const planDayId = req.body.planDayId;
	const description = req.body.description;
	const price = req.body.price;
	const time = req.body.time;

	const sql = `INSERT INTO plan_time(plan_day_id, description, price, time) VALUES("${planDayId}", "${description}", "${price}", "${time}");`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('timeWrite err: ', err);

		res.status(200).send({ success: true });
	});
};

module.exports.dayWrite = (req, res) => {
	// 데이 작성
	const planId = req.body.planId;
	const description = req.body.description;
	const date = req.body.date;

	const sql = `INSERT INTO plan_day(plan_id, description, date) VALUES("${planId}", "${description}", "${date}");`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('dayWrite err: ', err);

		res.status(200).send({ success: true });
	});
};

module.exports.planWrite = (req, res) => {
	// 플랜 작성
	const userId = req.body.userId;
	const title = req.body.title;

	const sql = `INSERT INTO plan(user_id, title) VALUES("${userId}", "${title}");`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('planWrite err: ', err);

		res.status(200).send({ success: true });
	});
};

module.exports.delete = (req, res) => {
	// 삭제
	const id = req.body.id; // 플랜 id
	const planDayId = req.body.planDayId;
	const planTimeId = req.body.planTimeId;
	
	let sql = '';
	if(id)
		sql = `DELETE FROM plan WHERE id = "${id}";`;
	if(planDayId)
		sql =`DELETE FROM plan_day WHERE id = "${planDayId}";`;
	if(planTimeId)
		sql =`DELETE FROM plan_time WHERE id = "${planTimeId}";`;

	mysql.query(sql, (err) => {
		if(err) return err;
		res.send({ success: true });
	})	
};

module.exports.timeUpdate = (req, res) => {
	//시간 수정
	const id = req.body.id; // plan_timeId
	const description = req.body.description;
	const price = req.body.price;
	const time = req.body.time;

	const sql = `UPDATE plan_time SET description = "${description}", price = "${price}", time = "${time}" WHERE id = "${id}";`;
	
	mysql.query(sql, (err) => {
		if(err) return err;
		res.send({ success: true });
	})
}

module.exports.dayUpdate = (req, res) => {
	//데이 수정
	const id = req.body.id; // plan_dayId
	const description = req.body.description;
	const date = req.body.date;

	const sql = `UPDATE plan_day SET description = "${description}", date = "${date}" WHERE id = "${id}";`;
	
	mysql.query(sql, (err) => {
		if(err) return err;
		res.send({ success: true });
	})
}

module.exports.planUpdate = (req, res) => {
	//플랜 수정
	const id = req.body.id; // planId
	const title = req.body.title;

	const sql = `UPDATE plan SET title = "${title}" WHERE id = "${id}";`;
	
	mysql.query(sql, (err) => {
		if(err) return err;
		res.send({ success: true });
	})
}

module.exports.search = (req, res) => {
	const type = req.body.type || 'title';
	const item = req.body.item;

	let sql = '';
	switch (type) {
		case 'title':
			sql = `select plan.*, user.*, count(plan_comment.id) as num_comment, plan.id AS plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id WHERE title LIKE "%${item}%" GROUP BY plan.id ORDER BY plan.create_time DESC `;
			break;
		case 'nickname':
			sql = `select plan.*, user.*, count(plan_comment.id) as num_comment, plan.id AS plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id WHERE nickname LIKE "%${item}%" GROUP BY plan.id ORDER BY plan.create_time DESC `;
			break;
		default:
			sql = `select plan.*, user.*, count(plan_comment.id) as num_comment, plan.id AS plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id GROUP BY plan.id ORDER BY plan.create_time DESC `;
			break;
	}

	mysql.query(sql, (err, rows) => {
		if (err) return console.log('serach err: ', err);

		const plans = rows.map((plan) => {
			return {
				id: plan.plan_id,
				title: plan.title,
				createTime: formatDate(plan.create_time),
				hit: plan.hit,
				author: {
					id: plan.user_id,
					name: plan.name,
					email: plan.email,
					nickname: plan.nickname,
					photo: plan.photo,
				},
				numOfComment: plan.num_comment,
			};
		});

		res.status(200).send({ success: true, list: plans });
	});
};