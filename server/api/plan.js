const {
	default: formatDistanceStrictWithOptions,
} = require('date-fns/fp/formatDistanceStrictWithOptions');
const { isUnionTypeNode, ModuleKind } = require('typescript');
const mysql = require('../db/mysql');
const userApi = require('./user');
const boardApi = require('./board');

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

module.exports.planMapping = plan => {
	return {
		id: plan.plan_id,
		title: plan.title,
		description: plan.description,
		sleepDays: plan.sleep_days,
		travelDays: plan.travel_days,
		price: plan.price,
		thumb: plan.thumb,
		createTime: formatDate(plan.create_time),
		hit: plan.hit,
		author: userApi.userMapping(plan),
		numOfComment: plan.num_comment,
		likes: plan.likes,
	};
};

module.exports.list = (req, res) => {
	const type = req.query.type || 'title';
	const item = req.query.item || '';

	let sql = ``;

	switch (type) {
		case 'title':
			sql = `SELECT plan.*, user.*, COUNT(plan_comment.id) AS num_comment, plan.id AS plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id 
			LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id WHERE title LIKE "%${item}%" GROUP BY plan.id ORDER BY create_time DESC;`;
			break;
		case 'description':
			sql = `SELECT plan.*, user.*, COUNT(plan_comment.id) AS num_comment, plan.id AS plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id WHERE plan.description LIKE "%${item}%" GROUP BY plan.id ORDER BY create_time DESC;`;
			break;
		case 'both':
			sql = `SELECT plan.*, user.*, COUNT(plan_comment.id) num_comment, plan.id plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id 
			LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id WHERE title LIKE "%${item}%" || plan.description LIKE "%${item}%" GROUP BY plan.id ORDER BY create_time DESC;`;
			break;
	}

	const page = req.query.page || 1;

	mysql.query(sql, (err, rows) => {
		if (err) return res.json({ success: false, err });

		const plans = rows.map(plan => {
			return this.planMapping(plan);
		});
		const start = (page - 1) * 10;
		const results = plans.slice(start, start + 10);

		res.status(200).json({
			success: true,
			plans: results || [],
			lastIdx: Math.ceil(plans.length / 10),
			page,
		});
	});
};

module.exports.myPlanList = (req, res) => {
	const userId = req.body.userId;
	const sql = `SELECT * FROM plan WHERE user_id = ?`;

	mysql.query(sql, userId, (err, plans) => {
		if (err) return res.json({ success: false, err });

		res.json({ success: true, plans });
	});
};

module.exports.load = (req, res) => {
	// 플랜 불러오기
	const id = req.body.id; // plan id
	const sql = `SELECT p.*, u.*, p.id plan_id, COUNT(l.id) likes FROM plan p LEFT JOIN user u ON u.id = p.user_id LEFT JOIN plan_like l ON l.plan_id = p.id WHERE p.id = ?`;
	let total = 0;

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
				const place = {
					formatted_address: d.address,
					geometry: { location: { lat: d.latitude, lng: d.longitude } },
					name: d.name,
				};
				let photos = [];
				if (d.photo !== null) {
					photos = d.photo.split(';');
				} else {
					photos.push('');
				}

				total += d.price;
				if (d.date === i) {
					dayArr.push({
						description: d.description,
						price: d.price,
						time: d.time,
						type: d.type,
						place: place,
						photo: photos,
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
						place: place,
						photo: photos,
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

			const mapedPlan = this.planMapping(plansRows[0]);
			const plan = {
				...mapedPlan,
				planDays,
			};

			const comments = commentsRows.map(comment => {
				return boardApi.commentMapping(comment);
			});

			res.status(200).json({ success: true, plan, comments, price: total });
		});
	});
};

