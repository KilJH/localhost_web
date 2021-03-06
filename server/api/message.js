const mysql = require('../db/mysql');

module.exports.createRoom = (req, res) => {
	const { hostUserId, userId, hostUserApplyId } = req.body;

	const sql = `INSERT INTO message_room(host_user_id, user_user_id, host_user_apply_id) VALUES(?, ?, ?);`;
	mysql.query(sql, [hostUserId, userId, hostUserApplyId], (err, rows) => {
		if (err) return console.log('createRoom err', err);

		res.json({ success: true, roomId: rows.insertId });
	});
};

module.exports.loadRoom = (req, res) => {
	const { id } = req.body; // roomId;
	const sql = `SELECT m.* FROM message m LEFT JOIN message_room r ON r.id = m.messageroom_id WHERE r.id = ?;`;
	mysql.query(sql, id, (err, messages) => {
		if (err) return console.log('loadRoom err', err);
		const message = messages.map(message => {
			return {
				roomId: message.messageroom_id,
				userId: message.user_id,
				message: message.text,
				createTime: message.create_time,
			};
		});
		const innerSql = `SELECT r.*, a.address FROM message_room r LEFT JOIN host_user_apply a ON a.id = r.host_user_apply_id WHERE r.id = ?;`;
		mysql.query(innerSql, id, (err, room) => {
			if (err) return console.log('roomId find err', err);
			const hostId = room[0].host_user_id;
			const userId = room[0].user_user_id;
			const applicationId = room[0].host_user_apply_id;
			res.json({
				success: true,
				messages: message,
				hostId,
				userId,
				applicationId,
				address: room[0].address,
			});
		});
	});
};

module.exports.exitRoom = (req, res) => {
	const { hostUserApplyId } = req.body;

	const sql = `UPDATE message_room SET message_room.on=${0} WHERE host_user_id = ?;`;
	mysql.query(sql, hostUserApplyId, err => {
		if (err) return console.log('exitRoom err', err);

		res.json({ success: true });
	});
};

module.exports.writeMessage = (req, res) => {
	const { messageRoomId, userId, text } = req.body;

	const sql = `INSERT INTO message(messageroom_id, user_id, text) VALUES(?, ?, ?)`;
	mysql.query(sql, [messageRoomId, userId, text], err => {
		if (err) return console.log('writeMessage err', err);

		res.json({ success: true });
	});
};

module.exports.getRoomList = (req, res) => {
	const { userId } = req.body;
	// ?????? ??? GROUP BY??? ?????? LIMIT(2^64-1) ?????????
	const selectAsUser = `SELECT result.* FROM (SELECT m.*, msg.text, msg.create_time, u.nickname, u.photo, a.address FROM message_room m LEFT JOIN message msg ON m.id = msg.messageroom_id LEFT JOIN user u ON m.host_user_id = u.id LEFT JOIN host_user_apply a ON a.id = m.id WHERE m.user_user_id = ? && m.on = ${1} ORDER BY create_time DESC LIMIT 18446744073709551615) as result GROUP BY id ORDER BY create_time DESC;`;
	const selectAsHost = `SELECT result.* FROM (SELECT m.*, msg.text, msg.create_time, u.nickname, u.photo, a.address FROM message_room m LEFT JOIN message msg ON m.id = msg.messageroom_id LEFT JOIN user u ON m.user_user_id = u.id LEFT JOIN host_user_apply a ON a.id = m.id WHERE m.host_user_id = ? && m.on = ${1} ORDER BY create_time DESC LIMIT 18446744073709551615) as result GROUP BY id ORDER BY create_time DESC;`;

	mysql.query(selectAsUser, userId, (err, rows1) => {
		if (err) {
			res.json({
				success: false,
				message: '?????????????????? ??????????????? ??????????????????.',
			});
			return console.log('selectAsUser err: ', err);
		}

		mysql.query(selectAsHost, userId, (err, rows2) => {
			if (err) {
				res.json({
					success: false,
					message: '?????????????????? ??????????????? ??????????????????.',
				});
				return console.log('selectAsHost err: ', err);
			}

			const sortedRows = [...rows1, ...rows2].sort(
				(a, b) => new Date(b.create_time) - new Date(a.create_time),
			);

			const result = sortedRows.map(row => {
				return mapRoomInfo(row);
			});

			res.json({ success: true, roomList: result });
		});
	});
};

function mapRoomInfo(item) {
	return {
		roomId: item.id,
		hostId: item.host_user_id,
		userId: item.user_user_id,
		nickname: item.nickname,
		photo: item.photo,
		recentMessage: {
			message: item.text,
			createTime: formatDateTime(item.create_time),
		},
	};
}

function formatDateTime(dateTime) {
	const now = new Date();
	const input = new Date(dateTime);
	if (now.toDateString() === input.toDateString()) {
		return `${input.getHours()}:${input.getMinutes()}`;
	}
	return `${input.getMonth() + 1}??? ${input.getDate()}???`;
}
