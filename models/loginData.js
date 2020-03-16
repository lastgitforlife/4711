
let db = require('../util/database');

function isValid(username) {
    return db.execute("Select * from users where username = '" + username + "'");
}

module.exports = {
    isValid: isValid
};