const {
	default: formatDistanceStrictWithOptions,
} = require('date-fns/fp/formatDistanceStrictWithOptions');
const { isUnionTypeNode } = require('typescript');
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
	// 전체 플랜
	// 전체 플랜과 유저정보를 불러온다.
	// description중첩이기 때문에 별칭을 지어준다 _desc
	// GROUP BY와 COUNT()를 통해 댓글 수를 카운팅해준다.
	// comment 내용은 필요없기 때문에 JOIN을 하되 SELECT 하지않는다.
	const sql = `SELECT plan.*, user.*, COUNT(plan_comment.id) AS num_comment, plan.id AS plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id 
    LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id GROUP BY plan.id ORDER BY create_time DESC;`;

	mysql.query(sql, (err, rows) => {
		if (err) return console.log('list err: ', err);

		const plans = rows.map(plan => {
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
		res.status(200).json({ success: true, list: plans });
	});
};

module.exports.load = (req, res) => {
	// 플랜 불러오기
	const id = req.body.id; // plan id
	const sql = `SELECT * FROM plan	WHERE id = ?`;

	mysql.query(sql, id, (err, plansRows) => {
		if (err) return console.log('load err', err);

		const hitSql = `UPDATE plan SET hit = hit+1 WHERE id = ?`;
		mysql.query(hitSql, id, err3 => {
			if (err3) return console.log('조회수 증가 실패', err3);
		});

		let planDays = [];
		let dayArr = [];
		let des;
		const daySql = `SELECT d.date, d.description des, t.* FROM plan_day d LEFT JOIN plan_time t ON t.plan_day_id = d.id WHERE d.plan_id = ?`;

		let i = 1;
		mysql.query(daySql, id, (err3, days) => {
			days.map((d, j) => {
				if (d.date === i) {
					dayArr.push({
						description: d.description,
						price: d.price,
						time: d.time,
						type: d.type,
						placeInfo: d.place_info,
						photo: d.photo,
					});
					des = d.des;
				} else {
					planDays.push({
						day: i,
						description: des,
						planTimes: dayArr,
					});
					dayArr = [];
					i++;
					dayArr.push({
						description: d.description,
						price: d.price,
						time: d.time,
						type: d.type,
						placeInfo: d.place_info,
						photo: d.photo,
					});
				}
				if (j === days.length - 1) {
					planDays.push({
						day: i,
						description: d.des,
						planTimes: dayArr,
					});
				}
			});
		});

		const commentSql = `SELECT *, plan_comment.id As comment_id FROM plan_comment LEFT JOIN user ON plan_comment.user_id = user.id WHERE plan_comment.plan_id = ${id}`;
		mysql.query(commentSql, (err2, commentsRows) => {
			if (err2) return console.log('load err2', err2);

			const plan = {
				id: plansRows[0].id,
				title: plansRows[0].title,
				description: plansRows[0].description,
				sleepDays: plansRows[0].sleepDays,
				travelDays: plansRows[0].travelDays,
				createTime: formatDate(plansRows[0].create_time),
				hit: plansRows[0].hit,
				author: {
					id: plansRows[0].user_id,
					name: plansRows[0].name,
					email: plansRows[0].email,
					nickname: plansRows[0].nickname,
					photo: plansRows[0].photo,
				},
				planDays,
			};

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

			res.status(200).json({ success: true, plan, comments });
		});
	});
};

module.exports.write = (req, res) => {
	const {
		userId,
		title,
		description,
		sleepDays,
		travelDays,
		tags,
		planDays,
	} = req.body;
	const sql = `INSERT INTO plan(user_id, title, description, sleep_days, travel_days) VALUES("${userId}", "${title}", "${description}", "${sleepDays}", "${travelDays}");`;

	mysql.query(sql, (err, rows) => {
		if (err) {
			return err;
		}
		const planId = rows.insertId;
		const tagsStr = tags.map(tag => `(${planId}, ${tag})`).join(',');
		const tagsSql = `INSERT INTO plan_tag VALUES ${tagsStr}`;

		mysql.query(tagsSql, err2 => {
			if (err2) return err2;
		});

		mysql.query(tagsSql, err2 => {
			return err2;
		});

		const planDaysStr = planDays
			.map((planDay, i) => `(${planId}, "${planDay.description}", ${i + 1})`)
			.join(',');
		const daySql = `INSERT INTO plan_day(plan_id, description, date) VALUES ${planDaysStr}`;

		mysql.query(daySql, (err2, rows2) => {
			if (err2) {
				return err2;
			}
			const planDayId = rows2.insertId;
			const arr = [];
			for (let i = 0; i < planDays.length; i++) {
				planDays[i].planTimes.map(planTime => {
					arr.push(
						`(${planDayId + i}, "${planTime.description}", ${
							planTime.price
						}, "${planTime.time}", "${planTime.type}", "${
							planTime.placeInfo
						}", "${planTime.photo}")`,
					);
				});
			}

			const planTimesStr = arr.join(',');
			const timeSql = `INSERT INTO plan_time(plan_day_id, description, price, time, type, place_info, photo) VALUES ${planTimesStr}`;

			mysql.query(timeSql, err3 => {
				if (err3) {
					res.json({ success: false });
					return err3;
				}
				res.json({ success: true });
			});
		});
	});
};

module.exports.delete = (req, res) => {
	// 삭제
	const { id, planDayId, planTimeId } = req.body; // 플랜 id

	let sql = '';
	if (id) sql = `DELETE FROM plan WHERE id = "${id}";`;
	if (planDayId) sql = `DELETE FROM plan_day WHERE id = "${planDayId}";`;
	if (planTimeId) sql = `DELETE FROM plan_time WHERE id = "${planTimeId}";`;

	mysql.query(sql, err => {
		if (err) return err;
		res.json({ success: true });
	});
};

module.exports.timeUpdate = (req, res) => {
	//시간 수정
	const { id, description, price, time } = req.body; // plan_timeId

	const sql = `UPDATE plan_time SET description = "${description}", price = "${price}", time = "${time}" WHERE id = "${id}";`;

	mysql.query(sql, err => {
		if (err) return err;
		res.json({ success: true });
	});
};

module.exports.dayUpdate = (req, res) => {
	//데이 수정
	const { id, description, date } = req.body; // plan_dayId

	const sql = `UPDATE plan_day SET description = "${description}", date = "${date}" WHERE id = "${id}";`;

	mysql.query(sql, err => {
		if (err) return err;
		res.json({ success: true });
	});
};

module.exports.planUpdate = (req, res) => {
	//플랜 수정
	const { id, title } = req.body; // planId

	const sql = `UPDATE plan SET title = "${title}" WHERE id = "${id}";`;

	mysql.query(sql, err => {
		if (err) return err;
		res.json({ success: true });
	});
};

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

		const plans = rows.map(plan => {
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

		res.status(200).json({ success: true, list: plans });
	});
};
