const mysql = require('../db/mysql');
// 호스트 관련된 API를 작성하세요

module.exports.list = (req, res) => {
	// 전체 host목록을 불러오는 API
	const sql = `SELECT * FROM host`;
	mysql.query(sql, (err, rows, fields) => {
		if (err) console.log('list err', err);

		res.json({ success: true, list: rows });
	});
};

module.exports.load = (req, res) => {
	// 특정 host를 불러오는 API
	const id = req.body.id; // hostId

	const hostSql = `SELECT * FROM host LEFT JOIN user ON user.id = host.user_id WHERE host.id = ${id};`;
	mysql.query(hostSql, (err, host) => {
		if (err) return console.log("hostSql err", err);

		const commentSql = `SELECT * FROM host_review WHERE host_review.host_user_id = ${id};`;
		mysql.query(commentSql, (err2, commentsRows) => {
			if(err2) return console.log("hostComments err", err2);

			const comments = commentsRows.map((commentsRow) => (commentsRow))
			res.json({ success: true, host, comments })
		})
	});
};

module.exports.update = (req, res) => {
	// host정보를 수정하는 API
	const id = req.body.id; // host_id
	const country = req.body.country;
	const language1 = req.body.language1;
	const language2 = req.body.language2;
	const language3 = req.body.language3;
	const description = req.body.description;
	const reqCountry = req.body.reqCountry;
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;
	const on = req.body.on;
	const address = req.body.address;

	const sql = `UPDATE host SET country = "${country}", language1 = "${language1}", language2 = "${language2}", language3 = "${language3}", description = "${description}", reqcountry = "${reqCountry}" WHERE id = "${id}";`;

	 mysql.query(sql, (err)=>{
		 if(err) return console.log("host update err", err);
		 res.json({ success: true });
	 })
};

module.exports.nearbyList = (req, res) => {
	// 사용자와 호스트의 거리를 구하는 API
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;

	const sql = `SELECT *, (6371*acos(cos(radians(${latitude}))*cos(radians(host.latitude))*cos(radians(host.longitude)-radians(${longitude}))+sin(radians(${latitude}))*sin(radians(host.latitude)))) AS distance FROM host WHERE host.on = 1 HAVING distance <= 20 ORDER BY distance`;
	mysql.query(sql, (err, rows, fields) => {
		if (err) console.log('nearby err', err);

		res.json({ success: true, rows });
	});
};
