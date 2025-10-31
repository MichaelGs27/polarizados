const mysql = require('mysql2');
const path = require('path'); // 👈 ESTA DEBE ESTAR ANTES DE usar path.resolve
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0  
});
module.exports = connection.promise();
console.log('DB Config:', process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);
