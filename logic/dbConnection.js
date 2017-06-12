var options = require('../config/configReader');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : options.config.database_host,
    user     : options.config.database_user,
    password : options.config.database_password,
    database : options.config.database
});

function singleQuery(statement, variables, callback) {

    connection.query(statement, variables, function (err, result) {
        if (err) {
            return console.error('error happened during query', err)
        }
        callback(null, result);
    });
}

module.exports = { "singleQuery": singleQuery };