module.exports.write = (req, res) => {
	const userId = req.body.userId;
	const { title, description, sleepDays, travelDays, tags, planDays } =
		req.body.plan;
	const thumb = req.body.plan.thumb || '';
	const sql = `INSERT INTO plan(user_id, title, description, sleep_days, travel_days, thumb) VALUES("${userId}", "${title}", "${description}" , "${sleepDays}", "${travelDays}", "${thumb}");`;

	if (title === '' || description === '') {
		res.json({ success: false });
		return;
	}

	for (let i = 0; i < planDays.length; i++) {
		if (planDays[i].planTimes.length < 1) {
			res.json({ success: false });
			return;
		}
	}

	mysql.query(sql, (err, rows) => {
		if (err) {
			return err;
		}
		const planId = rows.insertId;
		/*const tagsStr = tags.map(tag => `(${planId}, ${tag})`).join(',');
		const tagsSql = `INSERT INTO plan_tag VALUES ${tagsStr}`;

		mysql.query(tagsSql, err2 => {
			if (err2) return err2;
		});

		mysql.query(tagsSql, err2 => {
			return err2;
		});
*/
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

			let total = 0;
			for (let i = 0; i < planDays.length; i++) {
				planDays[i].planTimes.map(planTime => {
					const place = planTime.place?.formatted_address
						? `"${planTime.place?.formatted_address}"`
						: null;
					const price = planTime.price || 0;
					total += price;
					arr.push(
						`(${planDayId + i}, "${planTime.description}", ${
							planTime.price || 0
						},"${planTime.time}", "${planTime.type}","${
							planTime.place?.name
						}", ${place}, ${planTime.place?.geometry?.location?.lat || null}, ${
							planTime.place?.geometry?.location?.lng || null
						}, "${planTime.photo.join(';')}")`,
					);
				});
			}
			const updateSql = `update plan set price = ${total} WHERE id = ${planId}`;
			mysql.query(updateSql, err => {
				if (err) return console.log('updateSql Err', err);
			});

			const planTimesStr = arr.join(',');
			const timeSql = `INSERT INTO plan_time(plan_day_id, description, price, time, type, name, address, latitude, longitude, photo) VALUES ${planTimesStr}`;
			mysql.query(timeSql, err3 => {
				if (err3) {
					res.json({ success: false });
					return console.log(err3);
				}
				res.json({ success: true, planId });
			});
		});
	});
};

module.exports.delete = (req, res) => {
	const { planId, planDayId, planTimeId } = req.body; // 플랜 id

	let sql = '';
	if (planId) sql = `DELETE FROM plan WHERE id = "${planId}";`;
	if (planDayId) sql = `DELETE FROM plan_day WHERE id = "${planDayId}";`;
	if (planTimeId) sql = `DELETE FROM plan_time WHERE id = "${planTimeId}";`;

	mysql.query(sql, err => {
		if (err) return err;
		res.json({ success: true });
	});
};

module.exports.insertPhoto = (req, res) => {
	const { url, planTimeId } = req.body;
	const sql = `UPDATE user SET photo = "${url}" WHERE id = "${planTimeId}"`;

	mysql.query(sql, err => {
		if (err) return console.log('InsertPhoto Err');

		res.json({ success: true });
	});
};

module.exports.timeUpdate = (req, res) => {
	const {
		id,
		description,
		price,
		time,
		type,
		name,
		formatted_address,
		lat,
		lng,
	} = req.body; // plan_timeId

	const sql = `UPDATE plan_time SET description = "${description}", price = "${price}", time = "${time}", type="${tpye}"
	, name="${name}", ddress="${formatted_address}", latitude = "${lat}", longitude = "${lng}" WHERE id = "${id}";`;

	mysql.query(sql, err => {
		if (err) return console.log('TimeUpdate Err', err);
		res.json({ success: true });
	});
};

module.exports.dayUpdate = (req, res) => {
	const { id, description, date } = req.body; // plan_dayId

	const sql = `UPDATE plan_day SET description = "${description}", date = "${date}" WHERE id = "${id}";`;

	mysql.query(sql, err => {
		if (err) return err;
		res.json({ success: true });
	});
};

module.exports.planUpdate = (req, res) => {
	//플랜 수정
	const { id, title, description, price, sleepDays, travelDays } = req.body; // planId

	const sql = `UPDATE plan SET title = "${title}",description = "${description}",price = "${price}",sleepDays = "${sleepDays}",travelDays = "${travelDays}" WHERE id = "${id}";`;

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
		case 'id':
			sql = `select plan.*, user.*, count(plan_comment.id) as num_comment, plan.id AS plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id WHERE plan.user_id LIKE "%${item}%" GROUP BY plan.id ORDER BY plan.create_time DESC `;
			break;
		default:
			sql = `select plan.*, user.*, count(plan_comment.id) as num_comment, plan.id AS plan_id FROM plan LEFT JOIN user ON plan.user_id = user.id LEFT JOIN plan_comment ON plan.id = plan_comment.plan_id GROUP BY plan.id ORDER BY plan.create_time DESC `;
			break;
	}

	mysql.query(sql, (err, rows) => {
		if (err) return console.log('serach err: ', err);

		const plans = rows.map(plan => {
			return this.planMapping(plan);
		});

		res.status(200).json({ success: true, list: plans });
	});
};

