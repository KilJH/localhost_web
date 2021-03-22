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
<<<<<<< HEAD
    if (err) return console.log("err: ", err);
    console.log("db연결 생성!");
});

app.post("/api/user/register", (req, res) => {
        management.register(req, res);
})

app.post("/api/user/login_check", (req, res) => {
        management.login(req, res);
=======
	if (err) return console.log('err: ', err);
	console.log('db연결 생성!');
>>>>>>> 494916f5719c8115816fb16d1bbe51b5160f64c1
});

app.listen(PORT, (req, res) => {
	console.log('PORT server on');
});
