const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

const pool = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
