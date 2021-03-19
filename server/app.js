const express = require('express');
const app = express();
const PORT = require('./src/port');
const mysql = require('./db/mysql');
const management = require('./management');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

mysql.connect((err) => {
	if (err) return console.log('err: ', err);
	console.log('db연결 생성!');
});

app.get('/', (req, res) => {
	res.send('heelo');
});

app.post('/api/user/register', (req, res) => {
	management.register(req, res);
});

app.post('/api/user/login_check', (req, res) => {
	management.login(req, res);
});

app.post('/api/user/update', (req, res) => {
	management.update(req, res);
});

app.post('/api/user/delete', (req, res) => {
	management.delete(req, res);
});

app.listen(PORT, (req, res) => {
	console.log('PORT server on');
});
