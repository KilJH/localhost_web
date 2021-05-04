const mysql = require('../db/mysql');

module.exports.createRoom = (req, res) => {
    const { hostUserId, userId } = req.body;

    const sql = `INSERT INTO message_room(host_user_id, user_user_id) VALUES(?, ?);`;
    mysql.query(sql, [hostUserId, userId], (err, rows) => {
        if (err) return console.log("createRoom err", err);

        res.json({ success: true, roomId: rows.insertId });
    });
};

module.exports.loadRoom = (req, res) => {
    const { hostUserId, userId } = req.body;

    const sql = `SELECT m.* FROM message m LEFT JOIN message_room r ON r.id = m.messageroom_id WHERE host_user_id = ? && user_user_id = ? || host_user_id = ? && user_user_id;`
    mysql.query(sql, [hostUserId, userId, userId, hostUserId], (err, messages) => {
        if (err) return console.log("loadRoom err", err);

        const message = messages.map(message => message);
        res.json({ success: true, messages: message });
    })
}

module.exports.exitRoom = (req, res) => {
    const { hostUserId, userId } = req.body;

    const sql = `DELETE FROM message_room WHERE host_user_id = ? && user_user_id = ?;`;
    mysql.query(sql, [hostUserId, userId], err => {
        if (err) return console.log("exitRoom err", err);

        res.json({ success: true });
    })
}

module.exports.writeMessage = (req, res) => {
    const { messageRoomId, userId, text } = req.body;

    const sql = `INSERT INTO message(messageroom_id, user_id, text) VALUES(?, ?, ?)`;
    mysql.query(sql, [messageRoomId, userId, text], err => {
        if (err) return console.log("writeMessage err", err);

        res.json({ success: true });
    })
}

