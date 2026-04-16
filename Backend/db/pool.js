mysql2 = require('mysql2');

const poool = mysql2.createPool({
    host:'localhost',
    user:'root',
    password:'manager',
    database:'artisan'
});

module.exports = pool