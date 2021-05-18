const mysql = require('../db/mysql');

module.exports.createRoom = (req, res) => {
	const { hostUserId, userId } = req.body;

	const sql = `INSERT INTO message_room(host_user_id, user_user_id) VALUES(?, ?);`;
	mysql.query(sql, [hostUserId, userId], (err, rows) => {
		if (err) return console.log('createRoom err', err);

		res.json({ success: true, roomId: rows.insertId });
	});
};

module.exports.loadRoom = (req, res) => {
	const { hostUserId, userId } = req.body;
	const sql = `SELECT m.* FROM message m LEFT JOIN message_room r ON r.id = m.messageroom_id WHERE (host_user_id = ? && user_user_id = ?) || (host_user_id = ? && user_user_id =?);`;
	mysql.query(
		sql,
		[hostUserId, userId, userId, hostUserId],
		(err, messages) => {
			if (err) return console.log('loadRoom err', err);
			const message = messages.map(message => {
				return {
					roomId: message.messageroom_id,
					userId: message.user_id,
					message: message.text,
					createTime: message.create_time,
				};
			});

			const roomIdSql = `SELECT id FROM message_room WHERE (host_user_id = ? && user_user_id = ?) ||( host_user_id = ? && user_user_id=?);`;
			mysql.query(
				roomIdSql,
				[hostUserId, userId, userId, hostUserId],
				(err, room) => {
					if (err) return console.log('roomId find err', err);
					const roomId = room[0].id;

					res.json({ success: true, messages: message, roomId: roomId });
				},
			);
		},
	);
};

module.exports.exitRoom = (req, res) => {
	const { hostUserId, userId } = req.body;

	const sql = `UPDATE message_room SET message_room.on=${0} WHERE host_user_id = ${hostUserId} && user_user_id = ${userId};`;
	mysql.query(sql, [hostUserId, userId], err => {
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
	// 정렬 후 GROUP BY를 위해 LIMIT(2^64-1) 걸어줌
	const selectAsUser = `SELECT result.* FROM (SELECT m.*, msg.text, msg.create_time, u.nickname, u.photo FROM message_room m LEFT JOIN message msg ON m.id = msg.messageroom_id LEFT JOIN user u ON m.host_user_id = u.id WHERE m.user_user_id = ? && m.on = ${1} ORDER BY create_time DESC LIMIT 18446744073709551615) as result GROUP BY id ORDER BY create_time DESC;`;
	const selectAsHost = `SELECT result.* FROM (SELECT m.*, msg.text, msg.create_time, u.nickname, u.photo FROM message_room m LEFT JOIN message msg ON m.id = msg.messageroom_id LEFT JOIN user u ON m.user_user_id = u.id WHERE m.host_user_id = ? && m.on = ${1} ORDER BY create_time DESC LIMIT 18446744073709551615) as result GROUP BY id ORDER BY create_time DESC;`;

	mysql.query(selectAsUser, userId, (err, rows1) => {
		if (err) {
			res.json({
				success: false,
				message: '채팅방목록을 불러오는데 실패했습니다.',
			});
			return console.log('selectAsUser err: ', err);
		}

		mysql.query(selectAsHost, userId, (err, rows2) => {
			if (err) {
				res.json({
					success: false,
					message: '채팅방목록을 불러오는데 실패했습니다.',
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
	return `${input.getMonth() + 1}월 ${input.getDate()}일`;
}
