const mysql = require('../db/mysql');
// 호스트 관련된 API를 작성하세요

module.exports.list = (req, res) => {
	const sql = `SELECT * FROM host`;
	mysql.query(sql, (err, rows, fields) => {
		if (err) console.log('list err', err);

		res.json({ success: true, list: rows });
	});
};

module.exports.nearbyList = (req, res) => {
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;

	const sql = `SELECT *, (6371*acos(cos(radians(${latitude}))*cos(radians(host.latitude))*cos(radians(host.longitude)-radians(${longitude}))+sin(radians(${latitude}))*sin(radians(host.latitude)))) AS distance FROM host HAVING distance <= 20 ORDER BY distance;`;
	mysql.query(sql, (err, rows, fields) => {
		if (err) console.log('nearby err', err);

		res.json(rows);
	});
};
