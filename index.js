// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// //routes
// // const generalRoutes = require('./src/routes/generalRoutes');
// // const employeeRoutes = require('./src/routes/employeeRoutes');
// // const departmenRoutes = require('./src/routes/departmentRoutes');
// // const designationRoutes = require('./src/routes/designationRoutes');
// // const jobHistoryRoutes = require('./src/routes/jobHistoryRoutes');
// // const educationHistoryRoutes = require('./src/routes/educationHistoryRoutes');

// // app.use(generalRoutes);
// // app.use(employeeRoutes);
// // app.use(departmenRoutes);
// // app.use(designationRoutes);
// // app.use(jobHistoryRoutes);
// // app.use(educationHistoryRoutes);

// app.get('/', (req, res) => {
//     res.send('Survey Running');
// });

// app.listen(port, () => {
//     console.log(`Survey is running on port ${port}`);
// });

const express = require('express');
const cors = require('cors');
const db = require('./src/models/db'); // Import the db.js file
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Survey Running');
});

// Ensure the database connection is established before starting the server
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
    
    // Start the server once the database connection is established
    app.listen(port, () => {
        console.log(`Survey is running on port ${port}`);
    });
});
