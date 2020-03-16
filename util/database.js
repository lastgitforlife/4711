const mysql = require('mysql');

// connect to a database peoplebook running on your localmachine
const pool = mysql.createPool({
    // change when connected to online database
    connectionLimit: 100, // Important?
    host: 'remotemysql.com',
    port: "3306",
    user: 'o3x7ybeI2M',
    database: 'o3x7ybeI2M',
    password: 'OZH3RljirQ'
});

async function execute(data){
    return new Promise( (res, error) =>{
        pool.query(data, function(err, rows){
            if(err){
                console.log("error" + err);
                return error(err);
            }
            res(rows);
        })
    });
}


module.exports = {
    execute : execute,
    pool : pool.promise
};