module.exports.getWishList = (req, res) => {
	const userId = req.body.userId;

	const sql = `SELECT p.*, user.nickname, user.photo, user.id user_id FROM wishlist w LEFT JOIN plan p ON p.id = w.plan_id LEFT JOIN user ON p.user_id = user.id WHERE w.user_id = ?`;

	mysql.query(sql, userId, (err, wishes) => {
		if (err) return res.json({ success: false, err });

		const result = wishes.map(wish => {
			return {
				...wish,
				author: {
					id: wish.user_id,
					nickname: wish.nickname,
					photo: wish.photo,
				},
			};
		});

		res.json({ success: true, list: result });
	});
};

module.exports.addWishList = (req, res) => {
	const { userId, planId } = req.body;

	const selectSql = `SELECT * FROM wishlist WHERE user_id = ? && plan_id = ?`;
	mysql.query(selectSql, [userId, planId], (err, plans) => {
		if (err) return res.json({ success: false, err });
		if (plans.length !== 0) {
			return res.json({ success: false, message: '이미 추가 된 플랜입니다.' });
		}

		const insertSql = `INSERT INTO wishlist(user_id, plan_id) VALUES(?, ?);`;

		mysql.query(insertSql, [userId, planId], err => {
			if (err) return res.json({ success: false, err });

			res.json({ success: true });
		});
	});
};

module.exports.deleteWishList = (req, res) => {
	const { userId, planId } = req.body;

	const sql = `DELETE FROM wishlist WHERE user_id = ? && plan_id = ?`;

	mysql.query(sql, [userId, planId], err => {
		if (err) return res.json({ success: false, err });

		res.json({ success: true });
	});
};

module.exports.writeComment = (req, res) => {
	const { planId, userId, description } = req.body;
	const sql = `INSERT INTO plan_comment(plan_id, user_Id, description) VALUES(? , ? , ?);`;

	mysql.query(sql, [planId, userId, description], err => {
		if (err) return res.json({ success: false, err });

		res.json({ success: true });
	});
};

module.exports.deleteComment = (req, res) => {
	const { id } = req.body;
	const sql = `DELETE FROM plan_comment WHERE id = ?;`;

	mysql.query(sql, id, err => {
		if (err) return res.json({ success: false, err });

		res.json({ success: true });
	});
};

module.exports.like = (req, res) => {
	const { userId, planId } = req.body;
	const sql = `SELECT * FROM plan_like WHERE user_id = ? AND plan_id = ?`;

	mysql.query(sql, [userId, planId], (err, rows, fields) => {
		if (err) return console.log('select err: ', err);

		if (rows == '') {
			const insert = `INSERT INTO plan_like(user_id, plan_id) VALUES("${userId}", "${planId}");`;
			mysql.query(insert, (err, rows, fields) => {
				if (err) return console.log('insert err: ', err);

				res
					.status(200)
					.json({ success: true, message: ' 좋아요 성공', isLiked: true });
			});
		} else {
			const deleteSql = `DELETE FROM plan_like WHERE user_id = ? AND plan_id = ?`;
			mysql.query(deleteSql, [userId, planId], (err, rows, fields) => {
				if (err) return console.log('delete err: ', err);
				res
					.status(200)
					.json({ success: true, message: ' 좋아요 취소', isLiked: false });
			});
		}
	});
};

module.exports.isLiked = (req, res) => {
	const { userId, planId } = req.body;
	const sql = `SELECT * FROM plan_like WHERE user_id = ? AND plan_id = ?`;

	mysql.query(sql, [userId, planId], (err, rows) => {
		if (err) return console.log('isLiked err ', err);

		if (rows == '') {
			res.json({ isLiked: false });
		} else {
			res.json({ isLiked: true });
		}
	});
};

module.exports.howManyLiked = (req, res) => {
	const { planId } = req.query;
	const sql = `SELECT * FROM plan_like WHERE plan_id = ?`;

	mysql.query(sql, planId, (err, rows) => {
		if (err) return console.log(err);

		res.json({ success: true, likes: rows.length });
	});
};
