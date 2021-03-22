const express = require("express");
const app = express();
const PORT = require("./src/port")
const mysql = require("./db/mysql")
const management = require("./management");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mysql.connect((err) => {
    if (err) return console.log("err: ", err);
    console.log("db연결 생성!");
});

app.post("/api/user/register", (req, res) => {
        management.register(req, res);
})

app.post("/api/user/login_check", (req, res) => {
        management.login(req, res);
});

app.listen(PORT, (req, res) => {
    console.log("PORT server on");
})
