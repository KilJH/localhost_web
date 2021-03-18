var mysql   = require('mysql');
const mysqlInfo = require("./password");

var connection = mysql.createConnection(mysqlInfo);
module.exports = connection;