var mysql = require('mysql');
const mysqlInfo = require('./password');

var connection = mysql.createConnection(mysqlInfo.mysqlInfo);
module.exports = connection;
