const mysql = require('mysql2');


// Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}) 

// open the MySQL connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.message);
        return;
    }
    console.log('Successfully connected to the database.');
    connection.release();
});

module.exports = db;