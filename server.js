const express = require('express');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const http = require('http').createServer(app);
// const io = require('socket.io')();

const PORT = 3000;
const SOCKETPORT = 4000;
const mysql = require('./server/db/mysql');
const userRouter = require('./server/routes/user');
const authRouter = require('./server/routes/auth');
const noticeRouter = require('./server/routes/notice');
const boardRouter = require('./server/routes/board');
const planRouter = require('./server/routes/plan');
const hostRouter = require('./server/routes/host');
const messageRouter = require('./server/routes/message');
const s3Router = require('./server/routes/s3');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.prepare().then(() => {
	const server = express();
	const httpServer = require('http').createServer(server);
	const io = require('socket.io')(httpServer);

	// api 라우터
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(cookieParser());
	server.use(fileUpload());
	server.use('/api/user', userRouter);
	server.use('/api/auth', authRouter);
	server.use('/api/notice', noticeRouter);
	server.use('/api/board', boardRouter);
	server.use('/api/plan', planRouter);
	server.use('/api/host', hostRouter);
	server.use('/api/message', messageRouter);
	server.use('/api/s3', s3Router);
	server.use(cors());

	server.get('/', (req, res) => {
		return app.render(req, res, '/');
	});

	server.get('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(PORT, err => {
		if (err) throw err;
		console.log(`listening to ${PORT}`);
	});

	// 소켓
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
			console.log('데이터 수신: ', data);
			io.emit('message', data);
		});
	});
	httpServer.listen(SOCKETPORT, () => {
		console.log(`HTTP server is running on ${SOCKETPORT}`);
	});

	// DB
	mysql.connect(err => {
		if (err) return console.log('err: ', err);
		console.log('db연결 생성!');
	});
});
