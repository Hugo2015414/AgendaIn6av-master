var mysql = require("mysql");
var parametros = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'AgendaIn6avNode'
};
var connection = mysql.createConnection(parametros);

module.exports = connection;
