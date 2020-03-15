const mysql = require('mysql');

// connect to a database peoplebook running on your localmachine
const pool = mysql.createPool({
    // change when connected to online database
    connectionLimit: 100, // Important?
    host: 'localhost',
    port: "3308",
    user: 'root',
    database: 'people',
    password: ''
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