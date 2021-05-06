const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: ['http://localhost:3000', 'https://localhost:3000'],
		methods: ['GET', 'POST'],
	},
});
const PORT = require('./src/port');
const mysql = require('./db/mysql');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const noticeRouter = require('./routes/notice');
const boardRouter = require('./routes/board');
const planRouter = require('./routes/plan');
const hostRouter = require('./routes/host');
const messageRouter = require('./routes/message');
const s3Router = require('./routes/s3');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors(corsOptions));
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/board', boardRouter);
app.use('/api/plan', planRouter);
app.use('/api/host', hostRouter);
app.use('/api/message', messageRouter);
app.use('/api/s3', s3Router);

io.on('connection', socket => {
	var roomName = null;
	console.log('connect socket');

	socket.on('join', data => {
		console.log('join event', data);
		roomName = data;
		socket.join(data);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('message', data => {
		io.emit('message', data);
	});
});

mysql.connect(err => {
	if (err) return console.log('err: ', err);
	console.log('db연결 생성!');
});

app.listen(PORT, (req, res) => {
	console.log('PORT server on');
});
