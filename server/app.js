const express = require('express');
const app = express();
const PORT = require('./src/port');
const mysql = require('./db/mysql');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user', userRouter);
app.use(cors());

mysql.connect((err) => {
	if (err) return console.log('err: ', err);
	console.log('db연결 생성!');
});

app.listen(PORT, (req, res) => {
	console.log('PORT server on');
});
