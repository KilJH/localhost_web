<<<<<<< HEAD
const mysql = require('../db/mysql');

// 자유게시판에 관련된 API를 작성하세요

module.exports.write = (req, res) => {};
=======
const { default: formatDistanceStrictWithOptions } = require('date-fns/fp/formatDistanceStrictWithOptions');
const mysql = require('../db/mysql');

module.exports.list = (req, res) => {
	// 전체 게시글 
	const sql = `SELECT * FROM board`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('select err: ', err);
        for(let i=0;i<rows.length;i++)
            console.log(rows[i]);

		res.status(200).send({ success: true });
	});
};

module.exports.write = (req, res) => {
	// 게시글 작성
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
	const sql = `INSERT INTO board(user_id, title, description) VALUES("${user_id}", "${title}", "${description}");`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('write err: ', err);
        
		res.status(200).send({ success: true });
	});
};

module.exports.load = (req, res) => {
	// 게시글 불러오기
    const id = req.body.id; // board id
	const sql = `SELECT * FROM board WHERE id = ${id};`;

	mysql.query(sql, (err, rows, fields) => {
		if (err) return console.log('write err: ', err);
        console.log(rows[0].description);
        
		res.status(200).send({ success: true });
	});
};
>>>>>>> 6c7ecd3918a1cb34e61fd98503939eb0ac364af2
