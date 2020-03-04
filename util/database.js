const mysql = require('mysql2');

// connect to a database peoplebook running on your localmachine
const pool = mysql.createPool({
    // change when connected to online database
    host: 'localhost:3308',
    user: 'root',
    database: 'peoplebook',
    password: ''
});

module.exports = pool.promise();