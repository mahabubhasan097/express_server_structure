const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'empdb'
});

conn.connect((error) => {
    if (error) {
        throw error;
    }
    console.log('Database Connected!');
});

module.exports = conn;
