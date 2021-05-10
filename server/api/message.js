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
	const sql = `SELECT m.* FROM message m LEFT JOIN message_room r ON r.id = m.messageroom_id WHERE host_user_id = ? && user_user_id = ? || host_user_id = ? && user_user_id;`;
	mysql.query(
		sql,
		[hostUserId, userId, userId, hostUserId],
		(err, messages) => {
			if (err) return console.log('loadRoom err', err);
			const message = messages.map((message, index) => {
				return {
					roomId: messages[index].messageroom_id,
					userId: messages[index].user_id,
					message: messages[index].text,
					createTime: messages[index].create_time,
				};
			});
			res.json({ success: true, messages: message });
		},
	);
};

module.exports.exitRoom = (req, res) => {
	const { hostUserId, userId } = req.body;

	const sql = `DELETE FROM message_room WHERE host_user_id = ? && user_user_id = ?;`;
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

	const selectAsUser = `SELECT m.*, u.nickname, u.photo FROM message_room m JOIN user u ON m.host_user_id = u.id WHERE m.user_user_id = ?`;
	const selectAsHost = `SELECT m.*, u.nickname, u.photo FROM message_room m JOIN user u ON m.user_user_id = u.id WHERE m.host_user_id = ?`;

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

			const row1 = rows1.map(row => {
				return {
					roomId: row.id,
					hostId: row.host_user_id,
					userId: row.user_user_id,
					nickname: row.nickname,
					photo: row.photo,
				};
			});
			const row2 = rows2.map(row => {
				return {
					roomId: row.id,
					hostId: row.host_user_id,
					userId: row.user_user_id,
					nickname: row.nickname,
					photo: row.photo,
				};
			});
			const result = [...row1, ...row2];
			res.json({ success: true, roomList: result });
		});
	});
};
