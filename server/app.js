const express = require('express');
const app = express();
const PORT = require('./src/port');
const mysql = require('./db/mysql');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const noticeRouter = require('./routes/notice');
const s3Router = require("./routes/s3");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const s3 = require("./api/s3_upload");

const corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/s3', s3Router);

mysql.connect((err) => {
	if (err) return console.log('err: ', err);
	console.log('db연결 생성!');
});

app.listen(PORT, (req, res) => {
	console.log('PORT server on');
});
