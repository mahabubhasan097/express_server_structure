// const mysql = require('mysql2');

// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'empdb'
// });

// conn.connect((error) => {
//     if (error) {
//         throw error;
//     }
//     console.log('Database Connected!');
// });

// module.exports = conn;

const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "rafi",
    password: "MHR1830235",
    database: "survey_db"
});

const conn2 = mysql.createConnection({
    host: "127.0.0.1",
    user: "rafi",
    password: "MHR1830235",
    database: "db_main"
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
    conn.query("CREATE DATABASE IF NOT EXISTS survey_db", function (err, result) {
        if (err) throw err;
        console.log("Database created or already exists");
    });

    // Create questionTable
    const createQuestionTable = `CREATE TABLE IF NOT EXISTS questionTable (
        questionId INT AUTO_INCREMENT PRIMARY KEY,
        referenceId INT,
        questionTypeId INT,
        questionType VARCHAR(255),
        question TEXT
    )`;
    
    conn.query(createQuestionTable, function (err, result) {
        if (err) throw err;
        console.log("questionTable created or already exists");
    });

    // Create surveyTable
    const createSurveyTable = `CREATE TABLE IF NOT EXISTS surveyTable (
        surveyId INT AUTO_INCREMENT PRIMARY KEY,
        questionId INT,
        questionReferenceId INT,
        answer TEXT
    )`;

    conn.query(createSurveyTable, function (err, result) {
        if (err) throw err;
        console.log("surveyTable created or already exists");
    });
});

module.exports = conn;
